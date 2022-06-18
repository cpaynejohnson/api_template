const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const axios = require('axios');
const {sequelize} = require('./db');
const {User, Item, School, Favorite, Major, Tour} = require('./models');

const createUsers = async () => {

    let pw1 = await bcrypt.hash('1234', 2)
    let pw2 = await bcrypt.hash('password', 2)

    const users = [
        {name : 'Dan', password: pw1 },
        {name : 'Linda', password : pw2}
    ];

    return users
}

const createFavorites = async () => {

  console.log(favorites)
  return favorites
}

const createSchools = async (page) => {
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools.json?school.minority_serving.historically_black=1&fields=id,ope6_id,school.name,school.state,school.city,school.zip,location.lat,location.lon,school.ownership,school.school_url,school.carnegie_size_setting,latest.student.size,latest.student.demographics.women,latest.student.demographics.men,school.institutional_characteristics.level,school.open_admissions_policy,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.cost.booksupply,latest.cost.roomboard.oncampus,latest.cost.roomboard.offcampus,latest.admissions.test_requirements,latest.earnings.6_yrs_after_entry.median_earnings_independent,latest.programs.cip_4_digit.title,latest.programs.cip_4_digit.credential.title&page=${page}&per_page=99&api_key=8Ajj4V22PvwDtL2ocDvut35YqCXArI2TVhvQWfvE`;
  axios.get(url)
  .then(function (response) {
   
    const schools= createSchoolsArray1(response.data.results)
 

  })
  .catch(function (error) {
    //if error
    console.log(error);
  })

}

function createSchoolsArray1(results){
    
    for (i of results){
        // console.log(i)
        let majorList = (i['latest.programs.cip_4_digit'])
        School.create(
            {
                id: i['id'],
                fafsa: i['ope6_id'],
                name: i['school.name'],
                city : i['school.city'],
                state : i['school.state'],
                zip: i['school.zip'],
                latitude: i['location.lat'],
                longitude: i['location.lon'],
                ownership: i['school.ownership'],
                website: i['school.school_url'],
                school_size: i['school.carnegie_size_setting'],
                total_students: i['latest.student.size'],
                women : i['latest.student.demographics.women'],
                men: i['latest.student.demographics.men'],
                school_category: i['school.institutional_characteristics.level'],
                instate_tuition: i['latest.cost.tuition.in_state'],
                outofstate_tuition: i['latest.cost.tuition.out_of_state'],
                cost_books: i['latest.cost.booksupply'],
                cost_roomboard_oncampus: i['latest.cost.roomboard.oncampus'],
                cost_roomboard_offcampus: i['latest.cost.roomboard.offcampus'],
                open_admissions: i['school.open_admissions_policy'],
                admin_test_reqs: i['latest.admissions.test_requirements'],
                grad_earnings: i['latest.earnings.6_yrs_after_entry.median_earnings_independent'],
                    
            })
    
            
            for (m of majorList){
              // console.log(m)
              Major.create({
                major : m.title,
                degree : m.credential.title,
                SchoolId: i['id'],
              }
              )}  
              
            }    
  };

const items = [
    {name : 'Gold'},
    {name : 'Silver'},
    {name : 'Paladium'}
];


// const createTours = async () => {

//     const tours = [
//     {
//         school: 'Alabama A&M University',
//         tour_url : 'https://www.aamu.edu/about/visit-us/visiting-campus.html',
//         SchoolId : '100654'
//     },  
//     {
//         school: 'Alabama State University',
//         tour_url : 'https://www.alasu.edu/admissions/campus-tours',
//         SchoolId : '100724'
//     },      
//     {
//         school: 'Albany State University',
//         tour_url : 'https://www.asurams.edu/enrollment-management/admissions/campus-tour/',
//         SchoolId : '138716'
//     },  
//     {
//         school: 'Alcorn State University',
//         tour_url : 'https://www.youtube.com/watch?v=EJi1aXQ7SbI&t=28s',
//         SchoolId : '175342'
//     },  
//     {
//         school: 'Allen University',
//         tour_url : 'https://static1.squarespace.com/static/5f0e2cce65d789563f789332/t/5f7377c7a186ce23e797cb8d/1601402830117/AU+Look+Book.pdf',
//         SchoolId : '217624'
//     },  
//     {
//         school: 'American Baptist College',
//         tour_url : 'https://abcnash.edu/',
//         SchoolId : '219505'
//     },  
//     {
//         school: 'University of Arkansas at Pine Bluff',
//         tour_url : 'https://www.picktime.com/uapbcampustours',
//         SchoolId : '106412'
//     },
//     {
//         school: 'Arkansas Baptist College',
//         tour_url : 'https://www.arkansasbaptist.edu/',
//         SchoolId : '106306'
//     },
 
//     {    	
//         school: 'Benedict College',
//         tour_url : 'https://www.benedict.edu/office-of-admissions-and-recruitment/campus-tours/',
//         SchoolId : '217721'
//     },  
//     {
//         school: 'Bennett College',
//         tour_url : 'https://www.bennett.edu/?s=campus+tour',
//         SchoolId : '197993'
//     },  
//     {
//         school: 'Bethune-Cookman University',
//         tour_url : 'https://visit.cookman.edu/',
//         SchoolId : '132602'
//     },  
//     {
//         school: 'Bishop State Community College',
//         tour_url : 'https://www.bishop.edu/contact',
//         SchoolId : '102030'
//     },  
//     {
//         school: 'Bluefield State College',
//         tour_url : 'https://bluefieldstate.edu/visit-bsc/',
//         SchoolId : '237215'
//     },  
//     {
//         school: 'Bowie State University',
//         tour_url : 'https://www.bowiestate.edu/admissions-and-aid/visit-us/',
//         SchoolId : '162007'
//     },
//     // {  	
//     //     school: 'Carver College',
//     //     tour_url : 'https://www.carver.edu/?page_id=9',
//     //     SchoolId : ''
//     // },
//     {
//         school: 'Central State University',
//         tour_url : 'https://www.centralstate.edu/prospects/video-csu360-1.php',
//         SchoolId : '201690'
//     },  
//     {
//         school: 'Cheyney University of Pennsylvania',
//         tour_url : 'https://cheyney.edu/admissions/visiting-the-campus/',
//         SchoolId : '211608'
//     },  
//     {
//         school: 'Claflin University',
//         tour_url : 'https://www.claflin.edu/',
//         SchoolId : '217873'
//     },  
//     {
//         school: 'Clark Atlanta University',
//         tour_url : 'https://www.cau.edu/_images/Campus-Tour.html',
//         SchoolId : '138947'
//     },  
//     {
//         school: 'Clinton College',
//         tour_url : 'https://www.clintoncollege.edu/about/events/?#',
//         SchoolId : '217891'
//     },  
//     {
//         school: 'Coahoma Community College',
//         tour_url : 'http://www.coahomacc.edu/admissions/campus-visit-form.html',
//         SchoolId : '175519'
//     },
//     {
//         school: 'Coppin State University',
//         tour_url : 'https://www.coppin.edu/visit',
//         SchoolId : '162283'
//     },  
//     { 	
//         school: 'Delaware State University',
//         tour_url : 'https://www.desu.edu/admissions/visit-dsu',
//         SchoolId : '130934'
//     },  
//     {
//         school: 'Denmark Technical College',
//         tour_url : 'https://outlook.office365.com/owa/calendar/DenmarkTechnicalCollege1@denmarktech0.onmicrosoft.com/bookings/',
//         SchoolId : '217989'
//     },  
//     {
//         school: 'Dillard University',
//         tour_url : 'https://www.dillard.edu/admissions/visit-dillard.php',
//         SchoolId : '158802'
//     },  
//     {
//         school: 'District of Columbia, University of the',
//         tour_url : 'https://www.udc.edu/about/tours/',
//         SchoolId : '131399'
//     },  
//     {
//         school: 'Edward Waters University',
//         tour_url : 'https://www.ewc.edu/covid/events-and-campus-tours/',
//         SchoolId : '133526'
//     },  
//     {
//         school: 'Elizabeth City State University',
//         tour_url : 'https://www.ecsu.edu/about/visit/',
//         SchoolId : '198507'
//     },
//     {
//         school: 'Fayetteville State University',
//         tour_url : 'https://broncoville.uncfsu.edu/tourpicker.asp',
//         SchoolId : '198543'
//     },  
//     {
//         school: 'Fisk University',
//         tour_url : 'https://www.fisk.edu/admissions/campus-visit/',
//         SchoolId : '220181'
//     },  
//     {
//         school: 'Florida A&M University',
//         tour_url : 'https://www.famu.edu/students/new-student-orientation/campus-visits.php',
//         SchoolId : '133650'
//     },  
//     {
//         school: 'Florida Memorial University',
//         tour_url : 'https://apply.fmuniv.edu/portal/daily_visits',
//         SchoolId : '133979'
//     },
//     {  	
//         school: 'Fort Valley State University',
//         tour_url : 'https://www.fvsu.edu/campus-tours-2',
//         SchoolId : '139719'
//     },
//     {
//         school: 'Gadsden State Community College (Valley Street campus)',
//         tour_url : 'https://www.gadsdenstate.edu/visit.cms',
//         SchoolId : '101240'
//     },  
//     {
//         school: 'Grambling State University',
//         tour_url : 'https://www.gram.edu/visit/',
//         SchoolId : '159009'
//     },  
//     {
//         school: 'Hampton University',
//         tour_url : 'https://www.hamptonu.edu/visitor/tours.cfm',
//         SchoolId : '232265'
//     },  
//     {
//         school: 'Harris-Stowe State University',
//         tour_url : 'https://futurehornet.hssu.edu/tourpicker.asp',
//         SchoolId : '177551'
//     },  
//     // {
//     //     school: 'Hinds Community College at Utica',
//     //     tour_url : 'https://www.hindscc.edu/visit',
//     //     SchoolId : ''
//     // },  
//     // {
//     //     school: 'Hood Theological',
//     //     tour_url : 'https://www.hoodseminary.edu/future-students/admissions/virtual-tour-of-hood',
//     //     SchoolId : ''
//     // },
//     {
//         school: 'Howard University',
//         tour_url : 'https://admission.howard.edu/visit',
//         SchoolId : '131520'
//     }, 
//     {
//         school: 'Huston-Tillotson University',
//         tour_url : 'https://htu.edu/campus-tour',
//         SchoolId : '225575'
//     },  
//     {
//         school: 'Interdenominational Theological Center',
//         tour_url : 'https://www.itc.edu/admissions/request-information/',
//         SchoolId : '140146'
//     },  
//     {
//         school: 'J. F. Drake State Technical College',
//         tour_url : 'https://www.drakestate.edu/admissions/campus-maps-tours',
//         SchoolId : '101462'
//     },  
//     {
//         school: 'Jackson State University',
//         tour_url : 'https://www.jsums.edu/virtual-tour/',
//         SchoolId : '175856'
//     },  
//     {
//         school: 'Jarvis Christian College',
//         tour_url : 'https://www.jarvis.edu/prospective-students/campus-tour',
//         SchoolId : '225885',
//     },  
//     {
//         school: 'Johnson C. Smith University',
//         tour_url : 'https://www.jcsu.edu/admissions/schedule-a-tour/tour-request/',
//         SchoolId : '198756'
//     },  
//     // {
//     //     school: 'Johnson C Smith Theological Seminary',
//     //     tour_url : 'https://www.jcsts.org/',
//     //     SchoolId : ''
//     // },
//     {
//         school: 'Kentucky State University',
//         tour_url : 'https://www.kysu.edu/student-success-and-retention/breds-office/campus-tours.php',
//         SchoolId : '157058'
//     },
//     // {
//     //     school: 'Knoxville College',
//     //     tour_url : 'https://knoxvillecollege.edu/about-knoxville-college/',
//     //     SchoolId : ''
//     // },  
//     {    	
//         school: 'Lane College',
//         tour_url : 'https://www.lanecollege.edu/admissions/tour-the-campus',
//         SchoolId : '220598'
//     },  
//     {
//         school: 'Langston University',
//         tour_url : 'https://calendly.com/langstonuniversity',
//         SchoolId : '207209'
//     },  
//     {
//         school: 'Lawson State Community College',
//         tour_url : 'http://www.lawsonstate.edu/discover_lscc/request_a_tour.aspx',
//         SchoolId : '101569'
//     },  
//     {
//         school: 'LeMoyne-Owen College',
//         tour_url : 'https://www.loc.edu/campus-tour/',
//         SchoolId : '220604'
//     },
//     {
//         school: 'The Lincoln University',
//         tour_url : 'https://www.lincoln.edu/admissions/visit-campus',
//         SchoolId : '213598'
//     },  
//     {
//         school: 'Lincoln University',
//         tour_url : 'https://www.lincolnu.edu/web/luadmissions/scheduled-visits',
//         SchoolId : '177940'
//     },
//     {
//         school: 'Livingstone College',
//         tour_url : 'https://livingstone.edu/campus-life/',
//         SchoolId : '198862'
//     },
//     {
//         school: 'Maryland Eastern Shore, University of',
//         tour_url : 'https://www.youvisit.com/tour/63573/?pl=v&m_prompt=1',
//         SchoolId : '163338'
//     }, 	 
//     {
//         school: 'Meharry Medical College',
//         tour_url : 'https://home.mmc.edu/student-affairs/student-life/campus-tours/',
//         SchoolId : '220792'
//     },
//     {
//         school: 'Miles College',
//         tour_url : 'https://www.miles.edu/admissions-aid/tour-our-campus',
//         SchoolId : '101675'
//     },
//     // {
//     //     school: 'Miles School of Law',
//     //     tour_url : 'https://mlaw.edu/contact-us/',
//     //     SchoolId : ''
//     // },
//     {
//         school: 'Mississippi Valley State University',
//         tour_url : 'https://www.mvsu.edu/schedule-virtual-tour',
//         SchoolId : '176044'
//     },  
//     {
//         school: 'Morehouse College',
//         tour_url : 'https://www.morehouse.edu/admissions/visit-and-tour/',
//         SchoolId : '140553'
//     },
//     {
//         school: 'Morehouse School of Medicine',
//         tour_url : 'https://www.msm.edu/Admissions/events.php',
//         SchoolId : '140562'
//     },  
//     {	
//         school: 'Morgan State University',
//         tour_url : 'https://www.youvisit.com/tour/morgan/morgan_state_u?pl=v',
//         SchoolId : '163453'
//     },  
//     // {
//     //     school: 'Morris Brown College',
//     //     tour_url : 'https://morrisbrown.edu/campus-tours/',
//     //     SchoolId : ''
//     // },  
//     {
//         school: 'Morris College',
//         tour_url : 'https://www.morris.edu/our-college/campus-view',
//         SchoolId : '218399'
//     }, 
//     {
//         school: 'Norfolk State University',
//         tour_url : 'https://www.nsu.edu/Admissions-Aid/Learn-About-NSU/Visit-NSU',
//         SchoolId : '232937'
//     },
//     {
//         school: 'North Carolina A&T State University',
//         tour_url : 'https://www.ncat.edu/visit/index.php',
//         SchoolId : '199102'
//     },  
//     {
//         school: 'North Carolina Central University',
//         tour_url : 'https://www.youvisit.com/tour/nccu',
//         SchoolId : '199157'
//     },
//     {
//         school: 'Oakwood University',
//         tour_url : 'https://www.youvisit.com/tour/oakwood',
//         SchoolId : '101912'
//     },
//     {
//         school: 'Paine College',
//         tour_url : 'https://www.paine.edu/web/visitors/visitors',
//         SchoolId : '140720'
//     },
//     // {
//     //     school: 'Payne Theological',
//     //     tour_url : 'https://payneseminary.edu/contact-us/',
//     //     SchoolId : ''
//     // },
//     {
//         school: 'Philander Smith College',
//         tour_url : 'https://www.philander.edu/admissions/visit-psc',
//         SchoolId : '107600'
//     },  
//     {    	
//         school: 'Prairie View A&M University',
//         tour_url : 'https://www.pvamu.edu/recruitment/campus-tours/',
//         SchoolId : '227526'    
//     },
//     {
//         school: 'Rust College',
//         tour_url : 'https://www.rustcollege.edu/schedule-a-visit/ ',
//         SchoolId : '176318'
//     },
//     {
//         school: 'Savannah State University',
//         tour_url : 'https://www.savannahstate.edu/prospective-student/tours.shtml',
//         SchoolId : '140960'
//     },
//     // {
//     //     school: 'Selma University',
//     //     tour_url : 'https://www.selmauniversity.edu/academics',
//     //     SchoolId : ''
//     // },
//     {
//         school: 'Shaw University',
//         tour_url : 'https://www.shawu.edu/campustours/?terms=campus%20visit',
//         SchoolId : '199643'
//     },
//     {
//         school: 'Shelton State Community College- C A Fredd Campus',
//         tour_url : 'https://www.sheltonstate.edu/admissions-financial-aid/recruiting-and-outreach/visit-us/',
//         SchoolId : '102067'
//     },
//     {    	
//         school: 'Shorter College',
//         tour_url : 'https://www.shortercollege.edu/schedule-a-tour/',
//         SchoolId : '107840'
//     },
//     {
//         school: 'Simmons College of Kentucky',
//         tour_url : 'https://calendly.com/sckyadmissions/90min?month=2022-04',
//         SchoolId : '461759'
//     },
//     {
//         school: 'South Carolina State University',
//         tour_url : 'https://www2.scsu.edu/futurestudents/visitscstateuniversity.aspx',
//         SchoolId : '218733'
//     },
//     {
//         school: 'Southern University at New Orleans',
//         tour_url : 'https://www.suno.edu/page/visit-the-campus',
//         SchoolId : '160630'
//     },  
//     {
//         school: 'Southern University at Shreveport',
//         tour_url : 'https://www.susla.edu/page/schedule-a-visit',
//         SchoolId : '160649'
//     },
//     {
//         school: 'Southern University and A&M College',
//         tour_url : 'https://www.subr.edu/',
//         SchoolId : '160621'
//     },  
//     {
//         school: 'Southwestern Christian College',
//         tour_url : 'http://www.swcc.edu/directory.html',
//         SchoolId : '228486'
//     },  
//     {
//         school: 'Spelman College',
//         tour_url : 'https://www.spelman.edu/admissions/visit-us',
//         SchoolId : '141060'
//     },  
//     {
//         school: "St. Augustine's University",
//         tour_url : 'https://www.st-aug.edu/',
//         SchoolId : '199582'
//     },  
//     {
//         school: "St. Philip's College",
//         tour_url : 'https://www.alamo.edu/about-us/our-district/visit-our-district/',
//         SchoolId : '227854'
//     },
//     {
//         school: 'Stillman College',
//         tour_url : 'https://www.collegefactual.com/colleges/stillman-college/overview/virtual-tour/',
//         SchoolId : '102270'
//     },  
//     {
//         school: 'Talladega College',
//         tour_url : 'https://www.talladega.edu/tour-request/',
//         SchoolId : '102298'
//     },  
//     {
//         school: 'Tennessee State University',
//         tour_url : 'https://www.tnstate.edu/about_tsu/visit_us.aspx',
//         SchoolId : '221838'
//     },
//     {
//         school: 'Texas College',
//         tour_url : 'https://www.texascollege.edu/office-of-bradmissions/virtual-tour/',
//         SchoolId : '228884'
//     },  
//     {
//         school: 'Texas Southern University',
//         tour_url : 'http://www.tsu.edu/information-for/visitors.html',
//         SchoolId : '229063'
//     },
//     {
//         school: 'Tougaloo College',
//         tour_url : 'https://www.tougaloo.edu/admissions/visit-campus',
//         SchoolId : '176406'
//     },
//     {
//         school: 'H. Councill Trenholm State Community College',
//         tour_url : 'https://www.trenholmstate.edu/future-students/request-information/request-tour-for-school-organization/',
//         SchoolId : '102313'
//     },  
//     {
//         school: 'Tuskegee University',
//         tour_url : 'https://www.tuskegee.edu/tours',
//         SchoolId : '102377'
//     },
//     {
//         school: 'Virgin Islands, University of the',
//         tour_url : 'https://www.uvi.edu/enrollment/admissions/admissions-campus_tour.aspx',
//         SchoolId : '243665'
//     },
//     {
//         school: 'Virginia State University',
//         tour_url : 'https://www.vsu.edu/about/visit/index.php',
//         SchoolId : '234155'
//     },
//     {
//         school: 'Virginia Union University',
//         tour_url : 'https://www.vuu.edu/about-union/virtual-tour',
//         SchoolId : '234164'
//     },  
//     {
//         school: 'Virginia University of Lynchburg',
//         tour_url : 'https://admissions.lynchburg.edu/portal/campus-visit?utm_source=google&utm_medium=performance+max&utm_campaign=visit&utm_term=spring+22&gclid=CjwKCAjwjZmTBhB4EiwAynRmD4aEnNx62IoGmV4MTWuHujW1Ptqhu9KKZquBawCOuOfnUJlpImWGbBoCQpkQAvD_BwE',
//         SchoolId : '234137'
//     },
//     {
//         school: 'Voorhees University',
//         tour_url : 'https://www.voorhees.edu/admissions/office-of-admissions/visit-the-campus',
//         SchoolId : '218919'
//     },
//     {
//         school: 'West Virginia State University',
//         tour_url : 'https://www.wvstateu.edu/admissions/plan-a-visit-(1).aspx',
//         SchoolId : '237899'
//     },
//     {
//         school: 'Wilberforce University',
//         tour_url : 'https://wilberforce.edu/visit-wilberforce-form/',
//         SchoolId : '206491'
//     },
//     {
//         school: 'Wiley College',
//         tour_url : 'https://www.wileyc.edu/campus-tours/',
//         SchoolId : '229887'
//     },
//     {
//         school: 'Winston-Salem State University',
//         tour_url : 'https://www.wssu.edu/about/visit.html',
//         SchoolId : '199999'
//     },  
//     {
//         school: 'Xavier University of Louisiana',
//         tour_url : 'https://www.xula.edu/visitusundergraduate/individual-family-tours.html',
//         SchoolId : '160904'
//     },
//     {
//         school: 'Paul Quinn College',
//         tour_url : 'https://www.pqc.edu',
//         SchoolId : '227429'
//     },
//     {
//         school: 'Southern University Law Center',
//         tour_url : 'https://www.sulc.edu/',
//         SchoolId : '440916'
//     },
//     {
//         school: 'University of the District of Columbia-David A Clarke School of Law',
//         tour_url : 'https://law.udc.edu/',
//         SchoolId : '363721'
//     },
// ];	

// return tours
// }

const seed = async (school) => {

    await sequelize.sync({ force: true });

    await createSchools(0);
    await createSchools(1);
    const users = await createUsers(); // create users w/ encrypted passwords
   // const tours = await createTours();
    const userPromises = users.map(user => User.create(user));
    const itemPromises = items.map(item => Item.create(item));
   // const tourPromises = tours.map(tour => Tour.create(tour));  , ...tourPromises
    await Promise.all([...userPromises, ...itemPromises]);
    console.log("db populated!")
    
}

seed ();