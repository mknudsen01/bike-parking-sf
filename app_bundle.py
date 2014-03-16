from flask import Flask, render_template
from flask.ext.assets import Environment, Bundle
app = Flask(__name__)
assets = Environment(app)

css = Bundle(
  'css/normalize.css',
  'css/style.css'
)
assets.register('css_all', css)

js_lib =Bundle(
  'js/lib/jquery.js',
  'js/lib/underscore.js',
  'js/lib/backbone.js'
  )
assets.register('js_lib', js_lib)

backbone = Bundle(
  'js/backbone/views/*.js'
  )
assets.register('backbone', backbone)