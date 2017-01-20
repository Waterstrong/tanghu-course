var Nightmare = require('nightmare');
var nightmare = Nightmare({
    openDevTools: {
        mode: 'bottom'
    },
    show: true
});

const config = require('./config.json');
const username = config.username;
const password = config.password;
const timeout = config.timeout;

const courseTeacherList = [
    {4: 135}, // Physics -> YL
    {2: 28}, // Maths -> GYQ
    {6: 166}, // Biology -> ZX
    {3: 22}, // English -> FQ
    {5: 167}, // Chemistry -> ZLY
    {1: 87}, // Chinese -> MXZ

    {4: 112}, // Physics -> WRR
    {2: 32}, // Maths -> HWZ
    {6: 147}, // Biology -> ZCF
    {3: 74}, // English -> LX
    {5: 163}, // Chemistry -> ZHS
    {1: 145} // Chinese -> YYG
];

nightmare
    .goto('http://uat.szymr.com/tanghu')
    .wait('.login-area .btn-sm')
    .insert('#UserName', username)
    .insert('#Password', password)
    .click('.login-area .btn-sm')
    .wait('ul[aria-labelledby="profile"]')
    .goto('http://uat.szymr.com/Tanghu/TeachMgmt/StudentChooseTutor/GetIn')
    .wait('select#VolunteType')
    .then(() => {
        console.info('Already login and performing selection...');
        courseTeacherList.forEach(ct => {
            var courseId = Object.keys(ct)[0];
            var teacherId = ct[courseId];
            nightmare
                .select('#VolunteType', courseId)
                .wait('.btnChoose')
                .click('.btnChoose[data-teacherid="' + teacherId + '"]')
                .wait(timeout);
        });

        nightmare
            .end()
            .then(function () {
                console.info("Congratulations! All courses are selected successfully!");
            })
            .catch(function (error) {
                console.error('Sorry, failed: ', error);
            });

    });
  
  

  


  



