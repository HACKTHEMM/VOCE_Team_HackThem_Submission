import run_inference as r

print('executing the inference file by Team HackTHEM..')
try:
    r.run_inferance()
except Exception as e:
    print(f"Oops! Got an error {e}. But nothing that can't be resolved..")