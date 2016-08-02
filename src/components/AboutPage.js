import React from 'react';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div className="box infobox">
      <h2 className="alt-header">About</h2>
      <p>
        This is based on the <a href="https://github.com/coryhouse/react-slingshot">React-Slingshot starter kit</a>.
      </p>
      <p>
        The server is adapted from the <a href="https://facebook.github.io/react/docs/tutorial.html"> React tutorial </a>. It is very hacky, and there are a lot of things that can be made better!
      </p>
      <p>
        Source is available on <a href="http://github.com/anujkhare"> Github </a>.
      </p>
      <p>
        All the user session information is maintained on the server, so you can close and resume with the same token if the session is still active.
      </p>
    </div>
  );
};

export default AboutPage;
