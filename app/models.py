from app import db

class Bug(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(64))
    priority = db.Column(db.String(6))
    status = db.Column(db.String(12))

    def __repr__(self):
        return '<Subject {}>'.format(self.subject)