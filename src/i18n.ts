import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "hero": {
        "title": "Who Hosts This <1>Website?</1>",
        "subtitle": "Enter a domain name to instantly detect its hosting provider, server location, CMS, and technical details.",
        "placeholder": "example.com",
        "button": "Scan"
      },
      "nav": {
        "home": "Home",
        "checker": "Hosting Checker",
        "blog": "Blog",
        "about": "About",
        "whois": "WHOIS",
        "dns": "DNS",
        "geo": "IP Geo",
        "hosting_services": "Web Hosting Services"
      },
      "results": {
        "analysis_for": "Analysis for",
        "copy_json": "Copy JSON",
        "download_pdf": "Download PDF",
        "hosting_provider": "Hosting Provider",
        "tech_stack": "Technology Stack",
        "dns_records": "DNS Records",
        "provider": "Provider",
        "ip_address": "IP Address",
        "location": "Location",
        "server_type": "Server Type",
        "cms": "CMS",
        "ssl_status": "SSL Status",
        "web_server": "Web Server",
        "cdn": "CDN",
        "nameservers": "Nameservers",
        "mx_records": "MX Records"
      },
      "footer": {
        "description": "The world's most accurate hosting checker tool by WebSEOTrends. Detect hosting providers, IP addresses, and server details instantly.",
        "tools": "Tools",
        "company": "Company",
        "newsletter": "Newsletter",
        "newsletter_desc": "Get the latest hosting tips and SEO trends delivered to your inbox.",
        "subscribe": "Subscribe",
        "rights": "All rights reserved."
      }
    }
  },
  hi: {
    translation: {
      "hero": {
        "title": "यह <1>वेबसाइट</1> कौन होस्ट करता है?",
        "subtitle": "होस्टिंग प्रदाता, सर्ver स्थान, CMS और तकनीकी विवरणों का तुरंत पता लगाने के लिए एक डोमेन नाम दर्ज करें।",
        "placeholder": "example.com",
        "button": "स्कैन करें"
      },
      "nav": {
        "home": "होम",
        "checker": "होस्टिंग चेकर",
        "blog": "ब्लॉग",
        "about": "हमारे बारे में",
        "whois": "WHOIS",
        "dns": "DNS",
        "geo": "IP जियो",
        "hosting_services": "वेब होस्टिंग सेवाएं"
      },
      "results": {
        "analysis_for": "के लिए विश्लेषण",
        "copy_json": "JSON कॉपी करें",
        "download_pdf": "PDF डाउनलोड करें",
        "hosting_provider": "होस्टिंग प्रदाता",
        "tech_stack": "टेक्नोलॉजी स्टैक",
        "dns_records": "DNS रिकॉर्ड्स",
        "provider": "प्रदाता",
        "ip_address": "IP पता",
        "location": "स्थान",
        "server_type": "सर्वर प्रकार",
        "cms": "CMS",
        "ssl_status": "SSL स्थिति",
        "web_server": "वेब सर्वर",
        "cdn": "CDN",
        "nameservers": "नेमसर्वर",
        "mx_records": "MX रिकॉर्ड्स"
      },
      "footer": {
        "description": "WebSEOTrends द्वारा दुनिया का सबसे सटीक होस्टिंग चेकर टूल। होस्टिंग प्रदाताओं, IP पतों और सर्वर विवरणों का तुरंत पता लगाएं।",
        "tools": "टूल्स",
        "company": "कंपनी",
        "newsletter": "न्यूज़लेटर",
        "newsletter_desc": "अपने इनबॉक्स में नवीनतम होस्टिंग टिप्स और SEO रुझान प्राप्त करें।",
        "subscribe": "सब्सक्राइब करें",
        "rights": "सर्वाधिकार सुरक्षित।"
      }
    }
  },
  fr: {
    translation: {
      "hero": {
        "title": "Qui héberge ce <1>site web ?</1>",
        "subtitle": "Entrez un nom de domaine pour détecter instantanément son hébergeur, l'emplacement du serveur, le CMS et les détails techniques.",
        "placeholder": "exemple.com",
        "button": "Scanner"
      },
      "nav": {
        "home": "Accueil",
        "checker": "Vérificateur d'Hébergement",
        "blog": "Blog",
        "about": "À Propos",
        "whois": "WHOIS",
        "dns": "DNS",
        "geo": "Géo IP",
        "hosting_services": "Services d'hébergement web"
      },
      "results": {
        "analysis_for": "Analyse pour",
        "copy_json": "Copier JSON",
        "download_pdf": "Télécharger PDF",
        "hosting_provider": "Hébergeur",
        "tech_stack": "Pile Technologique",
        "dns_records": "Enregistrements DNS",
        "provider": "Fournisseur",
        "ip_address": "Adresse IP",
        "location": "Emplacement",
        "server_type": "Type de Serveur",
        "cms": "CMS",
        "ssl_status": "Statut SSL",
        "web_server": "Serveur Web",
        "cdn": "CDN",
        "nameservers": "Serveurs de noms",
        "mx_records": "Enregistrements MX"
      },
      "footer": {
        "description": "L'outil de vérification d'hébergement le plus précis au monde par WebSEOTrends. Détectez instantanément les hébergeurs, les adresses IP et les détails du serveur.",
        "tools": "Outils",
        "company": "Entreprise",
        "newsletter": "Newsletter",
        "newsletter_desc": "Recevez les derniers conseils d'hébergement et tendances SEO dans votre boîte de réception.",
        "subscribe": "S'abonner",
        "rights": "Tous droits réservés."
      }
    }
  },
  de: {
    translation: {
      "hero": {
        "title": "Wer hostet diese <1>Website?</1>",
        "subtitle": "Geben Sie einen Domainnamen ein, um sofort den Hosting-Anbieter, den Serverstandort, das CMS und technische Details zu ermitteln.",
        "placeholder": "beispiel.de",
        "button": "Scannen"
      },
      "nav": {
        "home": "Startseite",
        "checker": "Hosting-Checker",
        "blog": "Blog",
        "about": "Über uns",
        "whois": "WHOIS",
        "dns": "DNS",
        "geo": "IP-Geo",
        "hosting_services": "Webhosting-Dienste"
      },
      "results": {
        "analysis_for": "Analyse für",
        "copy_json": "JSON kopieren",
        "download_pdf": "PDF herunterladen",
        "hosting_provider": "Hosting-Anbieter",
        "tech_stack": "Technologie-Stack",
        "dns_records": "DNS-Einträge",
        "provider": "Anbieter",
        "ip_address": "IP-Adresse",
        "location": "Standort",
        "server_type": "Servertyp",
        "cms": "CMS",
        "ssl_status": "SSL-Status",
        "web_server": "Webserver",
        "cdn": "CDN",
        "nameservers": "Nameserver",
        "mx_records": "MX-Einträge"
      },
      "footer": {
        "description": "Das weltweit präziseste Hosting-Checker-Tool von WebSEOTrends. Erkennen Sie Hosting-Anbieter, IP-Adressen und Serverdetails sofort.",
        "tools": "Tools",
        "company": "Unternehmen",
        "newsletter": "Newsletter",
        "newsletter_desc": "Erhalten Sie die neuesten Hosting-Tipps und SEO-Trends direkt in Ihren Posteingang.",
        "subscribe": "Abonnieren",
        "rights": "Alle Rechte vorbehalten."
      }
    }
  },
  zh: {
    translation: {
      "hero": {
        "title": "谁托管了这个<1>网站？</1>",
        "subtitle": "输入域名即可立即检测其托管提供商、服务器位置、CMS 和技术细节。",
        "placeholder": "example.com",
        "button": "扫描"
      },
      "nav": {
        "home": "首页",
        "checker": "主机查询",
        "blog": "博客",
        "about": "关于我们",
        "whois": "WHOIS查询",
        "dns": "DNS查询",
        "geo": "IP地理位置",
        "hosting_services": "网络托管服务"
      },
      "results": {
        "analysis_for": "分析结果：",
        "copy_json": "复制 JSON",
        "download_pdf": "下载 PDF",
        "hosting_provider": "托管提供商",
        "tech_stack": "技术栈",
        "dns_records": "DNS 记录",
        "provider": "提供商",
        "ip_address": "IP 地址",
        "location": "位置",
        "server_type": "服务器类型",
        "cms": "CMS",
        "ssl_status": "SSL 状态",
        "web_server": "Web 服务器",
        "cdn": "CDN",
        "nameservers": "域名服务器",
        "mx_records": "MX 记录"
      },
      "footer": {
        "description": "由 WebSEOTrends 提供的全球最准确的主机查询工具。立即检测托管提供商、IP 地址和服务器详细信息。",
        "tools": "工具",
        "company": "公司",
        "newsletter": "通讯",
        "newsletter_desc": "将最新的主机技巧和 SEO 趋势发送到您的收件箱。",
        "subscribe": "订阅",
        "rights": "版权所有。"
      }
    }
  },
  tl: {
    translation: {
      "hero": {
        "title": "Sino ang nagho-host ng <1>website na ito?</1>",
        "subtitle": "Maglagay ng domain name para agad na ma-detect ang hosting provider nito, lokasyon ng server, CMS, at mga teknikal na detalye.",
        "placeholder": "halimbawa.com",
        "button": "I-scan"
      },
      "nav": {
        "home": "Home",
        "checker": "Hosting Checker",
        "blog": "Blog",
        "about": "Tungkol sa Amin",
        "whois": "WHOIS",
        "dns": "DNS",
        "geo": "IP Geo",
        "hosting_services": "Mga Serbisyo sa Web Hosting"
      },
      "results": {
        "analysis_for": "Pagsusuri para sa",
        "copy_json": "Kopyahin ang JSON",
        "download_pdf": "I-download ang PDF",
        "hosting_provider": "Hosting Provider",
        "tech_stack": "Technology Stack",
        "dns_records": "Mga DNS Record",
        "provider": "Provider",
        "ip_address": "IP Address",
        "location": "Lokasyon",
        "server_type": "Uri ng Server",
        "cms": "CMS",
        "ssl_status": "SSL Status",
        "web_server": "Web Server",
        "cdn": "CDN",
        "nameservers": "Nameservers",
        "mx_records": "Mga MX Record"
      },
      "footer": {
        "description": "Ang pinakatumpak na hosting checker tool sa mundo ng WebSEOTrends. Agad na i-detect ang mga hosting provider, IP address, at mga detalye ng server.",
        "tools": "Mga Tool",
        "company": "Kumpanya",
        "newsletter": "Newsletter",
        "newsletter_desc": "Kunin ang pinakabagong mga tip sa hosting at mga trend sa SEO na ipinadala sa iyong inbox.",
        "subscribe": "Mag-subscribe",
        "rights": "Lahat ng karapatan ay nakareserba."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
