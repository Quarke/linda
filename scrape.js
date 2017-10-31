const { exec, execSync } = require('child_process');
const ProgressBar = require('progress');
const fs = require('fs');
const async = require('async');
const cheerio = require('cheerio');

var bar;

const classUrl = "https://class-search-secure.nd.edu/reg/srch/ClassSearchServlet";
const curlArgs = "--cookie cookies.txt -H 'Origin: https://class-search-secure.nd.edu' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (X11; CrOS x86_64 9765.85.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.123 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' -H 'Cache-Control: max-age=0' -H 'Referer: https://class-search-secure.nd.edu/reg/srch/SecureClassSearchServlet' -H 'Connection: keep-alive'";
const allClassData = "'TERM=201720&DIVS=A&CAMPUS=M&SUBJ=ACCT&SUBJ=AME&SUBJ=AFAM&SUBJ=AFST&SUBJ=AS&SUBJ=AMST&SUBJ=ANTH&SUBJ=ACMS&SUBJ=MEAR&SUBJ=ARCH&SUBJ=ARHI&SUBJ=ARST&SUBJ=ART&SUBJ=AL&SUBJ=CORE&SUBJ=ALHN&SUBJ=ALPP&SUBJ=ASIA&SUBJ=BIOS&SUBJ=BIO&SUBJ=BAAC&SUBJ=BALW&SUBJ=BACM&SUBJ=BAEN&SUBJ=BAET&SUBJ=BAFI&SUBJ=BAMG&SUBJ=BA&SUBJ=BUAD&SUBJ=BAAL&SUBJ=BAEG&SUBJ=BASC&SUBJ=BAUG&SUBJ=CST&SUBJ=CSC&SUBJ=CBE&SUBJ=CHEM&SUBJ=EALC&SUBJ=MLTC&SUBJ=CE&SUBJ=CLAS&SUBJ=CSEM&SUBJ=CA&SUBJ=COMM&SUBJ=CSD&SUBJ=CAPP&SUBJ=CPSC&SUBJ=CSE&SUBJ=CDT&SUBJ=CNST&SUBJ=CSLC&SUBJ=DANC&SUBJ=DS&SUBJ=DESN&SUBJ=DMA&SUBJ=ESTM&SUBJ=LLEA&SUBJ=ECON&SUBJ=ECOE&SUBJ=EDU&SUBJ=EDUC&SUBJ=ESS&SUBJ=EE&SUBJ=ENER&SUBJ=ESTS&SUBJ=EG&SUBJ=EGBA&SUBJ=EGSC&SUBJ=ENGL&SUBJ=ELS&SUBJ=ENLT&SUBJ=ENWR&SUBJ=ENVG&SUBJ=ENVS&SUBJ=FTT&SUBJ=FIN&SUBJ=FYC&SUBJ=FYS&SUBJ=ROFR&SUBJ=MLTF&SUBJ=GWS&SUBJ=GSC&SUBJ=GE&SUBJ=GERO&SUBJ=GH&SUBJ=GLST&SUBJ=GRED&SUBJ=CLGR&SUBJ=MEHE&SUBJ=HESB&SUBJ=HIST&SUBJ=HPS&SUBJ=HUST&SUBJ=HUM&SUBJ=ITAO&SUBJ=IUSM&SUBJ=IIPS&SUBJ=IBMS&SUBJ=ICS&SUBJ=IDS&SUBJ=IRLL&SUBJ=IRST&SUBJ=ROIT&SUBJ=EALJ&SUBJ=JED&SUBJ=JUST&SUBJ=KSGA&SUBJ=EALK&SUBJ=LAST&SUBJ=CLLA&SUBJ=ILS&SUBJ=LAW&SUBJ=LIT&SUBJ=MBCM&SUBJ=MBET&SUBJ=MBLW&SUBJ=MBAC&SUBJ=MBAE&SUBJ=MBGR&SUBJ=MBAL&SUBJ=MGT&SUBJ=MGTO&SUBJ=MGTC&SUBJ=MGTE&SUBJ=MGTI&SUBJ=MARK&SUBJ=MBA&SUBJ=MGA&SUBJ=MNA&SUBJ=MSM&SUBJ=MSBA&SUBJ=MSB&SUBJ=MSA&SUBJ=MSF&SUBJ=MSMG&SUBJ=MATH&SUBJ=MI&SUBJ=MELC&SUBJ=MSL&SUBJ=MODL&SUBJ=MUS&SUBJ=NSCI&SUBJ=CLST&SUBJ=NURS&SUBJ=PATC&SUBJ=PATL&SUBJ=PHIL&SUBJ=PRL&SUBJ=PE&SUBJ=PHYS&SUBJ=POLS&SUBJ=POSC&SUBJ=ROPO&SUBJ=PS&SUBJ=PCSE&SUBJ=PLS&SUBJ=PSY&SUBJ=PSYC&SUBJ=REG&SUBJ=RLT&SUBJ=RLST&SUBJ=LLRO&SUBJ=RU&SUBJ=SC&SUBJ=SCGE&SUBJ=SCPP&SUBJ=STV&SUBJ=SDM&SUBJ=SBCM&SUBJ=SW&SUBJ=SOC&SUBJ=SPLL&SUBJ=ROSP&SUBJ=MLTS&SUBJ=SMC&SUBJ=SUS&SUBJ=CLSS&SUBJ=THTR&SUBJ=THEO&SUBJ=UB&SUBJ=VHNR&SUBJ=WOST&SUBJ=WR&ATTR=0ANY&CREDIT=A' --compressed";

