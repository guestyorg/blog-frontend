const initNewRelic = () => {
  try {
    const { newrelic } = window;
    const ajsUserTraits = localStorage.getItem('ajs_user_traits');
    const { accountId, accountName, name, accountCategorization } =
      JSON.parse(ajsUserTraits);

    newrelic.setCustomAttribute('Account', accountId);
    newrelic.setCustomAttribute('Username', name);
    newrelic.setCustomAttribute('AccountName', accountName);
    newrelic.setCustomAttribute('AccountCategory', accountCategorization);
  } catch (e) {
    // Silently ignore
  }
};

const postAppLoadAck = () => {
  try {
    window.parent.postMessage(
      {
        action: 'APP_LOAD_ACK',
        payload: { src: window.location.pathname },
      },
      '*'
    );
  } catch (e) {
    console.log('failed to notify parent the app was loaded', e);
  }
};

const bootstrap = () => {
  postAppLoadAck();
  initNewRelic();
};
export default bootstrap;
