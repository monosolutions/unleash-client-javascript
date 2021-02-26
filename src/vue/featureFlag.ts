import { Unleash } from '../unleash';
import { Context } from '../context';

const unleash = new Unleash({
  appName: 'async-unleash',
  instanceId: 'browsers',
  refreshInterval: 2400000,
  url: '/api/feature',
});
unleash.on('error', console.error);

unleash.on('ready', () => {
  console.log('Features are ready');
});

export default (context: Context) => ({
  install(Vue: any) {
    /* istanbul ignore next */
    Vue.directive('featureFlag', (el: Element, binding: { value: string; arg: any }) => {
      const flag = binding.value;
      const hideClass = binding.arg === 'visibility' ? 'userlimitHiddenV' : 'userlimitHidden';
      if (unleash.isEnabled(flag, context)) {
        el.classList.remove(hideClass);
      } else {
        el.classList.add(hideClass);
      }
    });
  },
});
