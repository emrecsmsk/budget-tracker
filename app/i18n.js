import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
    en: {
        translation: {
            signUp: "Sign Up",
            userName: "Username",
            email: "Email",
            password: "Password",
            rewritePassword: "Rewrite Password",
            confirm: "Confirm",
            welcome: "Welcome!",
            login: "Login",
            newUser: "New User?",
            balance: "Balance",
            income: "Income",
            outcome: "Outcome",
            date: "Date",
            money: "Money",
            type: "Type",
            edit: "Edit",
            startDate: "Start Date",
            endDate: "End Date",
            search: "Search",
            createOrEdit: "Create / Edit",
            save: "Save",
        }
    },
    tr: {
        translation: {
            signUp: "Kayıt Ol",
            userName: "Kullanıcı Adı",
            email: "E-posta",
            password: "Sifre",
            rewritePassword: "Sifreyi Tekrar Giriniz",
            confirm: "Onayla",
            welcome: "Hosgeldiniz!",
            login: "Giriş",
            newUser: "Yeni Kullanıcı mısınız?",
            balance: "Bakiye",
            income: "Gelir",
            outcome: "Gider",
            date: "Tarih",
            money: "Tutar",
            type: "Tür",
            edit: "Düzenle",
            startDate: "Baslangıç Tarihi",
            endDate: "Bitiş Tarihi",
            search: "Ara",
            createOrEdit: "Oluştur / Düzenle",
            save: "Kaydet",
        }
    }
}

i18n.use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "tr",
    })