/* =========================================================
   WHAT IS AMERICA? — interaction, scroll tear, audio sync
   ========================================================= */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const stage = $('#stage'), audio = $('#audio'), enterBtn = $('#enter');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;


const TOPICS = {
  racism: { kicker:`Part I · 1 · Racism, racial profiling & systemic inequality`, title:`Racism, Racial Profiling & Systemic Inequality`,
    cite:`Untouchable, 2017`,
    lyrics:[`That's racism, the fear that a black face gives 'em`,`Why are there black neighborhoods? 'Cause America segregated us`,`Pull ourselves up by our bootstraps, where the fuck are the boots?`],
    s:[
    [`What is the issue?`,[`Systemic racism is not just about individual bigots. It is built into institutions, policies, and history, and its effects pass down through generations.`,`African Americans have faced segregation, discriminatory housing policies, unequal schools, economic exclusion, and far more frequent encounters with the police. Slavery ended and civil rights laws were passed, but the damage did not disappear with them. It still shapes who has access to wealth, education, housing, and justice.`,`Racial profiling and police brutality make the gap especially visible: the Constitution promises equal protection, yet many communities live a very different reality.`]],
    [`Eminem's perspective`,[`lyrics looks at racism from two sides. The first half is told in the voice of a white police officer who stereotypes and dehumanizes Black people, which exposes the kind of bias that can quietly shape policing.`,`Then the song turns. The second half deals with the structures Black Americans live under: segregation, poverty, underfunded schools, profiling, and the lack of police accountability.`,`That shift is the argument. Eminem refuses the idea that inequality is just the sum of individual choices, and ties today's discrimination back to a long history of segregation and institutional racism.`,`The "bootstraps" line hits the American Dream directly. If success is supposed to come from hard work, what happens to people who were never given the resources to work with?`]],
    [`How the song shapes the debate`,[`Untouchable brings themes of systemic racism and police brutality into a mainstream pop song, delivered by a very prominent white artist.`,`Its two contrasting voices push listeners to see that bias works on two levels, in individual attitudes and in institutions. The song also links racial inequality to a bigger question: does the American Dream really offer equal opportunity?`,`Its significance lies primarily in its contribution to public discussion rather than any identifiable legislative outcome.`]],
    [`Why does it matter?`,[`The American Dream says anyone can succeed through hard work and determination.`,`But how can that promise be equal if people don't start with equal access to opportunity?`,`Untouchable puts that contradiction on the table: the country's ideals of freedom and equality on one side, and the structural barriers still shaping people's lives on the other.`]]]},

  censor: { kicker:`Part I · 2 · Censorship, surveillance & freedom of speech`, title:`Censorship, Government Surveillance & Freedom of Speech`,
    cite:`White America (2002) · The Ringer (2018)`,
    lyrics:[`Cause Congress keeps telling me I ain't causin' nothin' but problems`,`Agent Orange just sent the Secret Service to meet in person.`],
    s:[
    [`What is the issue?`,[`The First Amendment protects free speech in America. But provocative art has often drawn political pressure, public outrage, and questions about censorship.`,`After the Columbine shooting in 1999, politicians and public figures began asking whether violent entertainment was to blame. Explicit lyrics became a political target, and a constitutional question followed: where does artistic freedom end, and where does the government's power to regulate speech begin?`,`Government surveillance adds another worry: can you criticize those in power without attracting their attention?`]],
    [`How politics shaped Eminem`,[`In White America, Eminem answers the politicians and public figures who attacked his music. He names Lynne Cheney and Tipper Gore and pushes back against their efforts to condemn or restrict controversial lyrics.`,`His music turned into a battleground over what counts as acceptable expression.`]],
    [`How Eminem's music intersected with politics`,[`Two run-ins with the Secret Service show how artistic expression and national security can collide:`,`- **2003, George W. Bush:** We As Americans contained a lyric about the president's death that officials said could be read as a threat. The Secret Service confirmed it was looking into the matter, then said it had no plans to open a formal investigation.`,`- **2018, Donald Trump:** In The Ringer, Eminem refers to the Secret Service coming to meet him after his criticism of Trump. The Secret Service said it investigates all threats against the president but does not comment on specific cases.`]],
    [`How the songs shape the debate`,[`Eminem's music drags the limits of political expression into public view. His provocative lyrics make audiences ask whether offensive or shocking art should be treated differently from a real threat.`,`The songs also show how pop culture can act as a stage for political criticism, outside the usual political institutions.`]],
    [`The other side`,[`The Secret Service has a duty to take possible threats against the president seriously, and a lyric about a president's death can reasonably deserve a look.`,`Free-speech advocates respond that artistic exaggeration should not automatically bring federal scrutiny. The line between a genuine threat and political expression matters.`]],
    [`Why does it matter?`,[`Free speech means the most when it protects opinions that are unpopular or controversial.`,`At what point does investigating one artist become pressure on everyone who might think about criticizing the government?`]]]},

  war: { kicker:`Part I · 3 · War, interventionism & the human cost of foreign policy`, title:`War, Interventionism & the Human Cost of Foreign Policy`,
    cite:`Square Dance (2002) · Mosh (2004)`,
    lyrics:[`All this terror, America demands action`,`No more blood for oil`],
    s:[
    [`What is the issue?`,[`After September 11, 2001, the War on Terror changed American foreign policy. The United States invaded Afghanistan in 2001 and Iraq in 2003.`,`Critics asked whether national security was being used as cover for geopolitical and economic goals. They also pointed to the human cost of intervention, especially for civilians and for the young soldiers sent to fight.`]],
    [`How politics shaped the songs`,[`Square Dance captures the fear that settled over the country after 9/11. It follows a young person being pulled into military service and shows how quickly an ordinary life can become tied to a war.`,`Mosh came out while the Iraq War was still going and the 2004 presidential election was approaching. It opposed both the war and the leadership behind it.`]],
    [`How Eminem's music shaped political discourse`,[`Mosh was released online in October 2004, just before the presidential election.`,`Its video turns protest into action: it ends with a crowd walking toward the polls.`,`The timing is the interesting part. Eminem didn't just say he opposed the Iraq War. He tried to turn his cultural influence into political participation, right when voters were deciding who would lead the country.`,`The song shows that popular music can work as political mobilization, especially for people who feel shut out of traditional politics.`,`That said, it is hard to prove that the song actually changed how anyone voted. Its significance lies in the deliberate attempt to link artistic expression to democratic participation.`]],
    [`The other side`,[`Supporters of the War on Terror argued that the United States had to respond decisively to the threats it faced after 9/11.`,`They believed military action was necessary to protect national security and to prevent future attacks.`,`Critics questioned how far these interventions went, how they were justified, and what they led to.`]],
    [`Why does it matter?`,[`Patriotism is often equated with backing your government and its military.`,`But can opposing your government's war be a form of patriotism too?`]]]},

  vote: { kicker:`Part I · 4 · Voting, Political Hypocrisy & Democratic Representation.`, title:`Voting, Political Hypocrisy & Democratic Representation.`,
    cite:`White America, 2002`,
    lyrics:[`To spit liquor in the face of this democracy of hypocrisy`],
    s:[
    [`What is the issue?`,[`Democracy promises representation, freedom of expression, and a real say in how you are governed.`,`But political inequality, lobbying, partisan polarization, and limits on political participation make people wonder how representative American democracy really is.`,`Having elections doesn't automatically mean every citizen has the same influence.`]],
    [`Eminem's perspective`,[`In White America, Eminem goes after political hypocrisy, specifically the institutions that condemn his speech while claiming to defend freedom.`,`His point is that those in power may invoke democratic ideals while trying to silence the voices that challenge them.`,`The song lays bare the tension between the promise of political freedom and the power of established institutions to steer public conversation.`]],
    [`How the song shapes the debate`,[`White America starts from Eminem's own experience of being attacked in public and uses it to explore something bigger: how free expression relates to institutional power.`,`It doesn't claim that democracy simply works or simply fails. It asks whether democratic ideals are applied consistently.`]],
    [`The broader question`,[`America's political system is democratic on paper, but political influence isn't always spread evenly.`,`When wealthy donors, powerful interest groups, and established parties hold outsized influence, the public's ability to shape policy gets more complicated.`]],
    [`Why does it matter?`,[`Can a democracy be truly representative if everyone has an equal vote but not equal political influence?`]]]},

  guns: { kicker:`Part I · 5 · Gun violence, the NRA & political interest groups`, title:`Gun Violence, the NRA & Political Interest Groups`,
    cite:`Nowhere Fast, 2018`,
    lyrics:[`This whole country is going nuts / And the NRA is in our way`],
    s:[
    [`What is the issue?`,[`Gun violence is one of the most divisive political issues in America.`,`Supporters of stricter gun laws believe tougher regulation could prevent shootings and save lives. Opponents stress the Second Amendment and the right to bear arms.`,`The National Rifle Association (NRA) is among the most powerful voices in this debate. It uses lobbying, political endorsements, and voter mobilization to influence legislation.`]],
    [`Eminem's perspective`,[`Eminem added a new opening verse to Nowhere Fast about school shootings, including Sandy Hook and Stoneman Douglas.`,`He criticized the NRA's hold over lawmakers directly, and asked why political institutions keep failing to respond to mass shootings.`,`He first performed the revised song at the 2018 iHeartRadio Music Awards, only weeks after the Parkland shooting.`]],
    [`How the song shapes the debate`,[`By attacking the NRA in a high-profile musical performance, Eminem moved the debate over gun violence and lobbying into mainstream entertainment.`,`The song sets public safety, constitutional rights, and organized interest-group power against each other.`,`Its effect on actual legislation is hard to measure, but it shows how popular artists can keep political debates visible.`]],
    [`The other side`,[`Gun-rights advocates argue that the Second Amendment protects individual liberty and that responsible gun ownership is a constitutional right.`,`They also argue that gun violence can't be solved through restrictions on firearms alone.`]],
    [`Why does it matter?`,[`When an organized interest group gets powerful enough to shape legislation, does that make a policy debate more democratic, or less?`]]]}
};

