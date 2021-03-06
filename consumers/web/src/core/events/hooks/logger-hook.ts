
//@ts-nocheck
const logger = (action, event, params) => {
  // eslint-disable-next-line no-console
  console.group(action);
  // eslint-disable-next-line no-console
  console.info(action, {
    event,
    params,
  });
  // eslint-disable-next-line no-console
  console.groupEnd();
};

export default logger;
