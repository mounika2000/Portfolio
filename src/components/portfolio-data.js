// src/data/portfolio-data.js

const portfolioData = {
  hiring: {
    response: `Here's why you should consider hiring Sai Mounika:

• Strong academic background with a 3.87 GPA in MS Computer Science from San Jose State University
• Valuable industry experience at top tech companies including Tesla, Adobe Systems, RSA Securities, and Dell
• Extensive technical skill set covering full-stack development, cloud services, and machine learning
• Proven track record of improving system performance and user engagement
• Winner of Stanford TreeHacks 2024 and LAHacks (AI track)
• Strong problem-solving skills demonstrated through complex project implementations`
  },
  experience: {
    response: `Sai Mounika's professional experience includes:

🚗 TESLA (Software Development Engineer Intern)
• Developed features for Tesla's web platforms using JavaScript, TypeScript, PHP, ReactJS
• Implemented "Drive Now" feature for Tesla's retail app
• Enhanced data processing accuracy by 28% using Splunk and Google Analytics

🎨 ADOBE SYSTEMS (Software Development Engineer 2)
• Led Convert Megaverb Panel UI implementation using ReactJS, JavaScript, TypeScript, Node, and C++
• Increased customer engagement by 35%
• Resolved 180+ software issues and implemented robust CI/CD pipeline

Previous experience includes internships at:
• RSA SECURITIES - Configured SAML SSO for 30+ service provider applications
• DELL TECHNOLOGIES - Analyzed 2M+ payment transactions and improved customer satisfaction by 20%`
  },
  projects: {
    response: `Here are some of Sai's notable projects:

🐾 PAWSOME - Interactive Pet Wellness Web App
• AI-powered platform for pet health and fitness
• Winner of Stanford's TreeHacks AI Track
• Technologies: React, Flask, TypeScript, Python, Fetch.ai

📊 ADVANCED RECOMMENDATION ENGINE
• E-commerce recommendation system using collaborative filtering
• Improved prediction accuracy by 25%
• Technologies: Python, Scikit, MySQL, Hadoop, Flask

🏪 LOCAL MARKETPLACE
• Responsive local tourism website
• Attracted 300+ monthly visitors
• Technologies: JavaScript, React, Node.js, Firebase`
  },
  skills: {
    response: `Sai Mounika's technical expertise includes:

💻 Tech Stack
• Frontend: JavaScript, TypeScript, React, React Native, HTML, CSS
• Backend: C/C++, Java, Python, Node.js, PHP, Flask
• Databases: SQL, MySQL, MongoDB, Firebase, AWS

🤖 Data Science & ML
• Frameworks: Scikit-learn, TensorFlow, PyTorch, PySpark
• Libraries: Numpy, Ray RLlib, Transformers, NLTK, Pandas, Matplotlib

🛠 Tools & Others
• DevOps: Git, GitHub, Jenkins, Docker, CI/CD
• Analytics: Splunk, Power BI, Postman
• Cloud: AWS, Firebase`
  }
};

// Helper function to get responses
const getResponse = (question) => {
  const predefinedResponses = {
    'Why should I hire Sai Mounika?': portfolioData.hiring.response,
    'Tell me about Sai Mounika\'s work experience': portfolioData.experience.response,
    'Show me Sai Mounika\'s projects': portfolioData.projects.response,
    'What are Sai Mounika\'s skills?': portfolioData.skills.response
  };

  return predefinedResponses[question] || "I'm not sure about that. Could you please ask something else?";
};

export { portfolioData, getResponse };