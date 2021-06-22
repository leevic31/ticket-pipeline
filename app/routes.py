from flask import redirect, jsonify, json, request
from app import app, db
from app.models import Bug


def bug_serializer(bug):
    return {
        "id": bug.id,
        "subject": bug.subject,
        "priority": bug.priority,
        "status": bug.status,
    }


@app.route("/")
@app.route("/index")
def index():
    return


@app.route("/add-bug", methods=["POST"])
def add_bug():
    request_data = json.loads(request.data)
    bug = Bug(
        subject=request_data["content"]["subject"],
        priority=request_data["content"]["priority"],
        status=request_data["content"]["status"],
    )
    db.session.add(bug)
    db.session.commit()

    return {"201": "bug added successfully"}


@app.route("/bugs", methods=["GET"])
def bugs():
    return jsonify([*map(bug_serializer, Bug.query.all())])


@app.route("/delete/<id>", methods=["DELETE"])
def delete_bug(id):
    if request.method == "DELETE":
        bug = Bug.query.get(id)
        db.session.delete(bug)
        db.session.commit()
        return {"201": "bug deleted successfully"}
