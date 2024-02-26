//Declare environment
const local_server = "https://localhost:44327/api/"                         //Write localhost and port
const public_server = ""                        //Write WEB API public address
const local_sources = "/CV_App_UTTN/www/"       //Write App local resources

const env = local_server                                  //Select your environment (local or public server)

//Users API
const allUsers_route = env + "Users"
const postUser_route = env + "Users/"
const loginUser_route = env + "Users/login"
const dataUser_route = env + "Users/"
const totalUser_route = env + "Users/GetTotalUsers"

//Skills API
const allUserSkills_route = env + "Skills/getUserSkills/"
const postSkill_route = env + "Skills"
const editSkill_route = env + "Skills/"
const deleteSkill_route = env + "Skills/"

//Jobs API
const allUserJobs_route = env + "Jobs/getUserJobs/"
const postJob_route = env + "Jobs"
const editJob_route = env + "Jobs/"
const deleteJob_route = env + "Jobs/"

//Educations API
const allUserEducations_route = env + "Educations/getUserEducations/"
const postEducation_route = env + "Educations"
const editEducation_route = env + "Educations/"
const editEducationFile_route = env + "Educations/putEducationsFile/"
const deleteEducationFile_route = env + "Educations/deleteEducationsFile/"
const deleteEducation_route = env + "Educations/"
