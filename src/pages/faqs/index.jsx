// import React, { useState } from "react";
// import './index.css'
// import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "reactstrap";

// import about from "./../../assets/about.png";
// const Faqs = () => {

// const [selected , setSelected ]  = useState("coach")
//  const [accord, setAccordian] = useState("0");
//  const toggleAccordion = (id) => {
//    if (accord === id) {
//      setAccordian();
//    } else {
//      setAccordian(id);
//    }
//  };

//   return (
//     <>
//       <Container>
//         <Row>
//           <Col md={12}>
//             <h3 className="about-heading">FAQ's</h3>
//           </Col>
//           {/* <Col md={12}>
//             <div className="Faq_roles">
//               <div
//                 onClick={() => setSelected("coach")}
//                 className={`role-button glass ${
//                   selected == "coach" && "solid"
//                 } `}
//               >
//                 <label>Coach</label>
//               </div>
//               <div
//                 onClick={() => setSelected("parent")}
//                 className={`role-button glass ${
//                   selected == "parent" && "solid"
//                 } `}
//               >
//                 <label>Parent</label>
//               </div>
//               <div
//                 onClick={() => setSelected("athlete")}
//                 className={`role-button glass ${
//                   selected == "athlete" && "solid"
//                 } `}
//               >
//                 <label>Athlete</label>
//               </div>

//               <div
//                 onClick={() => setSelected("recruter")}
//                 className={`role-button glass ${
//                   selected == "recruter" && "solid"
//                 } `}
//               >
//                 <label>Recruiter</label>
//               </div>

//               <div
//                 onClick={() => setSelected("qr-code")}
//                 className={`role-button glass ${
//                   selected == "qr-code" && "solid"
//                 } `}
//               >
//                 <label>QR Code</label>
//               </div>
//             </div>

//             <hr className="mt-4" style={{ color: "#fff" }} />
//           </Col> */}
//         </Row>
//         <Row>
//           <Accordion className="py-2" open={accord} toggle={toggleAccordion}>
//             <>
//               <AccordionItem className="py-2">
//                 <AccordionHeader targetId={"0"}>
//                   What does the QR code do for me?
//                 </AccordionHeader>

//                 <AccordionBody accordionId={"0"}>
//                   <p className="" style={{ color: "#fff", fontSize: "15px" }}>
//                     Your QR code links directly to your player profile. When
//                     someone scans it—whether it’s a coach, recruiter, parent, or
//                     fan—they can instantly see your player info, achievements,
//                     and more. It’s a fast and easy way to promote yourself.
//                   </p>
//                 </AccordionBody>
//               </AccordionItem>

//               <AccordionItem className="py-2">
//                 <AccordionHeader targetId={"1"}>
//                   {" "}
//                   What can I do with my QR code?
//                 </AccordionHeader>

//                 <AccordionBody accordionId={"1"}>
//                   <p className="" style={{ color: "#fff", fontSize: "15px" }}>
//                     {" "}
//                     You’ve got options! Download & Share – Use your QR code on
//                     player cards or share it with family and friends so they can
//                     check out your profile anytime. Wear It – Order QR patches
//                     to sew on your jersey, warm-ups, bag—or even get it printed
//                     on clothes! Wherever it goes, it helps promote YOU and your
//                     sport. SPORTIFY is interactive - friends can follow each
//                     other, show support with emoticons and send messages.
//                   </p>
//                   <p className="" style={{ color: "#fff", fontSize: "15px" }}>
//                     You decide how much info to include—from simple basics to
//                     detailed stats and goals. It’s a great tool for athletes who
//                     want to get noticed, especially by recruiters.
//                   </p>
//                 </AccordionBody>
//               </AccordionItem>

//               <AccordionItem className="py-2">
//                 <AccordionHeader targetId={"3"}>
//                   {" "}
//                   Can I make updates to my profile?
//                 </AccordionHeader>

//                 <AccordionBody accordionId={"3"}>
//                   <p className="" style={{ color: "#fff", fontSize: "15px" }}>
//                     {" "}
//                     Absolutely! Your profile is designed to grow with you. Start
//                     simple when you’re young, then add more info as you get
//                     older—like stats, awards, teams, and college goals.
//                   </p>
//                 </AccordionBody>
//               </AccordionItem>

