#!/usr/bin/env python3

"""Setting up a basic flask app."""
from flask import Flask, render_template
# from flask_babel import Babel

app = Flask(__name__)
# app.config.from_pyfile('mysettings.cfg')
# babel = Babel(app)


@app.route('/')
def index():
    """Home page."""
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
