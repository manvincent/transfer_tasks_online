# this file imports custom routes into the experiment server

from flask import Blueprint, render_template, request, jsonify, Response, abort, current_app
from jinja2 import TemplateNotFound
from functools import wraps
from sqlalchemy import or_

from psiturk.psiturk_config import PsiturkConfig
from psiturk.experiment_errors import ExperimentError
from psiturk.user_utils import PsiTurkAuthorization, nocache

# # Database setup
from psiturk.db import db_session, init_db
from psiturk.models import Participant
from json import dumps, loads

# load the configuration options
config = PsiturkConfig()
config.load_config()
myauth = PsiTurkAuthorization(config)  # if you want to add a password protect route use this

# explore the Blueprint
custom_code = Blueprint('custom_code', __name__, template_folder='templates', static_folder='static')



###########################################################
#  serving warm, fresh, & sweet custom, user-provided routes
#  add them here
###########################################################

#----------------------------------------------
# example custom route
#----------------------------------------------
@custom_code.route('/my_custom_view')
def my_custom_view():
	current_app.logger.info("Reached /my_custom_view")  # Print message to server.log for debugging
	try:
		return render_template('custom.html')
	except TemplateNotFound:
		abort(404)

#----------------------------------------------
# example using HTTP authentication
#----------------------------------------------
@custom_code.route('/my_password_protected_route')
@myauth.requires_auth
def my_password_protected_route():
	try:
		return render_template('custom.html')
	except TemplateNotFound:
		abort(404)

#----------------------------------------------
# example accessing data
#----------------------------------------------
@custom_code.route('/view_data')
@myauth.requires_auth
def list_my_data():
        users = Participant.query.all()
	try:
		return render_template('list.html', participants=users)
	except TemplateNotFound:
		abort(404)

#----------------------------------------------
# example computing bonus
#----------------------------------------------

@custom_code.route('/compute_bonus', methods=['GET'])
def compute_bonus():
    # check that user provided the correct keys
    # errors will not be that gracefull here if being
    # accessed by the Javascrip client
    if not request.args.has_key('uniqueId'):
        raise ExperimentError('improper_inputs')  # i don't like returning HTML to JSON requests...  maybe should change this
    uniqueId = request.args['uniqueId']

    try:
        COIN_VAL = 0.03125 # set coin reward to 3 cents (so max points = $3)
      
        # lookup user in database
        user = Participant.query.\
               filter(Participant.uniqueid == uniqueId).\
               one()
        user_data = loads(user.datastring) # load datastring from JSON
        
        bonus = 0.0
        pavBonus = 0.0
        leftDoorBonus = 0.0
        midDoorBonus = 0.0
        rightDoorBonus = 0.0
        for record in user_data['data']: # for line in data file
            
            trial = record['trialdata']
            # now we will calculate how much bonus they get for collecting coins
            try:
                trial_tag = trial['label']
            except KeyError:
                trial_tag = None   
            # case: rewards during pavlovian learning
            if trial_tag=='pav_outcome':
                if trial['pavOutBool'] == True:
                    pavBonus += COIN_VAL
            # case: rewards during instrumental learning
            if trial_tag=='left outcome':	
                if trial['leftAllowKey'] == 49:
                    leftDoorBonus += COIN_VAL * trial['outMag']
                elif trial['leftAllowKey'] == 50:
                    midDoorBonus += COIN_VAL * trial['outMag']
            elif trial_tag=='right outcome':
                if trial['rightAllowKey'] == 50:
                    midDoorBonus += COIN_VAL * trial['outMag']
                elif trial['rightAllowKey'] == 51:
                    rightDoorBonus += COIN_VAL * trial['outMag']
        
            # Get the index of the instrumental door that matches the pav outcome
            if trial_tag== 'pav_pre_iti':
                pavInstrIdx = trial['pavOutIdx'][0]
        # Compute the aggregate bonus
        if pavInstrIdx == 0: 
            bonus = pavBonus + leftDoorBonus
        elif pavInstrIdx == 1:
            bonus = pavBonus + midDoorBonus
        elif pavInstrIdx == 2:
            bonus = pavBonus + rightDoorBonus
        # round and cap final bonus
        bonus_cap = 3
        bonus = round(bonus, 2)
        if bonus > bonus_cap:
            bonus = bonus_cap
        
        user.bonus = bonus
        db_session.add(user)
        db_session.commit()
        resp = {"bonusComputed": "success"}
        return jsonify(**resp)
    except:
        abort(406)  # again, bad to display HTML, but...


