from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class BugForm(FlaskForm):
    subject = StringField('Task Name', validators=[DataRequired()])
    priority = SelectField('Priority', choices=[('low'), ('medium'), ('high')])
    status = SelectField('Status', choices=[('incomplete'), ('in progress'), ('complete')])
    create = SubmitField('Add')