const ICON = {
  epstein:`<svg viewBox="0 0 48 48"><path d="M10 6h20l8 8v28H10z"/><path d="M30 6v8h8"/><path d="M15 22h18M15 29h18M15 36h10" stroke-width="5"/></svg>`,
  democracy:`<svg viewBox="0 0 48 48"><path d="M6 20L24 8l18 12zM10 22v16M19 22v16M29 22v16M38 22v16M6 42h36"/><path d="M4 8l40 34" stroke="#9b1c2e"/></svg>`,
  trump:`<svg viewBox="0 0 48 48"><path d="M8 10h32v22H24l-9 8v-8H8z"/><path d="M24 15v9M24 28v.5"/></svg>`,
  terror:`<svg viewBox="0 0 48 48"><path d="M3 24C10 13 38 13 45 24 38 35 10 35 3 24z"/><circle cx="24" cy="24" r="6"/><circle cx="24" cy="24" r="1.5"/></svg>`,
  communism:`<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="8"/><path d="M24 3v12M24 33v12M3 24h12M33 24h12"/></svg>`,
  dream:`<svg viewBox="0 0 48 48"><path d="M6 24L24 8l18 16M11 21v21h26V21"/><path d="M26 22l-5 8 6 3-4 9" stroke="#9b1c2e"/></svg>`,
  president:`<svg viewBox="0 0 48 48"><path d="M24 5l3.5 8h8.5l-6.8 5 2.6 8.2L24 21.5 16.2 26.2l2.6-8.2L12 13h8.5z"/><path d="M8 42h32M12 42V32h24v10M24 32v10"/></svg>`
};
const CARDS = [
 { id:`epstein`, sub:`Power. Influence. Accountability.`, title:`The Epstein Files`, icon:`epstein`, kicker:`Part II · 1 · Power, privilege & accountability`,
   s:[
   [`What happened?`,[`Jeffrey Epstein, a wealthy financier, sexually exploited and trafficked underage girls.`,`In 2008 he got a lenient non-prosecution agreement in Florida. He was arrested on federal charges in 2019 and died in federal custody before he could stand trial. His associate Ghislaine Maxwell was later convicted of sex-trafficking offenses.`,`The case raised serious questions about how wealth, political influence, and the justice system interact.`]],
   [`The fight over the files`,[`- In November 2025, Congress passed the Epstein Files Transparency Act by a 427–1 House vote and unanimous Senate consent. Trump signed it on November 19.`,`- The Justice Department released the material in waves. On January 30, 2026, it released more than 3 million pages and said it had met its legal obligations.`,`- Critics said the releases were delayed, heavily redacted, and incomplete.`,`- Hundreds of public figures appear in the records. A February 2026 letter to Congress reportedly listed more than 300 officials and politically exposed persons.`]],
   [`What is and isn't established?`,[`Trump's name appears in the released records. Based on the reporting cited in this project, law enforcement has not accused him of any Epstein-related wrongdoing.`,`Appearing in a record doesn't, on its own, show criminal involvement.`,`The bigger issue is still open: do the institutions responsible for investigating powerful people hold everyone to the same standard?`]],
   [`Cultural connection`,[`This topic is not addressed in Eminem's music, and it is included here for a different reason. The Epstein case is a recent, high-profile example of the accountability debate that runs through the rest of this project: who gets scrutinized, and who gets protected by their status?`,`Eminem's The Ringer and White America raise that general question about powerful institutions and the people they answer to. They are not about Epstein, and this card does not suggest that they are. Read it as a contemporary case study that sits alongside the songs, not as a topic the songs cover.`]],
   [`The other side`,[`Releasing investigative records means balancing public transparency against the privacy of victims and the rights of people who haven't been accused of anything.`]],
   [`Why does it matter?`,[`The Epstein case asks whether money and political connections can shield people from scrutiny.`,`If powerful people are tied to a case involving serious crimes, shouldn't the public expect investigations that are open and impartial?`]]]},
 { id:`democracy`, sub:`Representation. Influence. Control.`, title:`Democracy: Representation, Influence & Power`, icon:`democracy`, kicker:`Part II · 2 · Who really holds power?`,
   s:[
   [`The American ideal`,[`America presents itself as a democracy where citizens choose representatives and help steer the government.`,`The Constitution builds in checks and balances so that no single institution becomes too powerful.`]],
   [`The contradiction`,[`In practice, political influence isn't shared equally.`,`- Wealthy donors can get more access to political leaders.`,`- Lobbying lets organized interests shape legislation.`,`- Polarization can make compromise harder.`,`- The dominance of established parties can narrow the range of realistic alternatives.`,`- Voters may be formally equal at the ballot box and still have very unequal influence over actual policy.`]],
   [`Cultural connection`,[`In Mosh, Eminem urges people to take part in politics while criticizing the political establishment.`,`The song reflects a wider cultural argument over whether voting alone is enough to give citizens real political influence.`,`Its video stresses participation, but the song's criticism also invites listeners to question the institutions that decide which choices appear on the ballot.`]],
   [`The other side`,[`Defenders of the system point to elections, constitutional protections, independent courts, and checks and balances as ways to hold power accountable.`,`They also argue that lobbying and political donations can be legitimate forms of civic participation.`,`Critics ask whether those safeguards are enough when access to influence is unequal.`]],
   [`Why does it matter?`,[`If every citizen gets one vote, but some have far more influence over political decisions, how equal is the system in practice?`]]]},
 { id:`trump`, sub:`Promises. Power. Accountability.`, title:`Trump: Political Promises & Accountability`, icon:`trump`, kicker:`Part II · 3 · Promises, power & accountability`,
   s:[
   [`The political image`,[`Donald Trump built his political identity on taking on the establishment, restoring American greatness, and defending law and order.`,`His career has also raised lasting questions about democratic norms and about how consistent his principles are.`]],
   [`The debate`,[`**Elections and democratic legitimacy.** Trump repeatedly rejected the results of the 2020 election. Courts and election officials found no evidence strong enough to overturn the outcome.`,`**Law and order and January 6.** After returning to office in 2025, Trump pardoned or commuted the sentences of roughly 1,500 people charged or convicted in connection with the January 6 attack on the Capitol.`,`**Anti-establishment politics and power.** His movement campaigns against entrenched institutions while also working to take control of them.`]],
   [`Cultural connection`,[`Eminem's The Ringer and his 2017 BET Hip Hop Awards freestyle criticize Donald Trump and his leadership head-on.`,`These performances show how popular music can become a stage for political dissent and public scrutiny.`,`The freestyle's references to Trump's policies and rhetoric also show how an artist can use a major cultural event to deliver a message that goes well beyond entertainment.`]],
   [`The other side`,[`Trump's supporters argue that the establishment really was unaccountable, that the January 6 prosecutions went too far, and that voters chose him knowing where he stood.`,`For them, shaking up established institutions is part of the appeal.`]],
   [`Why does it matter?`,[`Political leaders often demand accountability from their opponents.`,`But should the standard change when the person in power belongs to your own movement?`]]]},
 { id:`terror`, sub:`National security. Surveillance. Civil liberties.`, title:`The War on Terror`, icon:`terror`, kicker:`Part II · 4 · Security at what cost?`,
   s:[
   [`The issue`,[`After the September 11 attacks, the United States expanded its national security powers and launched the War on Terror.`,`The campaign forced a basic question: how do you protect citizens without giving up the freedoms you are protecting?`]],
   [`The contradictions`,[`- **The Patriot Act (2001):** Expanded government surveillance powers and raised concerns about privacy and civil liberties.`,`- **Guantanamo Bay:** Became a symbol of indefinite detention and contested due process.`,`- **The Iraq War (2003):** The invasion went ahead without an established operational link between Iraq and the 9/11 attacks. The stated case rested heavily on weapons of mass destruction, which were never found.`,`- **Mass surveillance:** Expanded intelligence capabilities sparked long-running debates over privacy and government power.`,`- **The scope of intervention:** Critics argued that a war against a tactic, rather than a clearly defined enemy, could be stretched to justify almost any military intervention.`]],
   [`Cultural connection`,[`Eminem's Square Dance and Mosh respond to the mood of the War on Terror and the Iraq War.`,`The songs offer a cultural view of the public debate over national security, military intervention, and the human cost of war.`,`Mosh in particular links opposition to military policy with voting, showing how cultural expression can become a form of political engagement.`]],
   [`The other side`,[`Supporters of expanded security powers argue that governments must respond decisively to threats and that intelligence gathering can stop attacks.`,`Critics argue that emergency powers can become permanent, and that security policies can undermine the very freedoms they claim to protect.`]],
   [`Why does it matter?`,[`How much freedom should a government be allowed to take away in the name of protecting its citizens?`]]]},
 { id:`communism`, sub:`Containment. Intervention. Ideological contradiction.`, title:`Anti-Communism, Intervention & American Power.`, icon:`communism`, kicker:`Part II · 5 · Freedom or ideology?`,
   s:[
   [`The issue`,[`During the Cold War (1947–1991), the United States cast itself as the defender of liberty against communism.`,`Yet American foreign policy often meant stepping into other countries' politics, including Guatemala in 1954 and Chile in 1973. The Vietnam War became one of the most controversial interventions of the era.`,`The Monroe Doctrine, first announced in 1823 as a warning against European meddling in the Americas, was repeatedly stretched into a justification for American influence in the region.`]],
   [`The contradiction`,[`America claimed to defend democracy and freedom, while supporting or taking part in interventions that undermined other nations' sovereignty.`]],
   [`Cultural connection`,[`Eminem doesn't address the Cold War directly, but other cultural works do. Bruce Springsteen's Born in the U.S.A. and Stanley Kubrick's Dr. Strangelove both explore the tension between American patriotism, military power, and national identity.`,`These works show that popular culture can challenge the dominant story of American power, even when it comes from a different era.`]],
   [`The other side`,[`Defenders of Cold War policy argue that the United States faced a real ideological and military rival armed with nuclear weapons.`,`They maintain that containing Soviet influence required hard strategic choices, and that the Cold War ended without a nuclear exchange.`]],
   [`Why does it matter?`,[`Can a country defend freedom abroad while limiting the political freedom of other nations?`]]]},
 { id:`dream`, sub:`Equal opportunity. Unequal starting points.`, title:`The American Dream & Systemic Inequality`, icon:`dream`, kicker:`Part II · 6 · The promise vs. the evidence`,
   s:[
   [`The American ideal`,[`The American Dream says success is open to anyone willing to work for it, whatever their background.`,`But a history of discrimination and unequal access to education, housing, and wealth has shaped the opportunities different communities actually get.`]],
   [`The evidence: education`,[`- Brown v. Board of Education (1954) ended legal school segregation, but residential patterns have left many schools racially isolated.`,`- According to KIDS COUNT (2022), 84% of Black fourth graders and 80% of Hispanic fourth graders were below proficient in reading, compared with 59% of white fourth graders.`,`- In 2017–18, 12% of Black students received out-of-school suspensions, compared with 4% of white students.`,`- High school graduation rates in 2021–22: Asian/Pacific Islander 94%; White 90%; Hispanic 83%; Black 81%; American Indian/Alaska Native 74%.`]],
   [`Housing, wealth & historical roots`,[`Redlining and discriminatory lending determined who could buy homes and build wealth that could be passed down across generations.`,`Jim Crow laws and Plessy v. Ferguson (1896) made segregation official. The Civil Rights Act (1964) and Voting Rights Act (1965) dismantled much of that legal framework, but they didn't erase every inequality it created.`]],
   [`Cultural connection`,[`Eminem's Untouchable directly challenges the belief that hard work guarantees success.`,`Its critique of segregation and unequal opportunity ties into the wider American debate over whether the Dream is equally within reach for everyone.`,`The "bootstraps" line asks whether individual effort can overcome structural barriers when access to resources is unequal.`]],
   [`The other side`,[`Some argue that individual choices, family structure, and local policy explain much of the inequality.`,`Others argue that opportunity programs should be universal rather than race-conscious.`]],
   [`Why does it matter?`,[`The American Dream rests on the belief that hard work leads to success.`,`But is the Dream equally available to everyone, or is it easier for those born closer to it?`]]]},
 { id:`president`, sub:`Executive authority. Checks and balances. Accountability.`, title:`How Powerful Is the President?`, icon:`president`, kicker:`Part II · 7 · On paper vs. in practice`,
   s:[
   [`On paper`,[`The United States Constitution splits government power among three branches:`,`- **Congress:** Makes laws.`,`- **The President:** Enforces laws.`,`- **The Judiciary:** Interprets laws.`,`The president can veto legislation, but Congress can override a veto with a two-thirds vote in both chambers. The Senate must confirm Supreme Court nominees.`,`These mechanisms are meant to stop any one branch from becoming too powerful.`]],
   [`In practice`,[`Those checks can be weakened by party loyalty and institutional limits.`,`- **Impeachment and party loyalty:** The House impeached Trump, but the Senate acquitted him. Impeachment loses force as a check when political allegiance outweighs institutional accountability.`,`- **Investigators and executive authority:** The president appoints the heads of federal agencies. When the post-Watergate independent counsel law expired under Clinton, it raised further questions about oversight of the executive.`,`- **A sitting president and criminal prosecution:** Department of Justice policy generally bars the federal indictment of a sitting president.`,`- **War powers:** Only Congress has the constitutional power to declare war, yet presidents have repeatedly launched military actions without a formal declaration.`]],
   [`Cultural connection`,[`Eminem's Mosh and The Ringer show how artists can challenge presidential leadership in public.`,`Their messages also raise the question of what role cultural figures play in holding political power accountable.`,`Eminem's performances show that artists can wield influence outside formal political institutions, using music and public platforms to question the people in charge.`]],
   [`The other side`,[`Supporters of strong presidential authority argue that the executive needs flexibility to respond to emergencies, foreign threats, and complex policy problems.`,`Defenders of checks and balances reply that this flexibility must stay subject to congressional oversight, judicial review, and constitutional limits.`]],
   [`Why does it matter?`,[`The Constitution was designed to prevent power from concentrating in one place.`,`But if institutions grow too dependent on the president, or too divided to restrain him, can checks and balances still work?`]]]}
];

