### Docker

##### Creating docker image

`sudo docker build -t node-test ./`

##### Docker running

`sudo docker-compose up`

-----

### Work with API

1) File saving

`POST` `http://localhost:3000/api/save`

##### Structure of incoming data:

```json
{
    "name": "file_name",
    "file": "base64",
    "expired": "unix_timestamp"
}
```

##### Returns:

```json
{
    "status": true,
    "data": "returned_data",
    "error": "error_message"
}
```

status - true / false

data - null or returned data

error - null or error message



2) To get the list of all files

`GET` `http://localhost:3000/api/list`

##### Returns:

```json
{
    "status": true,
    "data": "files_list",
    "error": "error_message"
}
```

status - true / false

data - [] or files list

error - null or error message


3) To get binary file

`GET` `http://localhost:3000/api/file/:id`

id - file id

##### Returns binary file or

```json
{
    "status": false,
    "error": "error_message"
}
```
