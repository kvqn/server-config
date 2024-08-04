# Dashboard Backend

`heartbeat/` folder has the script for sending the heartbeat to the friday endpoint.

`api/` folder has the fastapi server that would consume the logs from the friday endpoint and serve the various charts constructed using matplotlib.

`common/` has the utilities common to both.

The reason charts are created here and not in the frontend using react libraries is because it might need to parse through 50k or so data points sometimes and that is something react (or browser) can't handle.

To send a heartbeat

```
python -m heartbeat
```

To start the api

```
python -m api
```