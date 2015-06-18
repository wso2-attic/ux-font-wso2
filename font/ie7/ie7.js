/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'fontwso2\'">' + entity + '</span>' + html;
	}
	var icons = {
		'fw-resource': '&#xe681;',
		'fw-publish': '&#xe682;',
		'fw-apple': '&#xe613;',
		'fw-android': '&#xe653;',
		'fw-windows': '&#xe654;',
		'fw-laptop': '&#xe659;',
		'fw-computer': '&#xe655;',
		'fw-mobile': '&#xe656;',
		'fw-dots': '&#xe615;',
		'fw-tiles': '&#xe60e;',
		'fw-menu': '&#xe60f;',
		'fw-list': '&#xe610;',
		'fw-checklist': '&#xe612;',
		'fw-grid': '&#xe611;',
		'fw-user': '&#xe601;',
		'fw-add-user': '&#xe668;',
		'fw-key': '&#xe665;',
		'fw-star': '&#xe667;',
		'fw-mail': '&#xe683;',
		'fw-view': '&#xe652;',
		'fw-sign-up': '&#xe67f;',
		'fw-edit': '&#xe65d;',
		'fw-bookmark': '&#xe66f;',
		'fw-register2': '&#xe669;',
		'fw-search': '&#xe657;',
		'fw-filter': '&#xe65b;',
		'fw-send': '&#xe66a;',
		'fw-delete': '&#xe614;',
		'fw-settings': '&#xe65e;',
		'fw-calendar': '&#xe658;',
		'fw-share': '&#xe65a;',
		'fw-message': '&#xe616;',
		'fw-forum': '&#xe65c;',
		'fw-tag': '&#xe680;',
		'fw-subscribe': '&#xe65f;',
		'fw-store': '&#xe61b;',
		'fw-statistics': '&#xe66e;',
		'fw-bell': '&#xe66b;',
		'fw-lock': '&#xe618;',
		'fw-battery': '&#xe619;',
		'fw-camera': '&#xe61a;',
		'fw-wifi': '&#xe606;',
		'fw-usb-drive': '&#xe602;',
		'fw-hdd': '&#xe61c;',
		'fw-map-location': '&#xe61d;',
		'fw-invitation': '&#xe664;',
		'fw-dashboard': '&#xe672;',
		'fw-lifecycle': '&#xe617;',
		'fw-dial-up': '&#xe61f;',
		'fw-incoming-call': '&#xe620;',
		'fw-clock': '&#xe621;',
		'fw-hour-glass': '&#xe685;',
		'fw-clean': '&#xe622;',
		'fw-paste': '&#xe67d;',
		'fw-copy': '&#xe67e;',
		'fw-sort': '&#xe623;',
		'fw-list-sort': '&#xe624;',
		'fw-sequence': '&#xe625;',
		'fw-rules': '&#xe626;',
		'fw-padlock': '&#xe66c;',
		'fw-uri': '&#xe603;',
		'fw-pdf': '&#xe627;',
		'fw-ms-document': '&#xe629;',
		'fw-swagger': '&#xe62a;',
		'fw-jquery': '&#xe62b;',
		'fw-java': '&#xe62c;',
		'fw-javaee': '&#xe62d;',
		'fw-java-spring': '&#xe673;',
		'fw-nodejs': '&#xe686;',
		'fw-javascript': '&#xe62e;',
		'fw-jaggery': '&#xe62f;',
		'fw-jaxrs': '&#xe674;',
		'fw-bug': '&#xe687;',
		'fw-uncheck': '&#xe630;',
		'fw-check': '&#xe631;',
		'fw-ticked-box': '&#xe67a;',
		'fw-up-arrow-2': '&#xe660;',
		'fw-down-arrow-2': '&#xe661;',
		'fw-left-arrow-2': '&#xe662;',
		'fw-right-arrow-2': '&#xe663;',
		'fw-up-arrow': '&#xe632;',
		'fw-down-arrow': '&#xe63e;',
		'fw-left-arrow': '&#xe633;',
		'fw-right-arrow': '&#xe634;',
		'fw-cancel': '&#xe635;',
		'fw-add': '&#xe636;',
		'fw-minus': '&#xe628;',
		'fw-refresh': '&#xe637;',
		'fw-ring': '&#xe600;',
		'fw-circle': '&#xe638;',
		'fw-ok': '&#xe639;',
		'fw-error': '&#xe63a;',
		'fw-block': '&#xe63b;',
		'fw-info': '&#xe684;',
		'fw-warning': '&#xe605;',
		'fw-remove': '&#xe678;',
		'fw-deploy': '&#xe66d;',
		'fw-devices': '&#xe63c;',
		'fw-dss': '&#xe63d;',
		'fw-database': '&#xe67b;',
		'fw-servers': '&#xe679;',
		'fw-endpoint': '&#xe63f;',
		'fw-bpmn': '&#xe640;',
		'fw-bpel': '&#xe641;',
		'fw-gadget': '&#xe642;',
		'fw-application': '&#xe643;',
		'fw-applications': '&#xe675;',
		'fw-cloud': '&#xe644;',
		'fw-service': '&#xe645;',
		'fw-rest-service': '&#xe646;',
		'fw-rest-api': '&#xe647;',
		'fw-api': '&#xe648;',
		'fw-service-provider': '&#xe649;',
		'fw-globe': '&#xe666;',
		'fw-website': '&#xe604;',
		'fw-proxy': '&#xe64a;',
		'fw-jaxws': '&#xe676;',
		'fw-policy': '&#xe64b;',
		'fw-security-policy': '&#xe64c;',
		'fw-throttling-policy': '&#xe64d;',
		'fw-blank-document': '&#xe64e;',
		'fw-ebook': '&#xe670;',
		'fw-document': '&#xe671;',
		'fw-tasks': '&#xe67c;',
		'fw-text': '&#xe64f;',
		'fw-html': '&#xe650;',
		'fw-wadl': '&#xe608;',
		'fw-wsdl': '&#xe609;',
		'fw-xacml': '&#xe60a;',
		'fw-xsd': '&#xe60b;',
		'fw-xq': '&#xe60c;',
		'fw-xslt': '&#xe60d;',
		'fw-war': '&#xe677;',
		'fw-xml': '&#xe61e;',
		'fw-soap': '&#xe651;',
		'fw-wso2': '&#xe607;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/fw-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
