import yaml 


def load_yaml(key) -> str:
    with open('./config.yaml', 'r') as file:
        config = yaml.safe_load(file)
        data = config.get(key)
        return data
    

if __name__ == "__main__":
    # Example usage
    key = "MODEL_ID"
    print(load_yaml(key))