function scrape() {
  let allClassCommand = `curl '${classUrl}' ${curlArgs} --data ${allClassData}`;
  let allClassPage = execSync(allClassCommand, { shell: true}).toString();

  const $ = cheerio.load(allClassPage);
  classes = $('table#resulttable tbody tr').get();

  console.log(`Getting detail pages for ${classes.length} classes`);
  bar = new ProgressBar(':bar :percent :eta s remaining', {total: classes.length});
  async.eachLimit(classes, 5,
    (c, next) => {
      let details = {};
      let cols = $(c).children('td');
      // Subject and course # in col 0
      let course = cols.eq(0).children('a').eq(0).text();
      details.subj = course.match(/([A-Z]+)/g)[0];
      details.courseNumber = course.match(/([0-9]{5})/g)[0];

      // CRN in col 7
      details.crn = cols.eq(7).text();

      // Course title in col 1
      details.title = cols.eq(1).text();

      // Credits in col 2
      details.credits = cols.eq(2).text();

      // Professor in col 9
      details.professor = cols.eq(9).children('a').eq(0).text();

      // Times in col 10
      let time = cols.eq(10).text();
      let re = /([M|T|W|R|F|S|N])/g;
      let r = time.match(re);
      if (r) {
        details.m = r.indexOf('M') >= 0;
        details.t = r.indexOf('T') >= 0;
        details.w = r.indexOf('W') >= 0;
        details.r = r.indexOf('R') >= 0;
        details.f = r.indexOf('F') >= 0;
        details.s = r.indexOf('S') >= 0;
        details.n = r.indexOf('N') >= 0;
      }
      re = /([0-9]+\:[0-9]+[A|P])/g;
      r = time.match(re);
      if (r) {
        details.start_time = convertTimeToDateObj(r[0]);
        details.end_time = convertTimeToDateObj(r[1]);
      }


      // Details link in col 0, use to get rest of details
      a = cols.eq(0).children('a').eq(0).attr('href');
      re = /\'ClassSearchServlet(\?.*)\',.*/i
      r  = a.match(re);
      if (r) {
        let queryParams = r[1];
        getDetails(`${classUrl}${queryParams}`, details, next);
      }
    },
    (err) => {
      console.log('error', err);
      console.log('done');
    }
  )
}

function getDetails(url, details, next) {
  let detailsCommand = `curl '${url}' ${curlArgs}`
  exec(detailsCommand, (err, stdout, stderr) => {
    let detailsPage = stdout.toString();
    const $ = cheerio.load(detailsPage);
    details.description = $('table.datadisplaytable tbody tr').eq(1).children('td').eq(0).text().replace(/(\r\n|\n|\r)/gm, '');
    details.description = details.description.match(/Course.Description\:(.*)Associated.Term\:/)[1];
    
    //TODO insert into database
    bar.tick();
    next(null);
  });

}

function convertTimeToDateObj(time) {
  let pm = time.substring(time.length-1) == 'P';
  time = time.substring(0, time.length-1);
  let hours, min;
  [hours, min] = time.split(":");
  hours = parseInt(hours); min = parseInt(min);
  if (pm = 'P' && hours < 12) {
    hours += 12;
  }

  let d = new Date();
  d.setUTCHours(hours, min, 0);
  return d;
}

scrape();
