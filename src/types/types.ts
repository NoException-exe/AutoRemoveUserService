type TUser = {
  _id: string;
  discordID: string;
  username: string;
  password: string;
  activation_date: Date;
  expiration_date: Date;
  status: string;
  isBlocked: boolean;
  hwid: string;
  location: TLocation;
  blockedLocation: TLocation;
  hardware: THardware;
  blockedHardware: THardware;
};

type TLocation = {
  ip_address: string;
  country_name: string;
  city: string;
  state: string;
  continent_name: string;
  continent_code: string;
  federative_unite: string;
};

type THardware = {
  desktop: string;
  cpu: string;
  gpu: string;
  ram: number;
  mac: string;
};

export { TUser, TLocation, THardware };