/* ---------- Modal ---------- */
const bd = $('#backdrop'), modal = $('#modal'), closeBtn = $('#close');
let lastFocus = null, tClose = 0;
const esc = (s) => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

function openModal(d, trigger) {
  clearTimeout(tClose);
  lastFocus = trigger; // only one pop-up: content is simply replaced
  $('#m-kicker').textContent = d.kicker;
  $('#m-title').textContent = d.title;
  let h = '';
  if (d.lyrics) {
    h += '<section class="sec"><h4>In his words </h4></section>' + d.lyrics.map((l, i) => `<blockquote class="lyric">${esc(l)}${i === d.lyrics.length - 1 ? '<small>' + esc(d.cite) + '</small>' : ''}</blockquote>`).join('');
  }
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h += d.s.map(([t, body]) => {
    let out = '', list = false;
    (typeof body === 'string' ? [body] : body).forEach(p => {
      const li = p.startsWith('- ');
      if (li && !list) { out += '<ul>'; list = true; }
      if (!li && list) { out += '</ul>'; list = false; }
      out += li ? `<li>${fmt(p.slice(2))}</li>` : `<p>${fmt(p)}</p>`;
    });
    return `<section class="sec"><h4>${esc(t)}</h4>${out + (list ? '</ul>' : '')}</section>`;
  }).join('');
  $('#m-body').innerHTML = h;
  bd.hidden = false;
  document.body.classList.add('locked');
  modal.scrollTop = 0;
  requestAnimationFrame(() => { bd.classList.add('open'); closeBtn.focus({ preventScroll: true }); });
}
function closeModal() {
  bd.classList.remove('open');
  tClose = setTimeout(() => {
    bd.hidden = true;
    if (stage.classList.contains('entered')) document.body.classList.remove('locked');
    lastFocus && lastFocus.focus({ preventScroll: true });
  }, reduce ? 0 : 300);
}
closeBtn.addEventListener('click', closeModal);
bd.addEventListener('click', e => { if (e.target === bd) closeModal(); });
document.addEventListener('keydown', e => {
  if (bd.hidden) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); } // focus trap: close button is the only control
});

