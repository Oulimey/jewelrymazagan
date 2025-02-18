import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const LanguageBar = ({ language, level }) => {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      width: level === 'excellent' ? '95%' : '60%',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: barRef.current
      }
    });
  }, [level]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-white text-sm uppercase">{language}</span>
        <span className="text-gray-400 text-sm uppercase">{level}</span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded">
        <div 
          ref={barRef}
          className="h-full bg-cream-50 rounded"
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const education = [
    {
      school: "Kharkov Institute of Radioelectronics",
      years: "2016-2018",
      description: "2 years of learning coding languages"
    },
    {
      school: "Hubei University of Technology",
      years: "2019-2023",
      description: "Bachelor Degree of Engineering, specialized in Computer Science and Technology"
    }
  ];

  const languages = [
    { name: "English", level: "excellent" },
    { name: "French", level: "excellent" },
    { name: "Arabic", level: "excellent" },
    { name: "Russian", level: "medium" },
    { name: "Chinese", level: "medium" }
  ];

  const experiences = [
    {
      title: "Web Application Developer & Graphics Specialist",
      company: "红莲设计有限公司 (Red Lotus Design Co., Ltd.)",
      year: "2019-2022 Hybrid work",
      desc: "Collaborated with a Chinese development and design company, specializing in web application development and optimization. Worked closely with clients to understand their needs and develop solutions that enhanced functionality and design, while optimizing user experiences based on their specific requirements."
    },
    {
      title: "Web Development & Optimization Specialist",
      company: "Зорава Технології ТОВ (Zorava Technologies TOV.)",
      year: "2016-2019 On-site work",
      desc: "Contributed to the success of a small Ukrainian development firm by optimizing and building websites. Worked closely with the team to improve site performance, user experience, and implement best practices, resulting in faster, more efficient websites for clients."
    },
    {
      title: "Freelance Web Developer, 3D Artist & Graphic Designer",
      company: "Self-Employed",
      year: "2015-Present",
      desc: "Provided freelance services specializing in web development, 3D modeling, and graphic design. Successfully executed various projects, including websites, 3D visualizations, and custom graphic designs, catering to a diverse client base worldwide. Delivered tailored solutions that exceed client expectations and demonstrated versatility in both front-end and back-end development."
    },
    {
      title: "Chief Supervisor & Senior Web Developer",
      company: "Tisfoula",
      year: "2023 Remote work",
      desc: "Led a team in the development and execution of a complex web project, overseeing every stage from concept to deployment. Managed multiple stakeholders and ensured smooth collaboration between departments to deliver high-quality, user-centric solutions."
    }
  ];

  // Split experiences array into two parts
  const midpoint = Math.ceil(experiences.length / 2);
  const experiencesLeft = experiences.slice(0, midpoint);
  const experiencesRight = experiences.slice(midpoint);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-20">
      <AnimatedTitle
        title="<b>E</b>d<b>u</b>c<b>a</b><b>t</b>io<b>n</b> &amp; <b>E</b><b>x</b>perie<b>n</b>c<b>e</b>"
        containerClass="mt-15 pb-10 !text-white text-center"
      />
      
      {/* Large Screens: 2x2 Grid Layout */}
      <div className="hidden lg:block">
        {/* Centered Experience Title */}
        <p className="bento-title-small special-font text-white mb-6 text-center"><b>E</b><b>x</b>perie<b>n</b>ce</p>
        
        {/* Experience Grid - Top Half */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Left Experience Column */}
          <div className="space-y-8">
            {experiencesLeft.map((experience, index) => (
              <div key={index}>
                <p className="font-circular-web text-lg text-cream-50">{experience.title}</p>
                <p className="font-circular-web text-gray-400 mt-1">{experience.company}</p>
                <p className="font-circular-web text-gray-500 mt-1">{experience.year}</p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">{experience.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Right Experience Column */}
          <div className="space-y-8">
            {experiencesRight.map((experience, index) => (
              <div key={index}>
                <p className="font-circular-web text-lg text-cream-50">{experience.title}</p>
                <p className="font-circular-web text-gray-400 mt-1">{experience.company}</p>
                <p className="font-circular-web text-gray-500 mt-1">{experience.year}</p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">{experience.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid - Education and Languages */}
        <div className="grid grid-cols-2 gap-8">
          {/* Education Section */}
          <div className="space-y-8">
            <p className="bento-title-small special-font text-white mb-6"><b>E</b>d<b>u</b>c<b>a</b>ti<b>o</b>n</p>
            {education.map((edu, index) => (
              <div key={index}>
                <p className="font-circular-web text-lg text-cream-50">{edu.school}</p>
                <p className="font-circular-web text-gray-400 mt-1">{edu.years}</p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Languages Section */}
          <div>
            <p className="bento-title-small special-font text-white mb-6">Sp<b>o</b>ke<b>n</b> L<b>a</b>ng<b>u</b>ag<b>e</b>s</p>
            <div className="bg-gray-900/50 p-6 rounded-lg">
              {languages.map((lang, index) => (
                <LanguageBar
                  key={index}
                  language={lang.name}
                  level={lang.level}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Small/Medium Screens: Single Column Layout */}
      <div className="lg:hidden space-y-12">
        {/* Experience Section */}
        <div className="space-y-8">
          <p className="bento-title-small special-font text-white mb-6"><b>E</b><b>x</b>perie<b>n</b>ce</p>
          {experiences.map((experience, index) => (
            <div key={index}>
              <p className="font-circular-web text-lg text-cream-50">{experience.title}</p>
              <p className="font-circular-web text-gray-400 mt-1">{experience.company}</p>
              <p className="font-circular-web text-gray-500 mt-1">{experience.year}</p>
              <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">{experience.desc}</p>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="space-y-8">
          <p className="bento-title-small special-font text-white mb-6"><b>E</b>d<b>u</b>c<b>a</b>ti<b>o</b>n</p>
          {education.map((edu, index) => (
            <div key={index}>
              <p className="font-circular-web text-lg text-cream-50">{edu.school}</p>
              <p className="font-circular-web text-gray-400 mt-1">{edu.years}</p>
              <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">{edu.description}</p>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div>
          <p className="bento-title-small special-font text-white mb-6">Sp<b>o</b>ke<b>n</b> L<b>a</b>ng<b>u</b>ag<b>e</b>s</p>
          <div className="bg-gray-900/50 p-6 rounded-lg">
            {languages.map((lang, index) => (
              <LanguageBar
                key={index}
                language={lang.name}
                level={lang.level}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;