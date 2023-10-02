import requests
import random

user_name = "test_user_{0}".format(random.randint(1, int(1e6)))
key_name = "test_key_{0}".format(random.randint(1, int(1e6)))

# user_name=""
# key_name='kies'

url = "http://localhost:3000"

def test_register_user():
    endpoint = "/auth/register"
    data = {
        "username": user_name,
        "email": "{0}@example.com".format(user_name),
        "password": "Test@200",
        "full_name": "Test User",
        "age": 10,
        "gender": "male"
    }
    response = requests.post(url + endpoint, json=data)
    print("response", response.request.url, response.request.method, response.status_code, response.text)
    assert response.status_code == 200
    assert response.json()["message"] == "User successfully registered!"

def test_generate_token():
    endpoint = "/auth/token"
    data = {
        "username": user_name,
        "password": "Test@200"
    }
    response = requests.post(url + endpoint, json=data)
    print("response", response.request.url, response.request.method, response.status_code, response.text)
    assert response.status_code == 200
    assert response.json()["message"] == "Access token generated successfully."
    return {"Authorization": "Bearer {0}".format(response.json()['data']['access_token'])}

def test_store_data():
    endpoint = "/data/store"
    data = {
        "keyN": key_name,
        "valueN": "test_value"
    }
    response = requests.post(url + endpoint, json=data, headers=test_generate_token())
    print("response", response.request.url, response.request.method, response.status_code, response.text)
    assert response.status_code == 200
    assert response.json()["message"] == "Data stored successfully."

def test_retrieve_data():
    endpoint = "/data/retrieve/{0}".format(key_name)
    response = requests.get(url + endpoint, headers=test_generate_token())
    print("response", response.request.url, response.request.method, response.status_code, response.text)
    assert response.status_code == 200
    assert response.json()["data"]["keyN"] == key_name
    assert response.json()["data"]["valueN"] == "test_value"

def test_update_data():
    endpoint = "/data/update/{0}".format(key_name)
    data = {
        "valueN": "new_test_value"
    }
    response = requests.put(url + endpoint, json=data, headers=test_generate_token())
    print("response", response.request.url, response.request.method, response.status_code, response.text)
    assert response.status_code == 200
    assert response.json()["message"] == "Data updated successfully."

def test_delete_data():
    endpoint = "/data/delete/{0}".format(key_name)
    response = requests.delete(url + endpoint, headers=test_generate_token())
    print("response", response.request.url, response.request.method, response.status_code, response.text)
    assert response.status_code == 200
    assert response.json()["message"] == "Data deleted successfully."

def test_all():
    test_register_user()
    print()
    test_generate_token()
    print()
    test_store_data()
    print()
    test_retrieve_data()
    print()
    test_update_data()
    print()
    test_delete_data()

if __name__ == "__main__":
    test_all()