/* Wire Eminem hotspots and build cards */
document.querySelectorAll('.hot').forEach(b => b.addEventListener('click', () => openModal(TOPICS[b.dataset.topic], b)));
const grid = $('#grid');
grid.innerHTML = CARDS.map(c =>
  `<button class="card" data-id="${c.id}">${ICON[c.icon]}<h3>${c.title}</h3><p>${c.sub}</p></button>`).join('');
grid.addEventListener('click', e => {
  const b = e.target.closest('.card'); if (!b) return;
  openModal(CARDS.find(c => c.id === b.dataset.id), b);
});

/* ---------- Jagged tear: shared irregular seams between quadrants ----------
   One jagged vertical seam and one jagged horizontal seam are generated;
   each quadrant's clip-path follows them so edges match before the tear. */
(function buildTear() {
  let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const N = 20, V = [], H = [];
  for (let i = 0; i <= N; i++) { const e = i === 0 || i === N;
    V.push(e ? 0 : (rnd() - .5) * 7); H.push(e ? 0 : (rnd() - .5) * 7); }
  V[N / 2] = H[N / 2] = 0;
  const vx = i => 50 + V[i], vy = i => i * 100 / N, hx = i => i * 100 / N, hy = i => 50 + H[i];
  const P = a => `polygon(${a.map(p => p[0].toFixed(1) + '% ' + p[1].toFixed(1) + '%').join(',')})`;
  const vTop = [], vBot = [], hL = [], hR = [];
  for (let i = 0; i <= N / 2; i++) { vTop.push([vx(i), vy(i)]); hL.push([hx(i), hy(i)]); }
  for (let i = N / 2; i <= N; i++) { vBot.push([vx(i), vy(i)]); hR.push([hx(i), hy(i)]); }
  const q = n => $('.q' + n);
  q(1).style.clipPath = P([[0, 0], ...vTop, ...hL.slice().reverse()]);
  q(2).style.clipPath = P([[100, 0], ...vTop, ...hR]);
  q(3).style.clipPath = P([[0, 100], ...vBot.slice().reverse(), ...hL]);
  q(4).style.clipPath = P([[100, 100], ...vBot.slice().reverse(), ...hR.slice().reverse()]);
  // fix winding: quadrant 3/4 seams are traversed so each polygon is simple
  q(3).style.clipPath = P([[0, 50 + H[0]], ...hL, ...vBot, [0, 100]]);
  q(4).style.clipPath = P([[50 + V[N / 2], 50], ...hR, [100, 100], ...vBot.slice().reverse()]);
  q(2).style.clipPath = P([[...vTop[0]], ...vTop, ...hR, [100, 0]]);
  q(1).style.clipPath = P([[0, 0], ...vTop, ...hL.slice().reverse()]);
})();

