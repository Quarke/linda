#!/bin/bash
for num in {0..10000..10}
do
        echo "Fetching page " $num
        touch novo$num.json
        while [ $(wc -l < novo$num.json) -lt 20 ]
        do
                sleep .1
                curl "https://bxeprod.oit.nd.edu/StudentRegistrationSsb/ssb/searchResults/searchResults?txt_term=201720&startDatepicker=&endDatepicker=&pageOffset=${num}&pageMaxSize=10&sortColumn=subjectDescription&sortDirection=asc" -H 'Cookie: JSESSIONID=KN95VmL7-Zoz5tzbx3pLyhp5whpuQEdRO6uYnF2sMtbRvm56hQke!242850307; _vis_opt_s=1%7C; com.silverpop.iMAWebCookie=92eb5262-dada-b9e5-b1be-413d13cbb667; __utma=3838575.2115510853.1503073464.1506568521.1507049592.5; __utmc=3838575; __utmz=3838575.1507049592.5.5.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _conductor_session=d2J1ZjcvT2RkejRXNEw3MGpTSDBLeld0VXd4Y1ZGTmdkamtwanVNMVRVU2k4M3ZyZEN0SXlwUG5GM1k5blUzcWJabVAvelpHYmVjYXFPK24rTCtFaExYdVNPWXlaVEpnRVgyRU94WkZzcVd2cnFGYkRUbVRDWjI2WGF6RUlOOC83Q1dnMk5CREZyQXlxVGNmRFNmWmh3PT0tLTREQTY4VEcrNlB0L0R5czVRTzJ6akE9PQ%3D%3D--47ceab828a918c4791a53a90896cb6ea4a492c37; IDMSESSID=jjohns48; _vwo_uuid_v2=E5BF9AD3CB9153AEE49FB81A4F61112A|f71123215ff6ddadbdb1baccc06a3ee7; _vis_opt_test_cookie=1; _gat=1; _ga=GA1.2.2115510853.1503073464; _gid=GA1.2.1930519786.1509411947; _gat_rollup=1' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (X11; CrOS x86_64 9765.85.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.123 Safari/537.36' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'X-Synchronizer-Token: 38ddaadd-e635-4bf4-8708-1d27d315e14f' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'Referer: https://bxeprod.oit.nd.edu/StudentRegistrationSsb/ssb/classSearch/classSearch' --compressed -o novo$num.json
        done
done
