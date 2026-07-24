import path from "path";
import fs from "fs";
import * as yaml from "js-yaml";

// definiton d'une interface pour structurer les données de payement
interface PaymentConfig {
  cardName: string;
  cardNumber: string;
  cvc: string;
  MoisCard: string;
  AnneeCard: string;
}

interface EnvironnementConfig {
  urlTest: string;
  urlPreprod: string;
}

interface UserConfig {
  login: string;
  password: string;
}


export interface AppConfig {
  payment: PaymentConfig;
  environnement: EnvironnementConfig;
  user: {
    admin: UserConfig
    superAdmin: UserConfig;
  } ;
}

function loadconfig(): AppConfig {
  // Acceder au chemin de config.yaml

  const configPath = path.resolve(__dirname, "config.yaml");
  // lire le fichier yaml
  const file = fs.readFileSync(configPath, "utf-8");
  // parser le fichier yaml en object javascript
  const yamlData = yaml.load(file) as any;

  return {
    payment: yamlData.payment,
    user: {
     admin: yamlData.user.admin,
     superAdmin: yamlData.user.superAdmin
     
    } ,
    environnement: yamlData.environnement,
  };
}
export const config = loadconfig();