/* ---------- Collage image loading ----------
   Each quadrant tries american_dream_N.png first, then other extensions, then the
   original upload filename. A visible "MISSING IMAGE" label shows if none load. */
const DREAM_SRC = {
  1:['american_dream_1.png','american_dream_1.jpg','american_dream_1.jpeg','american_dream_1.webp','7f87f6b7f7600ec04f1b7f27fcb20e67.jpg'],
  2:['american_dream_2.png','american_dream_2.jpg','american_dream_2.jpeg','american_dream_2.webp','sddefault.jpg'],
  3:['american_dream_3.png','american_dream_3.jpg','american_dream_3.jpeg','american_dream_3.webp','1_J_IpRk-5MR9-3MlOU3Mq7A.jpg'],
  4:['american_dream_4.png','american_dream_4.jpg','american_dream_4.jpeg','american_dream_4.webp','car-50swscan00715.jpg']
};
document.querySelectorAll('.quad img').forEach(img => {
  const list = DREAM_SRC[img.dataset.n]; let i = 0;
  const next = () => {
    if (++i < list.length) { img.classList.toggle('letterboxed', list[i] === 'sddefault.jpg'); img.src = list[i]; }
    else { img.hidden = true; img.parentElement.classList.add('missing'); img.parentElement.dataset.missing = list[0];
           console.warn('[collage] No image found for quadrant ' + img.dataset.n + '. Tried: ' + list.join(', ')); }
  };
  img.addEventListener('error', next);
  if (img.complete && img.naturalWidth === 0) next(); // error fired before this script ran
});

