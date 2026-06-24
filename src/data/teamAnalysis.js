// Comprehensive team analysis data for all 48 FIFA WC 2026 teams
// Used by the local AI analysis engine — no API key needed

export const TEAM_ANALYSIS = {
  // ═══ GROUP A ═══════════════════════════════════════════════════════════
  mex: { rank:15, style:'High-pressing, attacking fullbacks, set-piece threat',
    strengths:['Explosive wide forwards','Passionate home support in Estadio Azteca','Strong in CONCACAF-tested matches'],
    weaknesses:['Tendency to concede on the counter','Historically struggle past Round of 16'],
    keyPlayers:[{name:'Hirving "Chucky" Lozano',pos:'FW',rtg:84,desc:'Explosive winger with pace and direct dribbling — key man in transition attacks'},{name:'Edson Álvarez',pos:'CM',rtg:83,desc:'Premier League-tested DM who anchors Mexico\'s midfield and drives forward play'}],
    form:['W','W','D','W','L'], wcHistory:'7x Round of 16 appearances, yet to reach QF' },

  kor: { rank:20, style:'Disciplined pressing, fast vertical transitions, collective work-rate',
    strengths:['Outstanding high defensive line','Resilience under pressure','Son leads deadly counter-attacks'],
    weaknesses:['Can be exposed by physicality in midfield','Struggles against deep-block teams'],
    keyPlayers:[{name:'Son Heung-min',pos:'FW',rtg:89,desc:'Premier League legend and captain — clinical finisher who can single-handedly change games'},{name:'Kim Min-jae',pos:'CB',rtg:87,desc:'World-class centre-back with Champions League pedigree, commanding in the air and on the ground'}],
    form:['W','D','W','W','D'], wcHistory:'Semi-finalists 2002, consistent knockout round presence' },

  rsa: { rank:42, style:'Organised defensive block, quick transitions on the break',
    strengths:['Physical and combative midfield','Strong team spirit','Dangerous on set pieces'],
    weaknesses:['Limited world-class individual quality','Lack of top-level European experience'],
    keyPlayers:[{name:'Percy Tau',pos:'FW',rtg:79,desc:'Club Brugge attacker with pace and creativity — South Africa\'s biggest attacking threat'},{name:'Ronwen Williams',pos:'GK',rtg:80,desc:'AFCON-winning goalkeeper known for his shot-stopping ability and commanding presence'}],
    form:['W','D','L','W','D'], wcHistory:'Hosts 2010, struggled in group stages on return appearances' },

  cze: { rank:34, style:'Structured 4-2-3-1, direct play, aerial threats',
    strengths:['Experienced European campaign veterans','Dangerous from set pieces','Solid defensive organisation'],
    weaknesses:['Lack of top-end pace in attack','Over-reliance on counter-attack'],
    keyPlayers:[{name:'Patrik Schick',pos:'FW',rtg:85,desc:'Bundesliga golden boot contender — powerful and clinical finisher who thrives on through-balls'},{name:'Tomáš Souček',pos:'CM',rtg:84,desc:'West Ham powerhouse who contributes goals from midfield and wins aerial battles all night long'}],
    form:['D','W','W','L','W'], wcHistory:'Czechoslovakia QF 1962; Czech Republic solid at EURO level' },

  // ═══ GROUP B ═══════════════════════════════════════════════════════════
  can: { rank:27, style:'High energy pressing, physically intense, set-piece reliance',
    strengths:['Young hungry squad motivated as hosts','Alphonso Davies is world-class LB/LW','Jonathan David a proven goal-scorer in Ligue 1'],
    weaknesses:['Limited WC experience','Defensive fragility under sustained pressure'],
    keyPlayers:[{name:'Alphonso Davies',pos:'LW/LB',rtg:88,desc:'Bayern Munich speed demon — can play wing or left-back, creates havoc down the flank in every game'},{name:'Jonathan David',pos:'ST',rtg:86,desc:'Consistent Ligue 1 top scorer with composure in the box and intelligent movement off the ball'}],
    form:['W','W','W','D','W'], wcHistory:'First WC 1986, returned 2022, hosting 2026 as a catalyst' },

  bih: { rank:44, style:'Technical possession, creative in wide areas, set-piece quality',
    strengths:['Technically gifted midfield','Dangerous from wide positions','Strong in possession-based play'],
    weaknesses:['Inconsistency in big tournaments','Defensive errors at critical moments'],
    keyPlayers:[{name:'Armin Hodžić',pos:'FW',rtg:78,desc:'Powerful striker who leads the line with strength and hold-up play, creating space for teammates'},{name:'Nikola Jurić',pos:'MF',rtg:77,desc:'Creative playmaker who links midfield and attack, capable of unlocking defences with killer passes'}],
    form:['D','W','L','W','W'], wcHistory:'Only WC 2014 (group stage exit)' },

  qat: { rank:50, style:'Organised deep block, direct counter-attacks, set-piece focus',
    strengths:['Tournament hosting experience (2022)','Strong collective team spirit','Akram Afif leads clever attacking play'],
    weaknesses:['Limited individual quality against elite nations','Struggled against top competition in 2022'],
    keyPlayers:[{name:'Akram Afif',pos:'FW',rtg:81,desc:'AFC Player of Year who combines technical skill with pace — Qatar\'s most dangerous creative force'},{name:'Almoez Ali',pos:'ST',rtg:78,desc:'AFC Cup all-time top scorer with clinical instincts and aerial threat in and around the penalty area'}],
    form:['L','W','D','L','W'], wcHistory:'Hosts 2022, eliminated in group stage' },

  sui: { rank:13, style:'Compact pressing unit, transitions, tactical discipline',
    strengths:['Rock-solid defensive organisation','Euro-proven big game mentality','Xhaka\'s world-class engine in midfield'],
    weaknesses:['Tend to underperform against top opposition','Lack of genuine match-winner'],
    keyPlayers:[{name:'Granit Xhaka',pos:'CM',rtg:85,desc:'Bayer Leverkusen champion — relentless pressing, long-range strikes and experienced tournament leadership'},{name:'Manuel Akanji',pos:'CB',rtg:84,desc:'Man City centre-back: reads the game brilliantly and is composed in possession from defence'}],
    form:['W','D','W','W','D'], wcHistory:'Consistent QF contenders (2022 QF appearance)' },

  // ═══ GROUP C ═══════════════════════════════════════════════════════════
  bra: { rank:5, style:'Technical brilliance, fluid positional play, creative freedom',
    strengths:['World-class front three with pace and skill','Relentless pressing and winning mentality','Strongest squad depth in tournament'],
    weaknesses:['Sometimes overcomplicates simple situations','Defensive lapses under set-piece pressure'],
    keyPlayers:[{name:'Vinícius Jr.',pos:'LW',rtg:92,desc:'Champions League winner — impossibly fast and skilful winger who terrorises any full-back on the planet'},{name:'Rodrygo',pos:'RW/ST',rtg:89,desc:'Big-game performer who delivers in Champions League knockouts — Brazil\'s clutch player when it counts'}],
    form:['W','W','W','D','W'], wcHistory:'Record 5 WC titles, hungry to end 24-year drought' },

  mar: { rank:17, style:'Compact defensive block, lethal on transitions, set-piece menace',
    strengths:['2022 WC semi-final experience invaluable','Achraf Hakimi is world-class in attack and defence','Organised and disciplined tactical structure'],
    weaknesses:['Possession-based attacks can be limited','Reliant on defensive discipline holding'],
    keyPlayers:[{name:'Achraf Hakimi',pos:'RB/RW',rtg:88,desc:'PSG\'s world-class right-back who combines pace, dribbling and crossing in an extraordinary attacking role'},{name:'Hakim Ziyech',pos:'AM',rtg:83,desc:'Tricky left-foot technician who provides creativity, set-piece delivery and moments of magic in tight spaces'}],
    form:['W','D','W','W','D'], wcHistory:'Historic 2022 semi-finalists, first African team in WC semis' },

  sco: { rank:36, style:'High energy pressing, direct ball play, relentless work-rate',
    strengths:['Andrew Robertson: world\'s best left-back','Physical intensity unsettles technical teams','Scott McTominay: goals from midfield'],
    weaknesses:['Limited quality in central striking position','Tend to fatigue in latter stages'],
    keyPlayers:[{name:'Andrew Robertson',pos:'LB',rtg:87,desc:'Liverpool captain — arguably the world\'s best left-back, provides incredible attacking width and defensive leadership'},{name:'Scott McTominay',pos:'CM',rtg:83,desc:'Manchester United box-to-box midfielder who has scored crucial goals and brings physicality and drive'}],
    form:['W','W','D','W','D'], wcHistory:'Multiple failed qualifications — 2026 is historic return' },

  hai: { rank:55, style:'Athletic and direct, fast wide play, emotional and unpredictable',
    strengths:['Young athletic squad with hunger','Can upset complacent opponents','Determined and passionate playing style'],
    weaknesses:['Limited experience at this level','Defensive organisation can break down'],
    keyPlayers:[{name:'Frantzdy Pierrot',pos:'FW',rtg:74,desc:'Energetic striker with pace who runs channels relentlessly and can create problems when Haiti transition'},{name:'James Léger',pos:'MF',rtg:72,desc:'Dynamic midfielder who provides the drive in Haiti\'s press and attempts to connect defence to attack'}],
    form:['D','L','W','D','L'], wcHistory:'First WC appearance — historic milestone for Haitian football' },

  // ═══ GROUP D ═══════════════════════════════════════════════════════════
  usa: { rank:14, style:'Athletic pressing, vertical transitions, set-piece quality',
    strengths:['Christian Pulisic: world-class threat','Host nation advantage across 11 stadiums','Young core with European top-flight experience'],
    weaknesses:['Can lack composure in possession in high-pressure moments','Defensive inconsistency against quality opposition'],
    keyPlayers:[{name:'Christian Pulisic',pos:'AM/FW',rtg:86,desc:'AC Milan\'s American hero — combines direct dribbling with clinical finishing and is USA\'s undisputed difference-maker'},{name:'Weston McKennie',pos:'CM',rtg:82,desc:'Juventus powerhouse who covers every blade of grass, adds goals from set pieces and drives USA\'s high press'}],
    form:['W','W','D','W','W'], wcHistory:'Hosts 1994 (QF), strong 2022 R16 showing' },

  par: { rank:43, style:'Organised defensively, quick counter-attacks, set-piece strength',
    strengths:['Physically strong and difficult to break down','Efficient use of counter-attacks','Strong South American qualifying record'],
    weaknesses:['Limited creativity in attack','Can be passive against stronger opposition'],
    keyPlayers:[{name:'Miguel Almirón',pos:'AM',rtg:82,desc:'Newcastle United\'s midfield dynamo — relentless energy, late runs into the box and work-rate that never stops'},{name:'Gustavo Gómez',pos:'CB',rtg:83,desc:'Palmeiras captain and Copa Libertadores winner — commanding centre-back who organises the defensive structure'}],
    form:['D','W','D','W','D'], wcHistory:'QF 2010, consistent South American qualifier' },

  aus: { rank:22, style:'Physical pressing, direct play, disciplined defensive unit',
    strengths:['Excellent team spirit and togetherness','Mat Ryan: experienced and reliable goalkeeper','Strong set-piece threat at both ends'],
    weaknesses:['Lack of top individual quality in attack','Distance from Europe makes squad cohesion challenging'],
    keyPlayers:[{name:'Mitchell Duke',pos:'FW',rtg:79,desc:'Powerful target striker who leads the line effectively and provides aerial threat from set-pieces'},{name:'Ajdin Hrustic',pos:'CM',rtg:78,desc:'Creative midfielder with Italian football experience who provides technical quality in Australia\'s build-up play'}],
    form:['W','D','W','L','W'], wcHistory:'2006 QF, memorable 2022 R16 — consistent improvers' },

  tur: { rank:25, style:'Aggressive pressing, quick transitions, attacking fullbacks',
    strengths:['Arda Güler: generational talent','Hakan Çalhanoğlu is world-class CM','Strong recent EURO performances (EURO 2024 QF)'],
    weaknesses:['Can be tactically undisciplined','Defensive lapses against pace'],
    keyPlayers:[{name:'Arda Güler',pos:'AM',rtg:87,desc:'Real Madrid\'s 21-year-old sensation — extraordinary technical talent, capable of producing moments of genius at any time'},{name:'Hakan Çalhanoğlu',pos:'CM',rtg:88,desc:'Inter Milan\'s metronomic midfielder — incredible passing range, long-range shooting and press-resistance make him elite'}],
    form:['W','W','D','W','D'], wcHistory:'Third place 2002, strong recent trajectory' },

  // ═══ GROUP E ═══════════════════════════════════════════════════════════
  ger: { rank:9, style:'Dynamic pressing, fluid positional play, technical excellence',
    strengths:['Musiala and Wirtz: unstoppable double act','Deep quality throughout the squad','Clinical finishing and direct playing style'],
    weaknesses:['Can be exposed on transitions defensively','Recent EURO exit memories still fresh'],
    keyPlayers:[{name:'Jamal Musiala',pos:'AM/FW',rtg:91,desc:'Bayern Munich magician — elusive movement, incredible dribbling under pressure and composure in front of goal at just 22'},{name:'Florian Wirtz',pos:'AM',rtg:90,desc:'Bayer Leverkusen\'s unbeaten season architect — creative genius who unlocks defences with through-balls and late runs'}],
    form:['W','W','W','D','W'], wcHistory:'4x World Champions, hosts EURO 2024, deeply motivated in 2026' },

  ecu: { rank:24, style:'Disciplined pressing, physical midfield, set-piece strength',
    strengths:['Moisés Caicedo: elite midfield engine','Cohesive team organisation','Physically strong and disciplined defensive shape'],
    weaknesses:['Limited attacking creativity beyond key players','Can struggle against high-quality possession teams'],
    keyPlayers:[{name:'Moisés Caicedo',pos:'CM',rtg:87,desc:'Chelsea\'s £115m midfield titan — outstanding interceptions, relentless energy and long-range strikes that change games'},{name:'Piero Hincapié',pos:'LB/CB',rtg:84,desc:'Bayer Leverkusen\'s versatile defender who provides superb athleticism and contributed to that historic unbeaten season'}],
    form:['D','W','D','W','W'], wcHistory:'Opened 2022 WC with goal vs hosts, consistent qualifier' },

  civ: { rank:30, style:'Physical and direct, wide attacking threat, resilient defending',
    strengths:['Sébastien Haller: powerful target man','Franck Kessié\'s engine in midfield','Technical players throughout the team'],
    weaknesses:['Can be vulnerable defensively to pace','Inconsistency at tournament level'],
    keyPlayers:[{name:'Sébastien Haller',pos:'ST',rtg:83,desc:'Ajax hero who overcame cancer to return to world football — powerful in the air and highly effective in the penalty area'},{name:'Franck Kessié',pos:'CM',rtg:84,desc:'Barcelona\'s physical powerhouse who drives forward relentlessly, scores crucial goals and wins every midfield duel'}],
    form:['W','D','W','W','D'], wcHistory:'2006 last 16, strong African Cup records' },

  cuw: { rank:58, style:'Compact and organised, physical defending, fighting spirit',
    strengths:['Strong team identity and togetherness','Capable of tactical disruption against top teams','Backs-against-the-wall defensive mentality'],
    weaknesses:['Significant gap in quality to top nations','Limited attacking options at this level'],
    keyPlayers:[{name:'Leandro Bacuna',pos:'CM',rtg:75,desc:'Their most experienced European player whose technical quality and organisation is critical in midfield'},{name:'Rangelo Janga',pos:'FW',rtg:72,desc:'Athletic forward who uses pace and direct running to trouble defenders and create space for teammates'}],
    form:['L','D','W','L','D'], wcHistory:'First ever World Cup appearance — historic for the island nation' },

  // ═══ GROUP F ═══════════════════════════════════════════════════════════
  ned: { rank:8, style:'Total Football revival: pressing, positional play, width',
    strengths:['Cody Gakpo and Dumfries: lethal wide threat','Virgil van Dijk: best defender in the world','Young core supplemented by experienced veterans'],
    weaknesses:['Can struggle to break down deep defensive blocks','Tendency to inconsistency in tournament knockout games'],
    keyPlayers:[{name:'Cody Gakpo',pos:'LW/ST',rtg:87,desc:'Liverpool\'s versatile attacker — provides direct running, clinical finishing and intelligent movement both wide and central'},{name:'Virgil van Dijk',pos:'CB',rtg:91,desc:'Liverpool captain and arguably the world\'s best centre-back — commanding presence, elite reading of the game and dominant aerial ability'}],
    form:['W','D','W','W','W'], wcHistory:'Finalists 2010, strong 2022 QF — this squad has final ambitions' },

  jpn: { rank:19, style:'Intense pressing, positional interchange, technical quality',
    strengths:['Bundesliga-heavy squad with elite European experience','Excellent tactical discipline and organisation','Proven ability to beat top nations (Germany, Spain 2022)'],
    weaknesses:['Physical disadvantage against bigger European sides','Attack can lack directness in tight moments'],
    keyPlayers:[{name:'Takefusa Kubo',pos:'AM/RW',rtg:86,desc:'Real Sociedad\'s tricky playmaker — exceptional technical ability, vision and directness make him one of Asia\'s finest players'},{name:'Ritsu Doan',pos:'RW',rtg:84,desc:'Freiburg\'s tireless wide man who scored crucial goals in 2022 and brings work-rate, creativity and goals from wide areas'}],
    form:['W','W','D','W','W'], wcHistory:'R16 2022 (PKs vs Croatia), consistent tournament improvers' },

  tun: { rank:35, style:'Defensive solidity, physical intensity, counter-attacking threat',
    strengths:['Excellent defensive structure','Strong collective team discipline','Experienced management and tournament nous'],
    weaknesses:['Limited attacking quality beyond individual moments','Struggle to create chances against organised defences'],
    keyPlayers:[{name:'Hannibal Mejbri',pos:'CM',rtg:80,desc:'Manchester United academy graduate making his mark — technical and combative, provides the creative spark in Tunisia\'s midfield'},{name:'Ellyes Skhiri',pos:'CM',rtg:79,desc:'FC Köln\'s experienced and disciplined holding midfielder who is the engine of Tunisia\'s hard-working pressing game'}],
    form:['D','W','D','D','W'], wcHistory:'Never past group stage, but always competitive' },

  swe: { rank:23, style:'Organised pressing, direct and physical, strong collective',
    strengths:['Alexander Isak: world-class finisher','Dejan Kulusevski: brilliant link-play and directness','Strong Bundesliga/Premier League core throughout squad'],
    weaknesses:['Can be direct and predictable against organised blocks','Miss the Ibrahimović era leadership'],
    keyPlayers:[{name:'Alexander Isak',pos:'ST',rtg:88,desc:'Newcastle United\'s £70m striker who is one of the best in the Premier League — exceptional feet, pace and a lethal finisher'},{name:'Dejan Kulusevski',pos:'AM/RW',rtg:85,desc:'Tottenham\'s brilliant number 10 who provides assists, goals and relentless forward movement in Sweden\'s attack'}],
    form:['W','W','D','W','W'], wcHistory:'Hosts 1958 (Finalists), third 1994 — underrated tournament nation' },

  // ═══ GROUP G ═══════════════════════════════════════════════════════════
  bel: { rank:7, style:'Possession-based build-up, individual quality throughout',
    strengths:['Kevin De Bruyne — still elite at 35','Squad refreshed with new generation talent','Champions League winners throughout the lineup'],
    weaknesses:['Golden Generation era now truly over','New young squad still gelling at tournament level'],
    keyPlayers:[{name:'Kevin De Bruyne',pos:'CM/AM',rtg:90,desc:'Manchester City legend — even at 35, his vision, passing and set-piece delivery remain among the best in world football'},{name:'Leandro Trossard',pos:'LW/ST',rtg:85,desc:'Arsenal\'s versatile forward who provides goals and assists from wide positions with an intelligent and technical style of play'}],
    form:['W','W','W','D','W'], wcHistory:'2018 Bronze medal — Belgium\'s best ever WC performance' },

  irn: { rank:28, style:'Ultra-compact defence, physical midfield, set-piece threat',
    strengths:['Excellent defensive organisation and solidity','Mehdi Taremi: world-class striker at Porto/Inter','Strong in one-off knockout-style matches'],
    weaknesses:['Limited possession play against elite nations','Struggles to break down well-organised defensive teams'],
    keyPlayers:[{name:'Mehdi Taremi',pos:'ST',rtg:84,desc:'Inter Milan striker who brings technical finesse, intelligent movement and crucial goals to Iran\'s otherwise physical game'},{name:'Sardar Azmoun',pos:'FW',rtg:82,desc:'Bayer Leverkusen\'s clinical forward — known as the Iranian Messi for his technical quality and ability to create from nothing'}],
    form:['W','W','D','W','D'], wcHistory:'2022 R16 appearance, improving Asian powerhouse' },

  egy: { rank:31, style:'Compact, Mohamed Salah-driven attacks, solid defensively',
    strengths:['Mohamed Salah: potentially greatest African player ever','Strong defensive block when protecting a lead','Set-piece quality from wide areas'],
    weaknesses:['Over-reliance on Salah — if contained, Egypt struggle','Limited depth if key players are absent'],
    keyPlayers:[{name:'Mohamed Salah',pos:'RW/FW',rtg:90,desc:'Liverpool legend at 34 — still producing extraordinary numbers and capable of destroying any defence on his day with pace and finishing'},{name:'Omar Marmoush',pos:'FW/AM',rtg:84,desc:'Eintracht Frankfurt\'s breakthrough star — tricky, direct and clinical, provides a dangerous secondary option beyond Salah'}],
    form:['W','D','W','W','D'], wcHistory:'Absent for 28 years before 2018 return; building towards glory' },

  nzl: { rank:45, style:'Direct and athletic, disciplined shape, physical duels',
    strengths:['Chris Wood: Premier League proven striker','Strong team spirit and fighting mentality','Disciplined defensive compactness'],
    weaknesses:['Significant quality gap to top nations','Limited technical quality in midfield'],
    keyPlayers:[{name:'Chris Wood',pos:'ST',rtg:80,desc:'Premier League veteran with a prolific goalscoring record — physically dominant and clinical when chances arrive in the box'},{name:'Joe Bell',pos:'CM',rtg:74,desc:'Midfield workhorse who competes in European football and provides the energy and intensity New Zealand need to compete'}],
    form:['D','W','D','L','W'], wcHistory:'2010 group stage (only goal-less unbeaten team), 2026 return' },

  // ═══ GROUP H ═══════════════════════════════════════════════════════════
  esp: { rank:3, style:'Possession-dominating tiki-taka evolution, high pressing',
    strengths:['Deepest technical midfield in the tournament','Pedri-Rodri axis is world-class','Lamine Yamal: 18-year-old generational talent'],
    weaknesses:['Can be vulnerable to direct counter-attacks','Occasionally lack cutting edge in final third'],
    keyPlayers:[{name:'Lamine Yamal',pos:'RW',rtg:90,desc:'Barcelona\'s 18-year-old sensation who won EURO 2024 as a 16-year-old — dribbling, pace and vision beyond his years is terrifying'},{name:'Rodri',pos:'CM/DM',rtg:92,desc:'Ballon d\'Or winner and Man City\'s heartbeat — the greatest holding midfielder in the world right now, controlling every game'}],
    form:['W','W','W','W','D'], wcHistory:'2010 World Champions, EURO 2024 winners — dominant Spain is back' },

  ury: { rank:10, style:'Intense pressing, physical and direct, veteran leadership',
    strengths:['Darwin Núñez: explosive world-class striker','Federico Valverde: elite Real Madrid midfielder','Punching above weight with small nation depth'],
    weaknesses:['Squad aging in key positions','Can resort to overly physical play against quality'],
    keyPlayers:[{name:'Darwin Núñez',pos:'ST',rtg:88,desc:'Liverpool\'s explosive striker — raw power, incredible pace and an eye for goal that makes him one of the most dangerous forwards in world football'},{name:'Federico Valverde',pos:'CM',rtg:89,desc:'Real Madrid\'s box-to-box phenomenon — extraordinary engine, goal-scoring ability and Champions League winner who is arguably world\'s best midfielder'}],
    form:['W','D','W','W','W'], wcHistory:'2x World Champions (1930,1950) — dark horse with enormous pedigree' },

  ksa: { rank:40, style:'Compact defending, direct counter-attacks, physical midfield',
    strengths:['Legendary 2022 upset vs Argentina creates belief','Salem Al-Dawsari provides creative sparks','Strong collective defensive structure'],
    weaknesses:['Limited quality against world-class opposition','Struggles to maintain intensity for 90 minutes'],
    keyPlayers:[{name:'Salem Al-Dawsari',pos:'LW/AM',rtg:81,desc:'Al-Hilal\'s creative wizard who scored that iconic winner vs Argentina in 2022 — quick, technical and capable of extraordinary moments'},{name:'Mohammed Al-Owais',pos:'GK',rtg:80,desc:'Experienced goalkeeper and AFC\'s best stopper who made crucial saves in 2022 and remains Saudi\'s last line of quality'}],
    form:['W','D','L','W','W'], wcHistory:'2022 miracle vs Argentina — Saudi football on the rise' },

  cpv: { rank:41, style:'Energetic and direct, physical battles, emotional intensity',
    strengths:['Gelson Martins provides pace and skill on the wing','Strong national pride and togetherness','AFCON pedigree against African nations'],
    weaknesses:['First WC finals — inexperience at this level','Limited quality depth throughout the squad'],
    keyPlayers:[{name:'Gelson Martins',pos:'RW',rtg:80,desc:'Experienced winger with Ligue 1 experience whose direct running and pace is Cape Verde\'s primary attacking weapon'},{name:'Roberto Lopes',pos:'CB',rtg:76,desc:'Shamrock Rovers captain and tower of strength at the back — Cape Verde\'s defensive leader who organises and commands the block'}],
    form:['W','W','D','W','L'], wcHistory:'First World Cup appearance — celebrating through the qualification alone' },

  // ═══ GROUP I ═══════════════════════════════════════════════════════════
  fra: { rank:2, style:'World-class everywhere: pace, technical quality, depth',
    strengths:['Kylian Mbappé: the best player on the planet','Extraordinary squad depth in every position','Tactical intelligence of Deschamps system'],
    weaknesses:['Internal squad harmony occasionally questioned','Can be complacent against perceived lesser opposition'],
    keyPlayers:[{name:'Kylian Mbappé',pos:'CF/LW',rtg:96,desc:'The world\'s best player — Real Madrid\'s talisman combines electric pace with exceptional finishing, dribbling and vision at just 27'},{name:'Antoine Griezmann',pos:'AM/ST',rtg:87,desc:'Atlético Madrid legend and set-piece master who provides tactical intelligence, tireless work-rate and crucial goals for Les Bleus'}],
    form:['W','W','W','W','D'], wcHistory:'2x Champions (1998, 2018), 2022 Finalists — prime contenders' },

  sen: { rank:21, style:'Physical intensity, pace in transition, collective cohesion',
    strengths:['Sadio Mané: legendary winger even at 34','Strong AFCON champion mentality','Highly organised defensively with quality individual players'],
    weaknesses:['Over-reliance on Mané at this stage of his career','Lack of prolific central striker beyond Boulaye Dia'],
    keyPlayers:[{name:'Sadio Mané',pos:'LW/FW',rtg:85,desc:'African legend still performing at the top level — pace and directness may have dimmed slightly but his experience and quality remain formidable'},{name:'Ismaila Sarr',pos:'RW',rtg:83,desc:'Athletic right winger with Premier League experience whose pace, directness and final ball delivery provide constant danger for opponents'}],
    form:['W','D','W','W','W'], wcHistory:'2002 Finalists, 2022 R16 — AFCON champions with ambition' },

  nor: { rank:23, style:'Powerful direct football, set-piece menace, high press',
    strengths:['Erling Haaland: most lethal striker on Earth','Martin Ødegaard provides creative excellence from midfield','Physical and direct style that unsettles any defence'],
    weaknesses:['Can be one-dimensional when Haaland is contained','Defensive vulnerabilities on the counter-attack'],
    keyPlayers:[{name:'Erling Haaland',pos:'ST',rtg:95,desc:'Man City\'s record-breaker — the most clinical striker in history, combines extraordinary pace, power and finishing to score seemingly impossible goals'},{name:'Martin Ødegaard',pos:'AM',rtg:88,desc:'Arsenal captain and Norway\'s heartbeat — creative genius who provides vision, technique and decisive goals from the number 10 role'}],
    form:['W','W','W','D','W'], wcHistory:'First WC since 1998 — Haaland\'s redemption tournament' },

  irq: { rank:48, style:'Defensive compactness, disciplined shape, set-piece focus',
    strengths:['Strong collective defensive organisation','Fighting spirit and determination','Dangerous at dead-ball situations'],
    weaknesses:['Limited quality at the top level','Physical and technical gap to elite nations is substantial'],
    keyPlayers:[{name:'Mohanad Ali',pos:'FW',rtg:74,desc:'Iraq\'s primary striker who leads the line with energy and determination, providing the focal point for their counter-attacking play'},{name:'Hussein Ali',pos:'MF',rtg:72,desc:'Experienced midfielder who provides discipline and organisation in Iraq\'s compact midfield structure'}],
    form:['W','D','L','W','D'], wcHistory:'1986 last appearance; back after 40 years — extraordinary achievement' },

  // ═══ GROUP J ═══════════════════════════════════════════════════════════
  arg: { rank:1, style:'Brilliant positional play, attacking freedom, defensive work-rate',
    strengths:['Messi at 38: still the GOAT in his final WC','Enzo Fernández and Valverde: elite midfield','Defending champions with winning mentality DNA'],
    weaknesses:['Messi\'s physical durability over long tournament','Defensive age in some positions'],
    keyPlayers:[{name:'Lionel Messi',pos:'AM/CF',rtg:94,desc:'The greatest of all time in his final World Cup — still capable of extraordinary moments and holds the secrets to unlocking any defence on Earth'},{name:'Enzo Fernández',pos:'CM',rtg:88,desc:'Chelsea\'s World Cup winner who has fulfilled his potential — powerful, technical and a complete modern midfielder who drives Argentina forward'}],
    form:['W','W','D','W','W'], wcHistory:'3x World Champions — defending the title with Messi as final chapter' },

  aut: { rank:33, style:'High pressing, technical possession, modern tactical approach',
    strengths:['Experiencing a golden generation of players','David Alaba\'s leadership even at 34','Aggressive pressing system disrupts any opponent'],
    weaknesses:['WC tournament inexperience at this level','Can run out of ideas against deeper defensive blocks'],
    keyPlayers:[{name:'Marcel Sabitzer',pos:'CM',rtg:83,desc:'Manchester United midfielder whose energy, range of passing and goals from midfield make him Austria\'s most important player'},{name:'Nicolas Seiwald',pos:'CM',rtg:81,desc:'RB Leipzig\'s accomplished midfielder who combines defensive discipline with forward runs and is Austria\'s future midfield anchor'}],
    form:['W','D','W','W','D'], wcHistory:'First WC since 1998 — new era of Austrian football arriving' },

  alg: { rank:29, style:'Technical and fleet-footed, possession-based creativity',
    strengths:['Riyad Mahrez: world-class even in his last tournament years','Strong European-based core throughout the squad','Technically gifted and quick in transitions'],
    weaknesses:['Post-2019 AFCON generation is aging','Inconsistency in qualifying performances'],
    keyPlayers:[{name:'Riyad Mahrez',pos:'RW/AM',rtg:84,desc:'Man City champion and AFCON winner at 35 — his technical quality, set-piece delivery and big-game experience remain priceless for Algeria'},{name:'Ismaël Bennacer',pos:'CM',rtg:84,desc:'AC Milan\'s combative and technically gifted midfielder who is Algeria\'s engine — press-resistant and provides vital creative outlet'}],
    form:['D','W','W','D','W'], wcHistory:'2014 R16 (vs Germany), 2022 disappointment — targeting 2026 redemption' },

  jor: { rank:47, style:'Organised defensive block, physical battles, occasional counter',
    strengths:['Strong team organisation and discipline','Passionate performances driven by national pride','Improving Asian football record'],
    weaknesses:['Significant quality gap to elite nations','Limited experience in tournament football at this level'],
    keyPlayers:[{name:'Musa Al-Taamari',pos:'FW',rtg:75,desc:'Montpellier winger whose pace and directness makes him Jordan\'s most dangerous attacker and a constant threat on the break'},{name:'Baha Abdel Rahman',pos:'MF',rtg:73,desc:'Jordan\'s midfield organiser who provides the discipline and experience to hold the team\'s shape against superior opposition'}],
    form:['W','D','L','W','D'], wcHistory:'First ever World Cup appearance — magnificent achievement for Jordan' },

  // ═══ GROUP K ═══════════════════════════════════════════════════════════
  por: { rank:6, style:'Technical brilliance, direct attacking, high press',
    strengths:['Bruno Fernandes: world-class creative output','Rafael Leão: unstoppable on his day','Extraordinary attacking depth throughout the squad'],
    weaknesses:['Post-Ronaldo era still finding final balance','Defensive solidity less certain than attacking quality'],
    keyPlayers:[{name:'Bruno Fernandes',pos:'AM/CM',rtg:89,desc:'Man Utd captain and Portugal\'s heartbeat — extraordinary energy, assists, goals and work-rate make him the complete modern attacking midfielder'},{name:'Rafael Leão',pos:'LW',rtg:88,desc:'AC Milan\'s lethal left winger — electric pace, direct dribbling and clinical finishing that can destroy any right-back on the planet'}],
    form:['W','W','W','D','W'], wcHistory:'3rd 1966, SF 2006 — now equipped to go all the way in 2026' },

  col: { rank:16, style:'Technical, fluid attacking, creative in the final third',
    strengths:['Luis Díaz: world-class Liverpool winger','James Rodríguez still providing moments of magic','Young technical players throughout the squad'],
    weaknesses:['Defensive reliability questionable at top level','Can be tactically disrupted by high press'],
    keyPlayers:[{name:'Luis Díaz',pos:'LW',rtg:88,desc:'Liverpool\'s electric Colombian winger — electric dribbling, powerful finishing and non-stop intensity that makes him a nightmare for any right-back'},{name:'James Rodríguez',pos:'AM',rtg:83,desc:'At 34, still the creative inspiration — his vision, long-range shooting and set-piece delivery can change any match in an instant'}],
    form:['W','W','W','D','W'], wcHistory:'QF 2014 with Rodriguez as star — 2026 squad is the deepest ever' },

  uzb: { rank:38, style:'Disciplined defensively, direct counter-attacks, set-piece threat',
    strengths:['Eldor Shomurodov: proven Serie A striker','Growing football culture with European-based players','Strong physical presence throughout the team'],
    weaknesses:['Limited WC experience at senior level','Significant quality gap to top European nations'],
    keyPlayers:[{name:'Eldor Shomurodov',pos:'ST',rtg:80,desc:'Roma striker who has proven himself in Serie A — powerful, intelligent movement and a reliable scorer who can perform on the biggest stage'},{name:'Abbosbek Fayzullayev',pos:'MF',rtg:78,desc:'Young creative midfielder who provides technical quality in Uzbekistan\'s build-up and is the future of Central Asian football'}],
    form:['W','W','D','W','W'], wcHistory:'First World Cup — making Central Asian football history' },

  cod: { rank:46, style:'Athletic and physical, direct play, passionate fighting spirit',
    strengths:['Athleticism throughout the team is exceptional','Cédric Bakambu brings striker quality and experience','Strong potential given enormous talent pool in DR Congo'],
    weaknesses:['Organisational discipline can break down','Limited European top-flight players in key positions'],
    keyPlayers:[{name:'Cédric Bakambu',pos:'ST',rtg:79,desc:'Athletic striker with La Liga experience who leads the line with physicality, technical skill and the ability to create from holding positions'},{name:'Neeskens Kebano',pos:'AM/MF',rtg:77,desc:'Fulham\'s creative midfielder who provides technical quality and direct running in DR Congo\'s attack from the number 10 position'}],
    form:['D','W','D','W','W'], wcHistory:'First WC since 1974 as Zaire — enormous progress for African football' },

  // ═══ GROUP L ═══════════════════════════════════════════════════════════
  eng: { rank:4, style:'High-energy pressing, direct transitions, technical quality',
    strengths:['Jude Bellingham: the best player in Spain','Harry Kane: prolific Bayern Munich striker','Incredible Premier League depth throughout squad'],
    weaknesses:['Tournament knockout mentality historically questionable','Can freeze under pressure in penalty situations'],
    keyPlayers:[{name:'Jude Bellingham',pos:'CM/AM',rtg:93,desc:'Real Madrid\'s 22-year-old superstar — the complete midfielder who scores, assists, defends and leads with a presence beyond his years'},{name:'Harry Kane',pos:'ST',rtg:91,desc:'Bayern Munich\'s record-breaking striker — clinical, intelligent and powerful; one of the greatest goalscorers in Premier League history'}],
    form:['W','W','W','D','W'], wcHistory:'1966 Champions, 2018 SF — strongest squad since the golden generation' },

  cro: { rank:11, style:'Technical midfield dominance, smart pressing, experienced leaders',
    strengths:['Luka Modrić: legendary even at 40','Joško Gvardiol: world-class centre-back at 22','Incredible collective experience from multiple deep WC runs'],
    weaknesses:['Modrić physical durability over long tournament','Aging veterans alongside younger talent still gelling'],
    keyPlayers:[{name:'Luka Modrić',pos:'CM',rtg:88,desc:'Real Madrid legend at 40 — still one of the most intelligent footballers ever; his passing, positioning and leadership defy age'},{name:'Joško Gvardiol',pos:'CB/LB',rtg:88,desc:'Man City\'s exceptional versatile defender at just 22 — reads the game brilliantly, comfortable in possession and already world-class'}],
    form:['D','W','W','D','W'], wcHistory:'1998 Bronze, 2018 Finalists, 2022 Bronze — Croatia consistently overachieve' },

  pan: { rank:37, style:'Defensive compactness, physical battles, counter-attack threat',
    strengths:['Surprising upsets possible against complacent opponents','Strong collective defensive organisation','Team unity and fighting spirit'],
    weaknesses:['Limited technical quality at this level','Struggle to score against well-organised defences'],
    keyPlayers:[{name:'Adalberto Carrasquilla',pos:'CM',rtg:78,desc:'Panama\'s creative midfield lynchpin who has developed in MLS and provides the technical quality needed to unlock defensive structures'},{name:'Ismael Díaz',pos:'FW',rtg:76,desc:'Energetic forward whose pace and pressing causes problems — Panama\'s best weapon going forward in quick transitions'}],
    form:['W','D','W','D','W'], wcHistory:'WC debut 2018, back in 2026 — CONCACAF\'s improving force' },

  gha: { rank:32, style:'Athletic pressing, direct and technical, physical midfield',
    strengths:['Thomas Partey: world-class Premier League midfielder','Mohammed Kudus: exceptional technical quality','Strong physical presence with technical ability'],
    weaknesses:['Defensive organisation has been an issue','Struggled to replicate club form at international level'],
    keyPlayers:[{name:'Thomas Partey',pos:'CM',rtg:85,desc:'Arsenal\'s box-to-box powerhouse — extraordinary physical and technical attributes, dominant in the press and provides range in passing'},{name:'Mohammed Kudus',pos:'AM/FW',rtg:86,desc:'West Ham\'s brilliant attacker — creative, quick, clinical and capable of extraordinary individual moments that have made him a Premier League star'}],
    form:['D','W','W','D','W'], wcHistory:'2010 QF (famous vs USA), 2022 group stage — always entertaining' },
};