//               <AccordionItem className="py-2">
//                 <AccordionHeader targetId={"4"}>
//                   {" "}
//                   Will my QR code change if I update my profile?
//                 </AccordionHeader>

//                 <AccordionBody accordionId={"4"}>
//                   <p className="" style={{ color: "#fff", fontSize: "15px" }}>
//                     {" "}
//                     Nope! Your QR code stays the same as long as you’re using
//                     the same profile. But: If you upgrade from a basic profile
//                     to an advanced profile, a new QR code will be created for
//                     the advanced version, since each version has its own unique
//                     page.
//                   </p>
//                 </AccordionBody>
//               </AccordionItem>
//             </>
//           </Accordion>
//           <></>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Faqs;


import React, { useEffect, useState } from "react";
import './index.css'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "reactstrap";

import about from "./../../assets/about.png";
const Faqs = () => {


  const [selected, setSelected] = useState("coach")
  const [accord, setAccordian] = useState("0");
  const toggleAccordion = (id) => {
    if (accord === id) {
      setAccordian();
    } else {
      setAccordian(id);
    }
  };

  const [data, setData] = useState([])


  const Coach = [{
    header: "What does the QR code do for me?", body: `Your QR code links directly to your player profile. When
                    someone scans it—whether it's a coach, recruiter, parent, or
                    fan—they can instantly see your player info, achievements,
                    and more. It's a fast and easy way to promote yourself.`},
  {
    header: " What can I do with my QR code?", body: `You've got options! Download & Share – Use your QR code on
                    player cards or share it with family and friends so they can
                    check out your profile anytime. Wear It – Order QR patches
                    to sew on your jersey, warm-ups, bag—or even get it printed
                    on clothes! Wherever it goes, it helps promote YOU and your
                    sport. SPORTIFY is interactive - friends can follow each
                    other, show support with emoticons and send messages.`},
  {
    header: "Can I make updates to my profile?", body: `Absolutely! Your profile is designed to grow with you. Start
                    simple when you're young, then add more info as you get
                    older—like stats, awards, teams, and college goals.`},
  {
    header: "Will my QR code change if I update my profile?", body: `Nope! Your QR code stays the same as long as you're using
                    the same profile. But: If you upgrade from a basic profile
                    to an advanced profile, a new QR code will be created for
                    the advanced version, since each version has its own unique
                    page.`}
  ]

  const Parent = [
    {
      header: "How does the QR code help my child?",
      body: `The QR code gives instant access to your child's player profile. It's a great way for coaches, scouts, and family to stay updated on their progress and achievements—all in one place.`
    },
    {
      header: "Can I share my child's profile?",
      body: `Yes! You can download the QR code and share it with relatives, team supporters, or on social media. It's a great way to show off their hard work and passion for the game.`
    },
    {
      header: "Can I help manage my child's profile?",
      body: `Definitely. Younger athletes often need a hand. You can assist in updating stats, adding new achievements, and keeping their profile current and impressive.`
    },
    {
      header: "Is it safe to have my child's info online?",
      body: `Safety is a priority. Profiles have privacy settings to control who can see what. You decide how public or private your child's information is.`
    }
  ];

  const Athlete = [
    {
      header: "Why should I use a QR code?",
      body: `It's your digital spotlight. Share your achievements, highlight reels, and goals with anyone—instantly. Your QR code makes it easy to get noticed.`
    },
    {
      header: "Where can I show off my QR code?",
      body: `Anywhere! Put it on your jersey, gear, backpack, or social profiles. The more it's seen, the more chances you have to stand out.`
    },
    {
      header: "How do I grow my profile?",
      body: `Keep it updated! Add new stats, awards, and videos. Your profile grows with you, showing your journey and progress over time.`
    },
    {
      header: "Can I connect with teammates?",
      body: `Yes! SPORTIFY lets you follow teammates, send messages, and support each other with reactions. It's more than a profile—it's a community.`
    }
  ];

  const Recruiter = [
    {
      header: "How does the QR code help me find talent?",
      body: `One scan gives you access to a full athlete profile—stats, achievements, videos, and more. It's a fast, paperless way to scout talent.`
    },
    {
      header: "Can I track multiple athletes?",
      body: `Yes. Follow athletes directly in the platform to stay updated. You'll get a clear picture of their development over time.`
    },
    {
      header: "Is the info on profiles reliable?",
      body: `Profiles are updated by athletes and verified by coaches or parents when needed. You'll get current, relevant info to help with your decisions.`
    },
    {
      header: "How can I contact an athlete?",
      body: `Depending on privacy settings, you may be able to message athletes directly through the platform or connect with their parent or coach.`
    }
  ];

  const QRCode = [
    {
      header: "What is a SPORTIFY QR code?",
      body: `It's a unique, scannable code that links to your profile. Share it anywhere and let people instantly view your sports journey.`
    },
    {
      header: "How do I use it?",
      body: `Download and print it, share it digitally, or order it as a patch. Put it on jerseys, bags, flyers—wherever you want to get noticed.`
    },
    {
      header: "Will it ever expire?",
      body: `No. As long as your profile is active, your QR code works. If you upgrade your profile tier, you'll receive a new code for the upgraded version.`
    },
    {
      header: "Can I track scans or views?",
      body: `In advanced plans, yes. You can see when and how often your code is scanned—giving you insight into who's checking out your profile.`
    }
  ];
  

  const [selectiontags, setselectiontags] = useState({
    recruiter: false,
    player: false,
    coach: true,
    parent: false,
    qr: false
  })

  const selectCoach = () => {
    setselectiontags({
      recruiter: false,
      player: false,
      coach: true,
      parent: false,
      qr: false

    })
  }

  const selectParent = () => {
    setselectiontags({
      recruiter: false,
      player: false,
      coach: false,
      parent: true,
      qr: false

    })
  }

  const selectAthelete = () => {
    setselectiontags({
      recruiter: false,
      player: true,
      coach: false,
      parent: false,
      qr: false
    })
  }

  const selectRecruiter = () => {
    setselectiontags({
      recruiter: true,
      player: false,
      coach: false,
      parent: false,
      qr: false
    })
  }

  const selectQr = () => {
    setselectiontags({
      recruiter: false,
      player: false,
      coach: false,
      parent: false,
      qr: true
    })
  }

 

  // inside component
  useEffect(() => {
    if (selectiontags.coach) setData(Coach);
    else if (selectiontags.player) setData(Athlete);
    else if (selectiontags.parent) setData(Parent);
    else if (selectiontags.recruiter) setData(Recruiter);
    else setData(QRCode);
  }, [selectiontags]);
  


  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="about-heading">FAQ's</h3>
          </Col>

          <Col md={12}>
            <div className="selecttagz">
              <div className={`tagz ${selectiontags.coach ? 'active-tag' : ''}`} onClick={selectCoach}>Coach</div>
              <div className={`tagz ${selectiontags.parent ? 'active-tag' : ''}`} onClick={selectParent}>Parent</div>
              <div className={`tagz ${selectiontags.player ? 'active-tag' : ''}`} onClick={selectAthelete}>Athelete</div>
              <div className={`tagz ${selectiontags.recruiter ? 'active-tag' : ''}`} onClick={selectRecruiter}>Recruiter</div>
              <div className={`tagz ${selectiontags.qr ? 'active-tag' : ''}`} onClick={selectQr}>QR Code</div>

            </div>
          </Col>
          
        </Row>
        <Row>
          <Accordion className="py-2" open={accord} toggle={toggleAccordion}>
            <>
            {(selectiontags.coach || selectiontags.parent || selectiontags.player || selectiontags.recruiter || selectiontags.qr) && data.map((item, index)=>(
              <AccordionItem className="py-2">
              <AccordionHeader targetId={index.toString()} className="acc-items">
                {item.header}
              </AccordionHeader>
              <AccordionBody accordionId={index.toString()} >
                <p className="acc-items">
                  {item.body}
                  
                </p>
              </AccordionBody>
            </AccordionItem>
            ))}
              

             
            </>
          </Accordion>
          <></>
        </Row>
      </Container>
    </>
  );
};

export default Faqs;