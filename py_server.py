from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import os, json, time

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, static_folder=BASE_DIR)
CORS(app)

DATA_DIR = os.path.join(BASE_DIR, 'data')
RSVP_FILE = os.path.join(DATA_DIR, 'rsvps.json')

os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(RSVP_FILE):
    with open(RSVP_FILE, 'w', encoding='utf8') as f:
        json.dump([], f)


def read_rsvps():
    try:
        with open(RSVP_FILE, 'r', encoding='utf8') as f:
            return json.load(f)
    except Exception:
        return []


def write_rsvps(list_):
    with open(RSVP_FILE, 'w', encoding='utf8') as f:
        json.dump(list_, f, indent=2)


@app.route('/api/rsvps', methods=['GET'])
def get_rsvps():
    return jsonify(read_rsvps())


@app.route('/api/rsvp', methods=['POST'])
def post_rsvp():
    body = request.get_json() or {}
    name = body.get('name')
    email = body.get('email', '')
    attend = body.get('attend', 'yes')
    if not name or not isinstance(name, str):
        return jsonify({'error': 'Name required'}), 400
    lst = read_rsvps()
    entry = {
        'id': f"{int(time.time()*1000)}-{len(lst)+1}",
        'name': name.strip(),
        'email': (email or '').strip(),
        'attend': attend,
        'createdAt': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    }
    lst.append(entry)
    write_rsvps(lst)
    return jsonify({'ok': True, 'entry': entry})


@app.route('/', defaults={'path': 'index.html'})
@app.route('/index.html')
@app.route('/<path:path>')
def serve(path='index.html'):
    if path in ('', '.', '..'):
        return send_from_directory(BASE_DIR, 'index.html')

    normalized = os.path.normpath(path)
    if normalized.startswith('..'):
        return send_from_directory(BASE_DIR, 'index.html')

    full_path = os.path.join(BASE_DIR, normalized)
    if os.path.isfile(full_path):
        return send_from_directory(BASE_DIR, path)

    return send_from_directory(BASE_DIR, 'index.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
