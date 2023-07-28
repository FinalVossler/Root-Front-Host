import React, { Suspense } from "react";

import useDynamicScript from "./useDynamicScript";

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    if (container) {
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(module);
      const Module = factory();
      return Module;
    }
  };
}

const ModuleLoader = ({ scope, module, url, ...rest }) => {
  const { ready, failed } = useDynamicScript({
    url: module && url,
  });

  if (!module) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  if (window[scope]) {
    const Component = React.lazy(loadComponent(scope, module));

    return (
      <Suspense fallback="Loading Module">
        <Component {...rest} />
      </Suspense>
    );
  } else {
    return <div>Error loading Micro-Frontend</div>;
  }
};

export default ModuleLoader;