/* ---------- Enter / audio ---------- */
let entered = false;
function enter() {
  if (entered) return; entered = true;
  stage.classList.add('entered');
  enterBtn.classList.add('gone');
  setTimeout(() => enterBtn.hidden = true, 1300);
  document.body.classList.remove('locked');
  const play = audio.play();       // user gesture = allowed to start audio
  $('#snd').hidden = false;
  if (play && play.catch) play.catch(() => { $('#audioErr').hidden = false; setTimeout(() => $('#audioErr').hidden = true, 6000); });
  $('#snd').textContent = 'SOUND ON';
}
enterBtn.addEventListener('click', enter);
audio.addEventListener('error', () => { $('#audioErr').hidden = false; });
$('#snd').addEventListener('click', e => {
  audio.muted = !audio.muted;
  e.currentTarget.textContent = audio.muted ? 'SOUND OFF' : 'SOUND ON';
  e.currentTarget.setAttribute('aria-pressed', audio.muted);
});
// Scrolling never touches audio: it plays once and is never restarted.

/* ---------- Cinematic auto-scroll at ~26s (once) ----------
   Triggered from audio.currentTime inside the frame loop, never a timer. Skipped if
   the viewer has already reached the Eminem reveal; cancelled the moment they
   scroll themselves. The audio is never touched. */
