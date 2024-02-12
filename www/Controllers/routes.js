//Declare environment
const local_server = "https://localhost:44327/"                         //Write localhost and port
const public_server = ""                        //Write WEB API public address
const local_sources = "/CV_App_UTTN/www/"       //Write App local resources

const env = local_server                                  //Select your environment (local or public server)

//Users API
const allUsers_route = env + "api/Users"
const postUser_route = env + "api/Users/"
const loginUser_route = env + "api/Users/login"
const dataUser_route = env + "api/Users/"
const totalUser_route = env + "api/Users/GetTotalUsers"

