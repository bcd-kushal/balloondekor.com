from datetime import datetime

def get_date_time_rn():
    now = datetime.now()
    # Format as "dd-mm-yyyy,hh:mm:ss"
    return now.strftime("%d-%m-%Y,%H:%M:%S")