const AUTO_AT = 26, AUTO_MS = 3800;
let autoDone = false, autoAnim = 0, lastInput = 0;
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
const revealY = () => $('#tear').offsetTop + innerHeight * 0.95; // scrollY where the tear is complete (p = 1)
const cancelAuto = () => { if (autoAnim) { cancelAnimationFrame(autoAnim); autoAnim = 0; } };
['wheel', 'touchstart', 'pointerdown'].forEach(ev => addEventListener(ev, () => { lastInput = performance.now(); cancelAuto(); }, { passive: true }));
addEventListener('keydown', e => {
  if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' ','Spacebar'].includes(e.key)) { lastInput = performance.now(); cancelAuto(); }
});
function autoScrollToReveal() {
  autoDone = true;                                   // only ever once per experience
  const target = revealY(), from = scrollY;
  if (from >= target - 8) return;                    // user is already at/past Eminem: do nothing
  if (performance.now() - lastInput < 500) return;   // user is actively scrolling: don't interrupt
  if (reduce) { scrollTo(0, target); return; }
  const t0 = performance.now();
  const step = now => {
    const k = Math.min(1, (now - t0) / AUTO_MS);
    scrollTo(0, from + (target - from) * ease(k));
    autoAnim = k < 1 ? requestAnimationFrame(step) : 0;
  };
  autoAnim = requestAnimationFrame(step);
}

