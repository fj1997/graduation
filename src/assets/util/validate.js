import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
Validator.addLocale(zh)

const Veeconfig = {
  locale: 'zh_CN',
  events: 'blur'
}

const dictionary = {
  zh_CN: {
    messages: {
      required: (field) => '请输入' + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      phone: '手机号'
    }
  }
}

Validator.updateDictionary(dictionary)

export {VeeValidate, Veeconfig}
