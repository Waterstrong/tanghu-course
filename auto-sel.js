var Nightmare = require('nightmare');
var nightmare = Nightmare({show: true});
var timeout = 1000;

var courseTeacherList = [
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
    .insert('#UserName', 'username')
    .insert('#Password', 'password')
    .click('.login-area .btn-sm')
    .wait(timeout)
    .goto('http://uat.szymr.com/Tanghu/TeachMgmt/StudentChooseTutor/GetIn')
    .wait(timeout)
    .then(() => {
        console.log('Already login! Performing selections!');
        courseTeacherList.forEach(ct => {
            var courseId = Object.keys(ct)[0];
            var teacherId = ct[courseId];
            nightmare
                .select('#VolunteType', courseId)
                .wait(timeout)
                .click('.btnChoose[data-teacherid="' + teacherId + '"]')
                .wait(timeout);
        });

        nightmare
            .end()
            .then(function () {
                console.log("Congratulations! All courses are selected successfully!");
            })
            .catch(function (error) {
                console.error('Sorry, failed: ', error);
            });

    });
  
  

  


  