/* ---------- Scroll-driven tear + audio-time effects (one rAF loop) ---------- */
let lastP = -1, lastG = '0', ticking = false;
function frame() {
  ticking = false;
  const rect = $('#tear').getBoundingClientRect();
  const p = Math.max(0, Math.min(1, -rect.top / (innerHeight * 0.95)));
  if (p !== lastP) {
    stage.style.setProperty('--p', p.toFixed(4));
    stage.classList.toggle('ready', p > .75);
    stage.classList.toggle('scrolled', p > .02);
    lastP = p;
  }
  // Interference keyed to audio.currentTime (not timers)
  let g = '0';
  if (entered && !audio.error) { const t = audio.currentTime; g = t >= 26 ? '2' : t >= 25 ? '1' : '0'; }
  if (reduce && g === '2') g = '1';
  if (g !== lastG) { stage.dataset.g = g; lastG = g; }
  if (!autoDone && entered && !audio.paused && audio.currentTime >= AUTO_AT) autoScrollToReveal();
  if (entered && !audio.paused && !audio.ended) requestAnimationFrame(frame); // keep checking audio time while playing
}
const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
addEventListener('scroll', req, { passive: true });
addEventListener('resize', req);
audio.addEventListener('play', req);
audio.addEventListener('timeupdate', req); // backup trigger if rAF is throttled (e.g. background tab)
audio.addEventListener('seeked', req);
audio.addEventListener('ended', () => { stage.dataset.g = lastG = '0'; });
req();
})();
