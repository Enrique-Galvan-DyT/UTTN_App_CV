//Declare environment
const local_server = "https://localhost:44327/api/"                         //Write localhost and port
const public_server = "http://www.uttntest.somee.com/api/"                        //Write WEB API public address
const local_sources = ""       //Write App local resources

const env = public_server                                  //Select your environment (local or public server)

//Users API
const allUsers_route = env + "Users"
const postUser_route = env + "Users/"
const loginUser_route = env + "Users/login"
const editProfileFile_route = env + "Users/putProfileFile/"
const signupUser_route = env + "Users/signup"
const dataUser_route = env + "Users/"
const totalUser_route = env + "Users/GetTotalUsers"

//Jobs API
const allJobs_route = env + "Jobs"
const allUserJobs_route = env + "Jobs/getUserJobs/"
const getJobsCount_route= env + "Jobs/getJobsCount/"
const postJob_route = env + "Jobs"
const editJob_route = env + "Jobs/"
const deleteJob_route = env + "Jobs/"

//Educations API
const allEducations_route = env + "Educations"
const allUserEducations_route = env + "Educations/getUserEducations/"
const getEducationsCount_route= env + "Educations/getEducationsCount/"
const postEducation_route = env + "Educations"
const editEducation_route = env + "Educations/"
const editEducationFile_route = env + "Educations/putEducationsFile/"
const deleteEducationFile_route = env + "Educations/deleteEducationsFile/"
const deleteEducation_route = env + "Educations/"
const downloadEducationFile_route = env + "Educations/descargar/"

//Skills API
const allSkills_route = env + "Skills"
const allUserSkills_route = env + "Skills/getUserSkills/"
const getSkillsCount_route= env + "Skills/getSkillsCount/"
const postSkill_route = env + "Skills"
const editSkill_route = env + "Skills/"
const deleteSkill_route = env + "Skills/"

//Socials API
const allUserSocials_route = env + "Socials/getUserSocials/"
const postSocial_route = env + "Socials"
const editSocial_route = env + "Socials/"
const deleteSocial_route = env + "Socials/"

