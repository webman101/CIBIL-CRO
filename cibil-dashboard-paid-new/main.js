



function localizedString(e, t) {
    var r;
    return (
        t ?
        (r = t) :
        void 0 !== reqpar["request-params"]["tl.language"] ?
        "hi" == reqpar["request-params"]["tl.language"] || "hiIN" == reqpar["request-params"]["tl.language"] ?
        (r = "hi") :
        "ta" == reqpar["request-params"]["tl.language"] || "taIN" == reqpar["request-params"]["tl.language"] ?
        (r = "ta") :
        "te" == reqpar["request-params"]["tl.language"] || "teIN" == reqpar["request-params"]["tl.language"] ?
        (r = "te") :
        "be" == reqpar["request-params"]["tl.language"] || "beIN" == reqpar["request-params"]["tl.language"] ?
        (r = "be") :
        ("en" != reqpar["request-params"]["tl.language"] && "enUS" != reqpar["request-params"]["tl.language"]) || (r = "en") :
        (r = null !== sessionStorage.getItem("userLangPref") ? sessionStorage.getItem("userLangPref") : locale ? locale : "en"),
        void 0 !== tStrings[e] && void 0 !== tStrings[e][r] ? tStrings[e][r] : ""
    );
}




function findElementRefreshDate(e, t, r) {
    for (var n = 0; n < e.length; n++) {
        var a = e[n].NextFulfillmentDate,
            i = a.substring(0, 22),
            o = new Date(i);
        if (e[n][t] === r && today >= o) return !0;
    }
    return !1;
}

function matchKeyValue(e, t) {
    for (var r in e)
        if (r.toLowerCase().indexOf(t.toLowerCase()) !== -1) return e[r];
    return null;
}

function matchKey(e, t) {
    for (var r in e)
        if (r.toLowerCase().indexOf(t.toLowerCase()) !== -1) return r;
    return null;
}

function findKeyNewArray(e, t, r) {
    for (var n in e) n.toLowerCase().indexOf(t.toLowerCase()) !== -1 && r.push(n);
    return null;
}

function FindByAttributeValue(e, t, r, n) {
    n = n || "*";
    for (var a = r.getElementsByTagName(n), i = 0; i < a.length; i++)
        if (a[i].getAttribute(e) == t) return a[i];
}

function generalGATracking(e, t, r) {
    (window.dataLayer = window.dataLayer || []), dataLayer.push({ event: "EventTracking", eventCategory: e, eventAction: t, eventLabel: r });
}

function formSubmissionGA(e, t, r, n) {
    $(e).click(function() {
        generalGATracking(t, r, n);
    });
}

function onLoadGATracking(e) {
    window.dataLayer.push({ event: "VirtualPageview", PageType: e });
}

function submitAsync(e, t, r) {
    if ("string" != typeof e) return DEBUG && console.warn("Action(s) missing or invalid."), !1;
    var t = t || {};
    (t.requestToken = encodeURI(CSRFtoken)), (t.action = e), (t.DestinationPage = "x");
    var r = r || !1,
        n = r ? "ajax/redirect.page" : "ajax/serviceData.page";
    $.ajax({
        url: n,
        type: "GET",
        dataType: "json",
        data: t,
        success: function(e) {
            return e;
        },
    });
}



function getPercentage(e, t) {
    function r(e) {
        var t = {};
        for (var r in e) {
            var n,
                a = { percentage: [], range: [] };
            ["F", "Dm", "D", "Cm", "C", "Bm", "B", "Am", "A"].forEach(function(t) {
                    var i = e[r][t];
                    i && (a.range.push(i.min), (n = i.max), a.percentage.push(i.perc));
                }),
                a.range.push(n),
                (t[r] = a);
        }
        return t;
    }
    var n,
        a,
        i = r(CCVD.gradeRanges);
    if (i[t]) {
        (n = i[t].percentage), (a = i[t].range);
        var o = 0;
        return (
            n.forEach(function(t, r, i) {
                var s = a[r],
                    l = a[r + 1];
                e > s && e <= l ? (o += ((e - s) / (l - s)) * n[r]) : e > l && (o += n[r]);
            }),
            o
        );
    }
}

function buildRankChart() {
    var e = $(".chart-rank"),
        t = CCVD.gradeRanges[data.model],
        r = data.score;
    window.grade;
    var n,
        a = $("#tmpl_CreditRank").html();
    DEBUG && console.info("Compile: tmpl_CreditRank ...");
    var i = Handlebars.compile(a),
        o = i(t);
    if (($(e).html(o), t.hasMidRanges))
        switch (!0) {
            case r > t.Am.max:
                window.grade = "A";
                break;
            case r > t.B.max:
                window.grade = "Am";
                break;
            case r > t.Bm.max:
                window.grade = "B";
                break;
            case r > t.C.max:
                window.grade = "Bm";
                break;
            case r > t.Cm.max:
                window.grade = "C";
                break;
            case r > t.D.max:
                window.grade = "Cm";
                break;
            case r > t.Dm.max:
                window.grade = "D";
                break;
            case r > t.F.max:
                window.grade = "Dm";
                break;
            case r < t.Dm.min:
                window.grade = "F";
        }
    else
        switch (!0) {
            case r > t.B.max:
                (window.grade = "A"), (n = "1");
                break;
            case r > t.C.max:
                (window.grade = "B"), (n = "2");
                break;
            case r > t.D.max:
                (window.grade = "C"), (n = "3");
                break;
            case r > t.F.max:
                (window.grade = "D"), (n = "4");
                break;
            case r < t.D.min:
                (window.grade = "F"), (n = "5");
        }
    var s;
    "undefined" != typeof ud && "undefined" != typeof ud.scores.creditvision.creditScoreModel && "CIBILTUSC3" === ud.scores.creditvision.creditScoreModel && $(".chart-rank li").addClass("v3ScoreModel"),
        noScore ?
        $(".your-rank").hide() :
        ((s = parseInt(getPercentage(r, modelToUse))),
            $(".your-rank", e).addClass("grade" + window.grade),
            $(".your-rank em", e).after(r),
            $(".summary .score", e).html(r),
            $(".summary .range", e).html(n),
            $(".your-percentage", e).addClass("grade" + window.grade),
            $(".your-percentage em", e).after(s + "%"),
            localStorage.setItem("scoreGrade", window.grade));
}

function buildHistoryChart(e) {
    function t(e) {
        if (e.length > 0) {
            var t = e[0].value;
            return e.every(function(e) {
                return e.value === t;
            });
        }
    }
    var r = today.getFullYear(),
        n = $("#chart-history")[0],
        a = n.offsetWidth - 25,
        o = n.offsetHeight - 20,
        s = Math.floor(a / 6),
        l = Math.floor(o / 6),
        d = new Raphael(n, a + 25, o + 20),
        c = [],
        u = [],
        p = [],
        h = [],
        f = [],
        m = e,
        g = [];
    for (i = 0; i < m.length; i++) "" != m[i].date && "" != m[i].score && ((m[i].date = new Date(convertDate(m[i].date))), today - m[i].date < msInOneYear && g.push(m[i]));
    for (m = g, g = [], i = 0; i < m.length; i++)
        if (0 != i) {
            var v = !1;
            for (j = 0; j < g.length; j++) m[i].date < g[j].date && (g.splice(j, 0, m[i]), (v = !0), (j = g.length));
            v || g.push(m[i]);
        } else g.push(m[i]);
    m = g;
    var y,
        b,
        S,
        w,
        C = [];
    for (i = 0; i < m.length; i++) C.push(m[i].score);
    (C = C.sort()),
    C.length < 2 ? ((y = C[0] - 100), (b = C[0])) : ((y = C.shift()), (b = C.pop())),
        t(m) && (1 === y || 0 === y ? (y = 1) : (y -= 5)),
        (S = b - y),
        (w = S / 4),
        (p = 1 === b || 0 === b ? "" : [b, Math.floor(b - 1 * w), Math.floor(b - 2 * w), Math.floor(b - 3 * w), Math.floor(b - 4 * w)]);
    var _ = [],
        x = thisMonth;
    for (x % 2 > 0 && x++, 12 !== x && (x += 12), i = 0; i < 6; i++) {
        i > 0 && (x -= 2), i > 0 && 12 == x && r--;
        var P = x > 12 ? x - 12 : x;
        if ("hi" === sessionStorage.getItem("userLangPref")) var A = month[P - 1].abbr_hi + "/" + month[P].abbr_hi;
        else var A = month[P - 1].abbr + "/" + month[P].abbr;
        var D = r;
        c.push(A), u.push(D), _.push({ min: new Date(P - 1 + "/01/" + r), max: new Date(P + "/" + month[P].max + "/" + r) });
    }
    for (c = c.reverse(), u = u.reverse(), _ = _.reverse(), i = 0; i < _.length; i++) {
        var I = [];
        for (j = 0; j < m.length; j++) m[j].date >= _[i].min && m[j].date <= _[i].max && I.push(m[j]);
        h.push(I);
    }
    var E;
    for (i = 0; i < h.length; i++) h[i].length > 0 && (E = i + 1);
    for (h.splice(E, 6), i = 0; i < h.length; i++) {
        var B = 0,
            O = 0;
        if (h[i].length > 0) {
            for (j = 0; j < h[i].length; j++)(h[i][j].date = month[h[i][j].date.getMonth() + 1].abbr + " " + h[i][j].date.getDate() + ", " + h[i][j].date.getFullYear()), h[i][j].score > B && ((B = h[i][j].score), (O = j));
            h[i][O].isHighestScore = !0;
        }
    }
    var k = l / (S / 4);
    for (i = 0; i < h.length; i++)
        for (f.push(20 + 5 * l), j = 0; j < h[i].length; j++) h[i][j].isHighestScore && 0 !== h[i][j].score && (f[i] = 20 + (b - h[i][j].score) * k);
    var L = "",
        T = "",
        R = 50,
        N = 20;
    if (window.matchMedia("(max-width: 480px)").matches)
        var q = 0,
            M = -20;
    else
        var q = 65,
            M = 20;
    for (i = 0; i < 6; i++) {
        var F = N + l * i;
        L += ",M" + R + " " + F + ",L" + (a - M) + " " + F;
    }
    L = L.replace(/^,/, "");
    var U = d.path(L);
    for (U.node.setAttribute("class", "x-axis-grid"), i = 0; i < 12; i++) {
        var H = R + (s * i) / 2;
        T += ",M" + H + " " + N + ",L" + H + " " + (N + 5 * l);
    }
    T = T.replace(/^,/, "");
    var z = d.path(T);
    for (z.node.setAttribute("class", "y-axis-grid"), i = 0; i < c.length; i++) {
        var V = R + q + s * i,
            G = d.text(V, o - 10, c[i]).attr({ font: "" });
        G.node.setAttribute("class", "x-axis-label");
    }
    for (i = 0; i < u.length; i++) {
        var V = R + q + s * i,
            G = d.text(V, o + 10, u[i]).attr({ font: "" });
        G.node.setAttribute("class", "x-axis-label");
    }
    for (i = 0; i < p.length; i++) {
        var W = N + l * i,
            Y = d.text(15, W, p[i]).attr({ font: "" });
        Y.node.setAttribute("class", "y-axis-label");
    }
    var K = "M50 " + (20 + 5 * l),
        Q = "M50 " + (20 + 5 * l) + ",L50 " + f[0];
    for (i = 0; i < h.length; i++) {
        var V = R + q + s * i;
        (K += ",L" + V + " " + f[i]), (Q += ",L" + V + " " + f[i]);
    }
    var Z = ud.scores.creditvision.score,
        J = (Z + "").length;
    if (($(".no-scoretrending-history").hide(), J > 2 && 0 !== Z && m.length > 0 && m[m.length - 1].score > 1)) {
        var X;
        (X = 6 == E ? 15 : 125 * (6 - E) + 20), window.matchMedia("(max-width: 480px)").matches && (X = 50 * (6 - E)), (K += ",L" + (a - X) + " " + (20 + 5 * l) + " Z");
        var ee = d.path(K);
        ee.node.setAttribute("class", "polygon");
        var te = d.path(Q);
        for (te.node.setAttribute("class", "line"), i = 0; i < f.length; i++)
            if (0 != h[i].length) {
                var V = R + q + s * i,
                    re = d.set(),
                    ne = d.circle(V, f[i], 15);
                ne.node.setAttribute("class", "outer data" + i);
                var ae = d.circle(V, f[i], 8);
                ae.node.setAttribute("class", "inner data" + i), re.push(ne, ae), (re.tui_dataset = "data" + i);
                var ie = "<dl class='data" + i + "' style='top:" + (f[i] + 15) + "px;left:" + (V - 80) + "px'>";
                for (j = 0; j < h[i].length; j++)
                    (console.log("hj",h[i][j])),(ie += "<div class='graphdata "+ (j == 0 ? (i == 0 ? "score-increment" : "score-decrement" ) : h[i][j].score > h[i][j-1].score ? "score-increment" : h[i][j].score == h[i][j-1].score ? "score-same" : "score-decrement") +"'><dt class='" + (h[i][j].isHighestScore ? "active" : "") + "'>" + h[i][j].date + "</dt>"), (ie += 0 === h[i][j].score ? "<dd>NA</dd>" : 1 === h[i][j].score ? "<dd>NH</dd>" : "<dd>" + h[i][j].score + "</dd> </div>");
                (ie += "</dl>"), $("#chart-history svg").after(ie);
            }
    }
    $(document)
        .on("mouseover", "circle", function() {
            var e = this.className.baseVal.split(/\s+/);
            for (i = 0; i < e.length; i++)
                if (e[i].match(/^data/)) var t = e[i];
            $("circle.outer." + t).attr({ r: 23 }), $("circle.inner." + t).attr({ r: 14, "stroke-width": 9 });
        }).on("mouseout", "circle", function() {
            var e = this.className.baseVal.split(/\s+/);
            for (i = 0; i < e.length; i++)
                if (e[i].match(/^data/)) var t = e[i];
            $("circle.outer." + t).attr({ r: 15 }), $("circle.inner." + t).attr({ r: 8, "stroke-width": 5 });
        }).off("click", "circle").on("click", "circle", function() {
            var e = this.className.baseVal.split(/\s+/);
            for (i = 0; i < e.length; i++)
                if (e[i].match(/^data/)) var t = e[i];
            $("dl." + t).show().siblings('dl').hide();;
        });
}

function buildCreditOverview() {
    "undefined" != typeof ud.reportstu.CreditSummaryData &&
        ($(".refreshed-date").text(ud.scores.creditvision.date),
            $(".latePayment").text(ud.reportstu.CreditSummaryData.LatePayments),
            $(".currentBalance").text(Number(ud.reportstu.CreditSummaryData.CurrentBalance).toLocaleString("en-IN")),
            $(".openedAccounts").text(ud.reportstu.CreditSummaryData.OpenedAccounts),
            $(".inquires").text(ud.reportstu.CreditSummaryData.Inquires),
            "0" !== ud.reportstu.CreditSummaryData.AvailableCredit && ud.reportstu.CreditSummaryData.AvailableCredit > "0" ?
            $(".availableCredit").text(Number(ud.reportstu.CreditSummaryData.AvailableCredit).toLocaleString("en-IN")) :
            ($(".availableCredit").parents(".summarytbl-data")[0].innerHTML = "-"),
            $(".creditUtilization").text(ud.reportstu.CreditSummaryData.CreditUtilization),
            $(".oldestCreditAccountPeriod").text(ud.reportstu.CreditSummaryData.OldestCreditAccountPeriod));
}

function buildScoreSimulator() {
    var e = {};
    for (k in data.reqpar) {
        var t = k.replace(/\./g, "_");
        e[t] = data.reqpar[k];
    }
    (data.reqpar = e),
    (source = $("#tmpl_ScoreSimulator").html()),
    DEBUG && console.info("Compile: tmpl_ScoreSimulator ..."),
        (template = Handlebars.compile(source)),
        (html = template(data)),
        $(".score-simulator").append(html),
        $('input[type="range"]').each(function() {
            $(this).val() > 0 && $(this).next(".value").text($(this).val());
        });
}

function handleFormToggles(e) {
    var t = $(e).parent(".switches"),
        r = $(e).prev()[0] || $(e).next()[0];
    return (
        $(e).addClass("active"),
        $(r).removeClass("active"),
        $(t).hasClass("toggles-input") ?
        $(e).data("toggle") ?
        ($(t).siblings("input").addClass("required"), $(t).siblings("input").val("")) :
        $(t).siblings("input").removeClass("required").val("") :
        $(t).hasClass("toggles-boolean") && ($(e).data("toggle") ? $(t).siblings("input").val("true") : $(t).siblings("input").val("")), !0
    );
}

function findScoreTrend() {
    var e = convertDate(apiKeys.V3ScoreLaunchDate),
        t = [],
        r = [],
        n = ud.trending;
    for (i = 0; i < n.length; i++) e > new Date(convertDate(n[i].date)) ? t.push(n[i]) : r.push(n[i]);
    buildHistoryChart(r.length > 0 ? r : ud.trending);
}

function renderDashboard() {
    if (
        ((source = $("#tmpl_ScoreDetails").html()),
            DEBUG && console.info("Compile: tmpl_ScoreDetails ..."),
            (template = Handlebars.compile(source)),
            (html = template(data)),

            $("#dashboard").length > 0 || ($("#CreditReports").length > 0 && void 0 != reqpar["request-params"]["tl.productWebToken"]))
    ) {
        hasSB7 && $(".breach-dashboard").addClass("has-sb7"),
            $("#referenceKey").text(ud.reportstu.ReferenceKey.CIBIL),
            $("#personalized-score").text(0 == scoreInNumeric ? "NA" : 1 == scoreInNumeric ? "NH" : ud.scores.creditvision.score);
        for (var e = 0; e < ud.reportstu.ComponentDetail.length; e++)
            if ("CIBIL" != currentEnterprise() && "ScoreAnalysis" != ud.reportstu.ComponentDetail[e].Component) $(".score-analysis-link").css("display", "none");
            else if (("ATLASPAY" == currentEnterprise() || "ATLASSSO" == currentEnterprise() || "DIGILOCKER" == currentEnterprise() || "ICICIBANK" == currentEnterprise()) && "ScoreAnalysis" == ud.reportstu.ComponentDetail[e].Component) {
            $(".score-analysis-link").css("display", "block");
            break;
        }
        for (var e = 0; e < ud.reportstu.ComponentDetail.length; e++) {
            var t = ud.reportstu.ComponentDetail[e].ExpireDate,
                r = t.substring(8, 10),
                n = t.substring(5, 7),
                a = t.substring(0, 4),
                i = r + "/" + n + "/" + a;
            if ("CreditSummary" === ud.reportstu.ComponentDetail[e].Component && today < convertDate(i)) {
                buildCreditOverview(),
                    $(".summary-details, .credit-rank .hasFeature").css("display", "block"),
                    $(".get-credit-summary-btn").css("display", "none"),
                    $("#credit-summary-section").removeClass("blurImg"),
                    $(".noFeatureAvailable").css("display", "none");
                break;
            }
            "CIBIL" == currentEnterprise() || "ATLASSSO" == currentEnterprise() || "ATLASPAY" == currentEnterprise() || "DIGILOCKER" == currentEnterprise() ?
                ($(".get-credit-summary-btn, .credit-rank .noFeatureAvailable").css("display", "block"), $("#credit-summary-section").addClass("blurImg"), $(".summary-details").css("display", "none")) :
                ($("#credit-summary-section").css("display", "none"), $("#refresh-center-section").css("width", "100%"));
        }
        for (var e = 0; e < ud.reportstu.ComponentDetail.length; e++) {
            var t = ud.reportstu.ComponentDetail[e].ExpireDate,
                r = t.substring(8, 10),
                n = t.substring(5, 7),
                a = t.substring(0, 4),
                i = r + "/" + n + "/" + a;
            if ("undefined" != typeof ud.trending && "SingleScoreTrend" === ud.reportstu.ComponentDetail[e].Component && today < convertDate(i)) {
                findScoreTrend(), $(".get-score-history").css("display", "none"), $("#creditHistory").removeClass("blurImg");
                break;
            }
            "CIBIL" == currentEnterprise() || "ATLASSSO" == currentEnterprise() || "ATLASPAY" == currentEnterprise() || "DIGILOCKER" == currentEnterprise() ?
                ($(".get-score-history").css("display", "block"), $("#creditHistory").addClass("blurImg"), $(".no-scoretrending-history").css("display", "none"), $(".flex-container-score").hide()) :
                $("#creditHistory").css("display", "none");
        }
        $(".credit-score-date").html(ud.scores[modelToUse].date), $(".credit-score-refresh-date").html(ud.scores[modelToUse].refreshdate);
        var o = { transrisk: "TransRisk&reg;", vantage: "VantageScore&reg;", vantage3: "VantageScore&reg; 3.0" };
        $(".credit-score-name").html(o[modelToUse]), buildRefreshCenter();
    }
}

function throwError(e, t, r, n) {
    var a = r;
    "" !== sessionStorage.getItem("userLangPref") && null !== sessionStorage.getItem("userLangPref") && "en" !== sessionStorage.getItem("userLangPref") && (a = a + "_" + sessionStorage.getItem("userLangPref")),
        $('input[name="' + e + '"],select[name="' + e + '"]')
        .addClass("error")
        .attr("data-error", n),
        "undefined" != typeof CCVD.rules[e] &&
        $(t)
        .html("<span/>" + CCVD.rules[e][a])
        .addClass("error"),
        "tl.password" == e && "match" == r && $('input[name="tl.password2"],input[name="confirm-password"]').addClass("error"),
        "tl.newPassword" == e && "match" == r && "" !== $('input[name="tl.newPassword2"]').val() && $('input[name="tl.newPassword2"],input[name="confirm-password"]').addClass("error");
}

function hasElement(e) {
    return $(e).length > 0;
}


function prettify(e) {
    var t = {
        accountbalance: "Account Balance",
        alerttype: "Alert Type",
        amountdelinquent: "Amount Delinquent",
        assetamount: "Asset Amount",
        casenumber: "Case Number",
        closingdate: "Closing Date",
        comments: "Comments",
        consumerstatement: "Consumer Statement",
        courtname: "Court Name",
        creditorname: "Creditor's Name",
        creditortype: "Creditor Type",
        creditorpreferredcontact: "Creditor's Preferred Contact Method",
        datefiled: "Date Filed",
        dateopened: "Date Opened",
        datereported: "Reported Date",
        employername: "Employer's Name",
        industrytype: "Type of Industry",
        inquirername: "Inquirer's Name",
        liabilityamount: "Liability Amount",
        paymentstatus: "Payment Status",
        plaintiff: "Plaintiff",
        publicrecordtype: "Public Record Type",
        referencenumber: "Reference #",
        releasedate: "Release Date",
        status: "Status",
        subscriberaddres: "Subscriber Address",
        verificationdate: "Verification Date",
    };
    return t[e] || e;
}

function dateString(e) {
    var t = e.getMonth() + 1 + "/" + e.getDate() + "/" + e.getFullYear();
    return t;
}

function urlParam(e) {
    var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
    return null == t ? null : decodeURI(t[1]) || 0;
}

function currentEnterprise() {
    return "undefined" != typeof Cookies.get("Enterprise") ? Cookies.get("Enterprise") : window.location.search.indexOf("enterprise") > -1 ? urlParam("enterprise") : reqpar["request-params"]["tl.partner"];
}

function checkStateCode() {
    $("#enroll-Pin-Current").addClass("helper"),
        $('input[name="tl.curr-pin-code"],select[name="tl.curr-pin-code"]').addClass("error").attr("data-error", "check"),
        $(".pincode-class .helper")
        .html("<span/>" + localizedString("StatePincode"))
        .addClass("error");
}


function otpValidation(e) {
    var t = new RegExp(/^[0-9]\d{5}$/),
        r = t.test(e);
    r ? $(".helper.ok").hide() : ($(".helper.ok").show(), $(".helper.ok").children("span").text(localizedString("numericValidation")), $(".helper").addClass("error"));
}

function showResendPoupup() {
    var e = "";
    "OTP_IDM_Email_Queue" === $("#qName").val() || "OTP_IDM_AlternateEmail_Queue" === $("#qName").val() ? (e = localizedString("passcodeSent")) : "OTP_IDM_Mobile_Queue" === $("#qName").val() && (e = localizedString("passcodeSentMobile")),
        $("#popupMessage").text(e),
        $(".fx-modal").css("display", "block"),
        $("#modal-wrapper").css("display", "block"),
        $(".fx-modal").fadeOut(5e3),
        $("#modal-wrapper").fadeOut(5e3);
}

function buildRefreshCenter() {
    if (($("#refresh-center-section").hide(), $(".get-credit").hide(), $(".refresh-unavailable").hide(), $(".dashboard-refresh-link").hide(), "" !== ud.scores.creditvision.date && ud.reportstu.ComponentDetail.length > 0)) {
        for (var e = convertDate(ud.scores.creditvision.date), t = Math.floor((today - e) / 864e5), r = t == -1 ? 0 : t, n = 0; n < ud.reportstu.ComponentDetail.length; n++) {
            if ("Reports" === ud.reportstu.ComponentDetail[n].Group && "Annual" === ud.reportstu.ComponentDetail[n].TimePeriod) {
                $("#refresh-center-section").show(),
                    $(".get-credit").show(),
                    $("#banner,#upgradeUnlock").show(),
                    $(".refresh-unavailable").hide(),
                    $(".dashboard-refresh-link").remove(),
                    $(".remaining-report .message").append(localizedString("SubscribeMessage"));
                break;
            }
            if ("Reports" === ud.reportstu.ComponentDetail[n].Group && "Annual" !== ud.reportstu.ComponentDetail[n].TimePeriod && "Once" !== ud.reportstu.ComponentDetail[n].TimePeriod) {
                $("#refresh-center-section").show();
                var a = (convertDateFullFillmentDate(ud.reportstu.ComponentDetail[n].NextFulfillmentDate), ud.reportstu.ComponentDetail[n].NextFulfillmentDate),
                    i = a.substring(0, 22),
                    o = new Date(i),
                    s = ud.reportstu.ComponentDetail[n].ExpireDate,
                    l = s.substring(8, 10),
                    d = s.substring(5, 7),
                    c = s.substring(0, 4),
                    u = l + "/" + d + "/" + c,
                    p = u.toString().split("/"),
                    h = p[2];
                "9999" === h && ($(".disclimer-message").hide(), $(".refresh-btn-txt").hide()),
                    today >= o && today < convertDate(u) ?
                    ($(".get-credit").hide(),
                        $(".refresh-unavailable").hide(),
                        $(".dashboard-refresh-link").show(),
                        null === localStorage.getItem("refreshAvail") && localStorage.setItem("refreshAvail", "true"),
                        r > 1 ?
                        $(".remaining-report .message").append(localizedString("RefreshDate_Part1") + '<span class="no-of-cibilreport-days">' + r + "</span>" + localizedString("RefreshDate_Part2_Plur")) :
                        $(".remaining-report .message").append(localizedString("RefreshDate_Part1") + '<span class="no-of-cibilreport-days">' + r + "</span>" + localizedString("RefreshDate_Part2_Sing"))) :
                    today >= o && today > convertDate(u) ?
                    "TUCIBIL" === currentEnterprise() ?
                    ($(".refresh-unavailable").hide(),
                        $(".dashboard-refresh-link").hide(),
                        $(".remaining-report .message").html(
                            "This offer to access your CIBIL Score and Report has ended. To continue the access, please visit <a href='https://www.cibil.com' target='_blank' rel='noopener noreferrer'>www.cibil.com </a>"
                        )) :
                    ($(".get-credit").show(), $("#banner,#upgradeUnlock").show(), $(".refresh-unavailable").hide(), $(".dashboard-refresh-link").hide(), $(".remaining-report .message").append(localizedString("SubscribeMessage"))) :
                    offer_Id.indexOf("T1D0R") >= 0 ?
                    ($(".get-credit").show(), $("#banner,#upgradeUnlock").show(), $(".refresh-unavailable").hide(), $(".dashboard-refresh-link").hide(), $(".remaining-report .message").append(localizedString("SubscribeMessage"))) :
                    ($(".refresh-unavailable").show(),
                        $(".hasNotAlerts .secondaryTitle:not(.refreshed)").hide(),
                        $(".get-credit").hide(),
                        $(".dashboard-refresh-link").hide(),
                        $(".next-refresh-date").append(convertDateFullFillmentDate(ud.reportstu.ComponentDetail[n].NextFulfillmentDate)));
                break;
            }
        }
        for (var n = 0; n < ud.reportstu.OfferHistoryData.length; n++) {
            var f = ud.reportstu.ComponentDetail[n].ExpireDate,
                l = f.substring(8, 10),
                d = f.substring(5, 7),
                c = f.substring(0, 4),
                u = l + "/" + d + "/" + c,
                m = ud.reportstu.OfferHistoryData;
        }
    }
}

function convertDate(e) {
    if (void 0 !== e) {
        var t = e.indexOf("/") > -1 ? e.split("/") : e.split("-");
        return new Date(t[1] + "/" + t[0] + "/" + t[2]);
    }
}

function convertDateFullFillmentDate(e) {
    if (void 0 !== e && "" !== e) {
        var t = e.indexOf("/") > -1 ? e.split("/") : e.split("-");
        return t[2].length > 2 && (t[2] = t[2].substr(0, 2)), t[2] + "/" + t[1] + "/" + t[0];
    }
}

function convertDateToString(e) {
    var t = new Date(e),
        r = ("0" + (t.getMonth() + 1)).slice(-2),
        n = ("0" + t.getDate()).slice(-2);
    return [n, r, t.getFullYear()].join("/");
}

function startsWith(e, t) {
    return 0 === e.lastIndexOf(t, 0);
}

function strincludes(e, t) {
    var r = !1,
        n = e.indexOf(t);
    return n >= 0 && (r = !0), r;
}

function replaceOffer() {
    var e;
    void 0 != apiKeys && "" != apiKeys && (e = "true" == apiKeys.ShowAlert ? "FACRCA" : "FACRC"),
        "" != $("#promoCode").val() && $("#promoCode").val(""),
        $('input[name="Action"]').val("OFFER_REPLACEMENT"),
        $("<input>").attr("type", "hidden").attr("name", "tl.offer-id").attr("value", e).appendTo("form"),
        $("form").submit();
}

function trim(e) {
    e.value = e.value.replace(/^\s*|\s*$/gm, "");
}


function generate(e) {
    "CS" === e
        ?
        $("<input>").attr("type", "hidden").attr("name", "tl.credit-summary").attr("value", "Atlas Credit Summary Section Upgrade Click").appendTo("form") :
        "SH" === e ?
        $("<input>").attr("type", "hidden").attr("name", "tl.score-history").attr("value", "Atlas Score History Section Upgrade Click").appendTo("form") :
        "SA" === e && $("<input>").attr("type", "hidden").attr("name", "tl.score-analysis").attr("value", "Atlas Score Analysis Section Upgrade Click").appendTo("form"),
        $("form").submit();
}

function applyOffer(e) {
    window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login Atlas " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan"),
            eventAction: "Post Login - " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers Display Section - " + e.target.dataset.product + " Offers",
            eventLabel: "Details Box - Apply Offer CTA Click",
        }),
        $(".more-details").hide();
}

function captureConfirmRefreshClickAndReemit(e, t) {
    $("#modal-wrapper").css("display", "none"),
        showLoading(),
        $('input[name="Action"]').val("SUBSEQUENT_UPGRADE"),
        window.location.href.indexOf("creditAlerts") != -1 ?
        $("form").attr("action", "/CreditView/creditreport.page?submit=true&componentID=1502914875416") :
        window.location.href.indexOf("scoreSimulator") != -1 ?
        $("form").attr("action", "/CreditView/scoreSimulator.page?submit=true&componentID=1543530960725") :
        $("form").attr("action", "/CreditView/dashboard.page?submit=true&componentID=1516418270755"),
        $("form").submit();
}

function showErrorMessage(e) {
    var t = $(".formErrorBaner"),
        r = $("#dispButton"),
        n = ".section-title",
        a = $("#" + e).closest(".wrapperSection");
    $(a).hasClass("errorTrigger") ? (t.show(), r.attr("disabled", "disabled"), $(a).find(n).addClass("showError")) : ($(a).find(n).removeClass("showError"), t.hide(), r.removeAttr("disabled"));
}


function realTimeDisputeSummary(e, t, r, n) {
    var a = sessionStorage.getItem("SESSION_REAL_TIME_DISPUTE_SUMMARY"),
        i = JSON.parse(a),
        o = !1;
    return (
        i && i[e] && !n ?
        (o = i[e].some(function(e) {
            return e[t] === r;
        })) :
        n && (o = !0),
        o
    );
}

function sectionTableFailure(e, t, r, n) {
    var a = !1,
        i = document.createElement("table"),
        o = i.insertRow(-1),
        s = document.createElement("th");
    "Account Information" == t ? (s.innerHTML = "Member Name and Account Number") : "Enquiry Information" == t ? (s.innerHTML = "Member Name and Date of Enquiry") : (s.innerHTML = "Field Name"),
        o.appendChild(s),
        (s = document.createElement("th")),
        (s.innerHTML = "Details of Dispute"),
        o.appendChild(s),
        (s = document.createElement("th")),
        (s.innerHTML = "Status of Dispute"),
        o.appendChild(s);
    for (var l = 0; l < n.data.disputedField.length; l++) {
        var d = n.data.disputedField[l].status;
        if ("FAILURE" == d) {
            var c = n.data.disputedField[l].field;
            c = c
                .replace(new RegExp("\\_", "g"), " ")
                .toLowerCase()
                .split(" ")
                .map(function(e) {
                    return e[0].toUpperCase() + e.substr(1);
                })
                .join(" ");
            var u,
                p = n.data.disputedField[l].value,
                h = " to be changed to ";
            if ("PAYMENT_HISTORY" == n.data.disputedField[l].field) {
                var f = "Days past due for ",
                    m = n.data.disputedField[l].dpdMonth;
                u = f + m + h + p;
            } else
                u =
                "ACCOUNT_OWNERSHIP" == n.data.disputedField[l].field || "ACCOUNT_MULTIPLE_TIMES" == n.data.disputedField[l].field || "ENQUIRY_OWNERSHIP" == n.data.disputedField[l].field ?
                p :
                "CREDIT_FACILITY_STATUS" == n.data.disputedField[l].field || "WRITTEN_OFF_AND_SETTLED_STATUS" == n.data.disputedField[l].field ?
                "Moratorium(Regulatory Measure)" == n.data.disputedField[l].value || "Restructured due to COVID-19" == n.data.disputedField[l].value ?
                "Credit Facility Status " + h + " Restructured due to COVID-19" :
                "Credit Facility Status " + h + p :
                c + h + p;
            var g = n.data.disputedField[l].message,
                v = "Written-off and Settled Status";
            if (g.indexOf(v) >= 0) var g = g.replace(/Written-off and Settled Status/g, "Credit Facility Status");
            if ("Account Information" == t && "undefined" != typeof n.data.disputedField[l].memberName && "undefined" != typeof n.data.disputedField[l].accountNumber) {
                (c = n.data.disputedField[l].memberName + " #" + n.data.disputedField[l].accountNumber), (a = !0), (o = i.insertRow(-1));
                var y = o.insertCell(-1);
                y.innerHTML = c;
                var y = o.insertCell(-1);
                y.innerHTML = u;
                var y = o.insertCell(-1);
                (y.innerHTML = g), o.setAttribute("data-hj-suppress", "");
            } else if ("Enquiry Information" == t && "undefined" != typeof n.data.disputedField[l].dateOfEnq) {
                var b = n.data.disputedField[l].dateOfEnq.slice(6, 8) + "-" + n.data.disputedField[l].dateOfEnq.slice(4, 6) + "-" + n.data.disputedField[l].dateOfEnq.slice(0, 4);
                (c = n.data.disputedField[l].memberName + "(" + b + ")"), (a = !0), (o = i.insertRow(-1));
                var y = o.insertCell(-1);
                y.innerHTML = c;
                var y = o.insertCell(-1);
                y.innerHTML = u;
                var y = o.insertCell(-1);
                (y.innerHTML = g), o.setAttribute("data-hj-suppress", "");
            } else if (r.indexOf(n.data.disputedField[l].field) > -1) {
                (a = !0), (o = i.insertRow(-1));
                var y = o.insertCell(-1);
                y.innerHTML = c;
                var y = o.insertCell(-1);
                y.innerHTML = u;
                var y = o.insertCell(-1);
                (y.innerHTML = g), o.setAttribute("data-hj-suppress", "");
            }
        }
    }
    var S = document.getElementById(e + "Head"),
        w = document.getElementById(e);
    a ? ((S.innerHTML = t), (w.innerHTML = ""), w.appendChild(i)) : (w.innerHTML = "");
}

function validateDisputeFields(e) {
    var t = e.target.id;
    if (($(".datepicker").removeAttr("readonly", "readonly"), $(".dob_datepicker").removeAttr("readonly", "readonly"), void 0 == $("#" + t).attr("readonly"))) {
        var r = e.target.value,
            n = r.replace(/[\-,]/g, ""),
            a = t.indexOf("_") >= 0 ? t.split("_") : "",
            i = document.getElementById("disputedob").value,
            o = i.split("-");
        i = new Date(parseInt(o[2]) + 16, parseInt(o[1]) - 1, parseInt(o[0]));
        var s,
            l,
            d,
            c,
            u = 9;
        if (
            ((("" != a && t.indexOf("dateOpened_") >= 0) || t.indexOf("dateClosed_") >= 0 || t.indexOf("dateOFLastPayment_") >= 0 || t.indexOf("dateReportedAndCertified_") >= 0) &&
                ((s = document.getElementById("dateClosed_" + a[1]).value),
                    (l = document.getElementById("dateOpened_" + a[1]).value),
                    (d = document.getElementById("dateOFLastPayment_" + a[1]).value),
                    (c = document.getElementById("dateReportedAndCertified_" + a[1]).innerText)),
                t.indexOf("disputedob") >= 0 &&
                ((document.getElementById("disputedob").parentElement.children[1].innerText = ""),
                    document.getElementById("disputedob").parentElement.children[1].classList.remove("error"),
                    earliestDateOpened() < i &&
                    (document.getElementById("disputedob").parentElement.children[1].append("Date of Birth should be 16 years prior to the oldest account Date Opened / Disbursed"),
                        document.getElementById("disputedob").parentElement.children[1].classList.add("error"))),
                t.indexOf("disputemobileNumber_") >= 0)
        ) {
            var p = e.target.offsetParent.firstElementChild.innerText.trim();
            switch (
                ((document.getElementById(t).nextElementSibling.innerText = ""),
                    $("#" + t)
                    .removeClass("error")
                    .addClass("ok"),
                    document.getElementById(t).nextElementSibling.classList.remove("error"),
                    p)
            ) {
                case "Not Classified":
                case "वर्गीकृत नहीं":
                case "பிரிக்கப்படவில்லை":
                case "వర్గీకరించబడలేదు":
                    var h = new RegExp(
                            /^(?!(?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=0)){4})(?!(?:0(?=9)|1(?=0)|2(?=1)|3(?=2)|4(?=3)|5(?=4)|6(?=5)|7(?=6)|8(?=7)|9(?=8)){4})(?![9]{5})(?![8]{5})(?![7]{5})(?![6]{5})(?![5]{5})(?![4]{5})(?![3]{5})(?![2]{5})(?![0]{5})([0,2-9]{1}[0-9,:;&\\\/]{0,19})$/
                        ),
                        f = new RegExp(/^[0-9](?!.*?[^0-9]{2}).*?[0-9]$/),
                        m = new RegExp(/^[0-9]{5}$/);
                    r !== e.target.defaultValue &&
                        (r.length > 4 && r.length < 21 ?
                            m.test(r.substring(0, 5)) && h.test(r) ?
                            f.test(r) ||
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Phone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Phone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 0 && r.length < 5 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PhoneMin")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 20 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PhoneMax")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Phone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")));
                    break;
                case "Mobile Phone":
                case "मोबाइल फ़ोन":
                case "மொபைல் போன்":
                case "మొబైల్ ఫోన్":
                    var h = new RegExp(
                        /^(?!(?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=0)){4})(?!(?:0(?=9)|1(?=0)|2(?=1)|3(?=2)|4(?=3)|5(?=4)|6(?=5)|7(?=6)|8(?=7)|9(?=8)){4})(?![9]{5})(?![8]{5})(?![7]{5})(?![6]{5})(?![5]{5})(?![4]{5})(?![3]{5})(?![2]{5})(?![0]{5})(?!([\d])\1{5,20})[6-9][\d]{5,20}$/
                    );
                    r !== e.target.defaultValue &&
                        (r.length >= 10 && r.length <= 20 ?
                            h.test(r) ||
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Mobile")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 0 && r.length < 10 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_MobileMin")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 20 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PhoneMax")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Mobile")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")));
                    break;
                case "Home Phone":
                case "घर का फ़ोन":
                case "வீட்டு போன்":
                case "ఇంటి ఫోన్":
                    var h = new RegExp(
                        /^(?!(?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=0)){4})(?!(?:0(?=9)|1(?=0)|2(?=1)|3(?=2)|4(?=3)|5(?=4)|6(?=5)|7(?=6)|8(?=7)|9(?=8)){4})(?![9]{5})(?![8]{5})(?![7]{5})(?![6]{5})(?![5]{5})(?![4]{5})(?![3]{5})(?![2]{5})(?![0]{5})([0,2-9]{1}[0-9]{4,19})$/
                    );
                    r !== e.target.defaultValue &&
                        (r.length > 4 && r.length < 21 ?
                            1 == r.charAt(0) ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_HomePhone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            h.test(r) ||
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_HomePhone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 0 && r.length < 5 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PhoneMin")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 20 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PhoneMax")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_HomePhone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")));
                    break;
                case "Office Phone":
                case "कार्यालय का फ़ोन":
                case "அலுவலக போன்":
                case "ఆఫీస్ ఫోన్":
                    var h = new RegExp(
                        /^(?!(?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=0)){4})(?!(?:0(?=9)|1(?=0)|2(?=1)|3(?=2)|4(?=3)|5(?=4)|6(?=5)|7(?=6)|8(?=7)|9(?=8)){4})(?![9]{5})(?![8]{5})(?![7]{5})(?![6]{5})(?![5]{5})(?![4]{5})(?![3]{5})(?![2]{5})(?![0]{5})([0,2-9]{1}[0-9]{4,19})$/
                    );
                    r !== e.target.defaultValue &&
                        (r.length > 4 && r.length < 21 ?
                            1 == r.charAt(0) ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_OffPhone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            h.test(r) ||
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_OffPhone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 0 && r.length < 5 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PhoneMin")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            r.length > 20 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PhoneMax")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_OffPhone")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")));
            }
        } else if (t.indexOf("disputeAddress_") >= 0) {
            var h = new RegExp(/^[a-zA-Z0-9,#,/\- ]{2,256}$/);
            (e.target.nextElementSibling.innerText = ""),
            $("#" + t)
                .removeClass("error")
                .addClass("ok"),
                e.target.nextElementSibling.classList.remove("error"),
                r !== e.target.defaultValue &&
                (r.length > 2 ?
                    h.test(r) ||
                    (e.target.nextElementSibling.append(localizedString("Dispute_Address")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        e.target.nextElementSibling.classList.add("error")) :
                    r.length > 0 && r.length < 4 ?
                    (e.target.nextElementSibling.append(localizedString("Dispute_NameLeng")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        e.target.nextElementSibling.classList.add("error")) :
                    (e.target.nextElementSibling.append(localizedString("Dispute_Address")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        e.target.nextElementSibling.classList.add("error")));
        } else if (t.indexOf("disputeEmailAddress_") >= 0) {
            var h = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9]+[\-]*[a-zA-Z0-9]\.)([a-zA-Z\-0-9]{2,9}\.){0,1}[a-zA-Z]{2,9}))$/);
            (document.getElementById(t).nextElementSibling.innnerText = ""),
            $("#" + t)
                .removeClass("error")
                .addClass("ok"),
                document.getElementById(t).nextElementSibling.classList.remove("error"),
                r.length >= 10 ?
                h.test(r) ||
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Email")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                r.length > 0 && r.length < 10 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_EmailMin")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Email")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error"));
        } else if (t.indexOf("inquiresDisputedAmt_") >= 0) {
            var h = new RegExp(/^[0-9]{0,9}$/);
            (document.getElementById(t).nextElementSibling.innerText = ""),
            $("#" + t)
                .removeClass("error")
                .addClass("ok"),
                document.getElementById(t).nextElementSibling.classList.remove("error"),
                r !== e.target.defaultValue &&
                (r.length > 0 ?
                    h.test(r) ||
                    (document.getElementById(t).nextElementSibling.append("Please enter a valid Enquiry Amount"),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")) :
                    (document.getElementById(t).nextElementSibling.append("Please enter a valid Enquiry Amount"),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")));
        } else if (
            t.indexOf("creditLimit_") >= 0 ||
            t.indexOf("sanctionedAmount_") >= 0 ||
            t.indexOf("currentbalance_") >= 0 ||
            t.indexOf("cashLimit_") >= 0 ||
            t.indexOf("amountOverdue_") >= 0 ||
            t.indexOf("emiAmount_") >= 0 ||
            t.indexOf("actualPaymentAmount_") >= 0 ||
            t.indexOf("valueOfColleteral_") >= 0 ||
            t.indexOf("writtenOffAmountTotal_") >= 0 ||
            t.indexOf("writtenOffAmountPrincipal_") >= 0 ||
            t.indexOf("settlementAmount_") >= 0
        ) {
            if (t.indexOf("currentbalance_") >= 0) var h = new RegExp(/^[0-9,-]{0,9}$/);
            else var h = new RegExp(/^[0-9,]{0,9}$/);
            if (
                ((document.getElementById(t).nextElementSibling.innerText = ""),
                    $("#" + t)
                    .removeClass("error")
                    .addClass("ok"),
                    document.getElementById(t).nextElementSibling.classList.remove("error"),
                    r !== e.target.defaultValue)
            )
                if (r.length > 0 && n.length <= u && 0 != r)
                    if (isNaN(n))
                        if (t.indexOf("sanctionedAmount_") >= 0) {
                            var g = e.target.offsetParent.firstElementChild.innerText.trim();
                            switch (g) {
                                case "High Credit":
                                    document.getElementById(t).nextElementSibling.append(localizedString("Dispute_HighCredit")),
                                        $("#" + t)
                                        .removeClass("ok")
                                        .addClass("error"),
                                        document.getElementById(t).nextElementSibling.classList.add("error");
                                    break;
                                case "Sanctioned Amount":
                                    document.getElementById(t).nextElementSibling.append(localizedString("Dispute_SanctionedAmt")),
                                        $("#" + t)
                                        .removeClass("ok")
                                        .addClass("error"),
                                        document.getElementById(t).nextElementSibling.classList.add("error");
                            }
                        } else
                            t.indexOf("creditLimit_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CreditLimit")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("currentbalance_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CurrentBal")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("cashLimit_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CashLimit")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("amountOverdue_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_AmountOverdue")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("emiAmount_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_EMIAmt")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("actualPaymentAmount_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PaymentAmt")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("valueOfColleteral_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CollateralValue")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("writtenOffAmountTotal_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WrittebOffAmt")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("writtenOffAmountPrincipal_") >= 0 ?
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WOAmtPrincipal")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error")) :
                            t.indexOf("settlementAmount_") >= 0 &&
                            (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_SettlementAmt")),
                                $("#" + t)
                                .removeClass("ok")
                                .addClass("error"),
                                document.getElementById(t).nextElementSibling.classList.add("error"));
            else if (h.test(r))
                (t.indexOf("writtenOffAmountTotal_") >= 0 || t.indexOf("writtenOffAmountPrincipal_") >= 0) &&
                ((document.getElementById("writtenOffAmountTotal_" + a[1]).nextElementSibling.innerText = ""),
                    document.getElementById("writtenOffAmountTotal_" + a[1]).nextElementSibling.classList.remove("error"),
                    (document.getElementById("writtenOffAmountPrincipal_" + a[1]).nextElementSibling.innerText = ""),
                    document.getElementById("writtenOffAmountPrincipal_" + a[1]).nextElementSibling.classList.remove("error"),
                    t.indexOf("writtenOffAmountTotal_") >= 0 &&
                    parseInt(r.replace(/,/g, "")) <
                    parseInt(
                        $("#writtenOffAmountPrincipal_" + a[1])
                        .val()
                        .replace(/,/g, "")
                    ) ?
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WOAmountLesser")), document.getElementById(t).nextElementSibling.classList.add("error")) :
                    t.indexOf("writtenOffAmountPrincipal_") >= 0 &&
                    parseInt(
                        $("#writtenOffAmountTotal_" + a[1])
                        .val()
                        .replace(/,/g, "")
                    ) < parseInt(r.replace(/,/g, "")) &&
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WOAmtGreater")), document.getElementById(t).nextElementSibling.classList.add("error")));
            else if (t.indexOf("sanctionedAmount_") >= 0) {
                var g = e.target.offsetParent.firstElementChild.innerText.trim();
                switch (g) {
                    case "High Credit":
                        document.getElementById(t).nextElementSibling.append(localizedString("Dispute_HighCredit")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error");
                        break;
                    case "Sanctioned Amount":
                        document.getElementById(t).nextElementSibling.append(localizedString("Dispute_SanctionedAmt")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error");
                }
            } else
                t.indexOf("creditLimit_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CreditLimit")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("currentbalance_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CurrentBal")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("cashLimit_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CashLimit")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("amountOverdue_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_AmountOverdue")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("emiAmount_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_EMIAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("actualPaymentAmount_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PaymentAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("valueOfColleteral_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CollateralValue")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("writtenOffAmountTotal_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WrittebOffAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("writtenOffAmountPrincipal_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WOAmtPrincipal")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("settlementAmount_") >= 0 &&
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_SettlementAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error"));
            else if (n.length > u)
                document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Max9digits")),
                $("#" + t)
                .removeClass("ok")
                .addClass("error"),
                document.getElementById(t).nextElementSibling.classList.add("error");
            else if (t.indexOf("sanctionedAmount_") >= 0) {
                var g = e.target.offsetParent.firstElementChild.innerText.trim();
                switch (g) {
                    case "High Credit":
                        document.getElementById(t).nextElementSibling.append(localizedString("Dispute_HighCredit")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error");
                        break;
                    case "Sanctioned Amount":
                        document.getElementById(t).nextElementSibling.append(localizedString("Dispute_SanctionedAmt")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classlocalizedStringList.add("error");
                }
            } else
                t.indexOf("creditLimit_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append("Dispute_CreditLimit"),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("currentbalance_") >= 0 && "" == $("#" + t).val() ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CurrentBal")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("cashLimit_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CashLimit")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("amountOverdue_") >= 0 && "" == $("#" + t).val() ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_AmountOverdue")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("emiAmount_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_EMIAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("actualPaymentAmount_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PaymentAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("valueOfColleteral_") >= 0 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_CollateralValue")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("writtenOffAmountTotal_") >= 0 && "" == $("#" + t).val() ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WrittebOffAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("writtenOffAmountPrincipal_") >= 0 && "" == $("#" + t).val() ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_WOAmtPrincipal")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                t.indexOf("settlementAmount_") >= 0 &&
                "" == $("#" + t).val() &&
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_SettlementAmt")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error"));
        } else if (t.indexOf("rateOfInterest_") >= 0) {
            var h = new RegExp(/^([\d]+)(?:\.([\d]{1,3}?))?$/);
            (document.getElementById(t).nextElementSibling.innerText = ""),
            $("#" + t)
                .removeClass("error")
                .addClass("ok"),
                document.getElementById(t).nextElementSibling.classList.remove("error"),
                r.length > 0 && r.length <= 8 && 0 != r ?
                isNaN(r.replace(/./g, "")) ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_ROI")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                h.test(r) ||
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_ROI")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                n.length > 8 ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Max8Digits")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_ROI")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error"));
        } else if (t.indexOf("repaymentTenure_") >= 0) {
            var h = new RegExp(/^[-1-9,][0-9,]*$/);
            (document.getElementById(t).nextElementSibling.innerText = ""),
            $("#" + t)
                .removeClass("error")
                .addClass("ok"),
                document.getElementById(t).nextElementSibling.classList.remove("error"),
                r !== e.target.defaultValue &&
                (r.length > 0 && r.length <= 3 ?
                    isNaN(r) ?
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_RepaymentTenure")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")) :
                    h.test(r) ||
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_RepaymentTenure")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")) :
                    r.length > 3 ?
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Max3Digits")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")) :
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_RepaymentTenure")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")));
        } else if (t.indexOf("dateOpened_") >= 0)
            (document.getElementById(t).parentElement.children[1].innerText = ""),
            document.getElementById(t).parentElement.children[1].classList.remove("error"),
            10 === r.length ?
            r !== e.target.defaultValue &&
            (convertDate(l) < i ?
                (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened1")),
                    document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== s && void 0 !== s && "" !== d && void 0 !== d && convertDate(r) > convertDate(s) && convertDate(r) > convertDate(d) ?
                (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened2")),
                    document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== s && void 0 !== s && convertDate(s) < convertDate(l) ?
                (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened3")),
                    document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== d && void 0 !== d && convertDate(l) > convertDate(d) ?
                (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened4")),
                    document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== c &&
                void 0 !== c &&
                convertDate(l) > convertDate(c) &&
                (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened5")),
                    document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")),
                "" !== s &&
                void 0 !== s &&
                $("#dateClosed_" + a[1])[0].value !== $("#dateClosed_" + a[1])[0].defaultValue &&
                ((document.getElementById("dateClosed_" + a[1]).parentElement.children[1].innerText = ""),
                    document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.remove("error"),
                    convertDate(s) < i ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed1")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== l && void 0 !== l && "" !== d && void 0 !== d && convertDate(l) > convertDate(s) && convertDate(d) > convertDate(s) ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed2")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== l && void 0 !== l && convertDate(s) < convertDate(l) ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed3")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== c && void 0 !== c && convertDate(s) > convertDate(c) ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed4")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== d &&
                    void 0 !== d &&
                    convertDate(s) < convertDate(d) &&
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed5")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error"))),
                "" !== d &&
                void 0 !== d &&
                $("#dateOFLastPayment_" + a[1])[0].value !== $("#dateOFLastPayment_" + a[1])[0].defaultValue &&
                ((document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].innerText = ""),
                    document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.remove("error"),
                    convertDate(d) < i ?
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay1")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== s && void 0 !== s && convertDate(s) < convertDate(d) ?
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay2")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== d && void 0 !== d && convertDate(l) > convertDate(d) ?
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay3")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== c &&
                    void 0 !== c &&
                    convertDate(d) > convertDate(c) &&
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay4")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")))) :
            (document.getElementById(t).parentElement.children[1].append("Please enter a valid Date Opened"),
                $("#" + t)
                .removeClass("ok")
                .addClass("error"),
                document.getElementById(t).parentElement.children[1].classList.add("error"));
        else if (t.indexOf("dateClosed_") >= 0)
            (document.getElementById(t).parentElement.children[1].innerText = ""),
            document.getElementById(t).parentElement.children[1].classList.remove("error"),
            10 === r.length ?
            r !== e.target.defaultValue &&
            (convertDate(s) < i ?
                (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed1")),
                    document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== l && void 0 !== l && "" !== d && void 0 !== d && convertDate(l) > convertDate(r) && convertDate(d) > convertDate(r) ?
                (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed2")),
                    document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== l && void 0 !== l && convertDate(s) < convertDate(l) ?
                (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed3")),
                    document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== c && void 0 !== c && convertDate(s) > convertDate(c) ?
                (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed4")),
                    document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== d &&
                void 0 !== d &&
                convertDate(s) < convertDate(d) &&
                (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed5")),
                    document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")),
                "" !== l &&
                void 0 !== l &&
                $("#dateOpened_" + a[1])[0].value !== $("#dateOpened_" + a[1])[0].defaultValue &&
                ((document.getElementById("dateOpened_" + a[1]).parentElement.children[1].innerText = ""),
                    document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.remove("error"),
                    convertDate(l) < i ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened1")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== s && void 0 !== s && "" !== d && void 0 !== d && convertDate(l) > convertDate(s) && convertDate(l) > convertDate(d) ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened2")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== s && void 0 !== s && convertDate(s) < convertDate(l) ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened3")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== d && void 0 !== d && convertDate(l) > convertDate(d) ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened4")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== c &&
                    void 0 !== c &&
                    convertDate(l) > convertDate(c) &&
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened5")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error"))),
                "" !== d &&
                void 0 !== d &&
                $("#dateOFLastPayment_" + a[1])[0].value !== $("#dateOFLastPayment_" + a[1])[0].defaultValue &&
                ((document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].innerText = ""),
                    document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.remove("error"),
                    convertDate(d) < i ?
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay1")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== s && void 0 !== s && convertDate(s) < convertDate(d) ?
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay2")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== d && void 0 !== d && convertDate(l) > convertDate(d) ?
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay3")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== c &&
                    void 0 !== c &&
                    convertDate(d) > convertDate(c) &&
                    (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay4")),
                        document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")))) :
            "" != r &&
            (document.getElementById(t).parentElement.children[1].append("Please enter a valid Date Closed"),
                $("#" + t)
                .removeClass("ok")
                .addClass("error"),
                document.getElementById(t).parentElement.children[1].classList.add("error"));
        else if (t.indexOf("dateOFLastPayment_") >= 0)
            (document.getElementById(t).parentElement.children[1].innerText = ""),
            document.getElementById(t).parentElement.children[1].classList.remove("error"),
            10 === r.length ?
            r !== e.target.defaultValue &&
            (convertDate(d) < i ?
                (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay1")),
                    document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== s && void 0 !== s && convertDate(s) < convertDate(d) ?
                (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay2")),
                    document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== d && void 0 !== d && convertDate(l) > convertDate(d) ?
                (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay3")),
                    document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")) :
                "" !== c &&
                void 0 !== c &&
                convertDate(d) > convertDate(c) &&
                (document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateLastPay4")),
                    document.getElementById("dateOFLastPayment_" + a[1]).parentElement.children[1].classList.add("error")),
                "" !== s &&
                void 0 !== s &&
                $("#dateClosed_" + a[1])[0].value !== $("#dateClosed_" + a[1])[0].defaultValue &&
                ((document.getElementById("dateClosed_" + a[1]).parentElement.children[1].innerText = ""),
                    document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.remove("error"),
                    convertDate(s) < i ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed1")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== l && void 0 !== l && "" !== d && void 0 !== d && convertDate(l) > convertDate(s) && convertDate(d) > convertDate(s) ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed2")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== l && void 0 !== l && convertDate(s) < convertDate(l) ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed3")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== c && void 0 !== c && convertDate(s) > convertDate(c) ?
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed4")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== d &&
                    void 0 !== d &&
                    convertDate(s) < convertDate(d) &&
                    (document.getElementById("dateClosed_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateClosed5")),
                        document.getElementById("dateClosed_" + a[1]).parentElement.children[1].classList.add("error"))),
                "" !== l &&
                void 0 !== l &&
                $("#dateOpened_" + a[1])[0].value !== $("#dateOpened_" + a[1])[0].defaultValue &&
                ((document.getElementById("dateOpened_" + a[1]).parentElement.children[1].innerText = ""),
                    document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.remove("error"),
                    convertDate(l) < i ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened1")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== s && void 0 !== s && "" !== d && void 0 !== d && convertDate(l) > convertDate(s) && convertDate(l) > convertDate(d) ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened2")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== s && void 0 !== s && convertDate(s) < convertDate(l) ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened3")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== d && void 0 !== d && convertDate(l) > convertDate(d) ?
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened4")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")) :
                    "" !== c &&
                    void 0 !== c &&
                    convertDate(l) > convertDate(c) &&
                    (document.getElementById("dateOpened_" + a[1]).parentElement.children[1].append(localizedString("Dispute_DateOpened5")),
                        document.getElementById("dateOpened_" + a[1]).parentElement.children[1].classList.add("error")))) :
            (document.getElementById(t).parentElement.children[1].append("Please enter a valid Date Of LastPayment"),
                $("#" + t)
                .removeClass("ok")
                .addClass("error"),
                document.getElementById(t).parentElement.children[1].classList.add("error"));
        else if (t.indexOf("paymentStatus") >= 0) {
            var h = new RegExp(/^([0-8]{1}[0-9]{2}|STD|std|DBT|dbt|LSS|lss|SUB|sub|XXX|xxx|###|SMA|sma|[0-9]{1}[0]{2}|[0-9]{1}|[0-9]{2}|{0-9}{3})$/);
            (document.getElementById(t).nextElementSibling.innerText = ""),
            $("#" + t)
                .removeClass("error")
                .addClass("ok"),
                document.getElementById(t).nextElementSibling.classList.remove("error"),
                r.length > 0 && r.length <= 3 ?
                h.test(r) ||
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PaymentStatus")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PaymentStatus")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error"));
        } else if (t.indexOf("disputeName_") >= 0) {
            var h = new RegExp(/^([S/O|S\\O|D/O|D\\O|F/O|F\\O|W/O|W\\O][ .])*((.*[a-zA-Z]){3}[a-zA-Z\'.:;_(){}<>`"[\]\s]*)$/);
            (document.getElementById(t).nextElementSibling.innerText = ""),
            document.getElementById(t).nextElementSibling.classList.remove("error"),
                r.length >= 3 ?
                h.test(r) ||
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_NameRegex")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                1 == r.length || 2 == r.length ?
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_NameLeng")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error")) :
                "" == r.length &&
                (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_NameRegex")),
                    $("#" + t)
                    .removeClass("ok")
                    .addClass("error"),
                    document.getElementById(t).nextElementSibling.classList.add("error"));
        } else if (t.indexOf("disputeidentification_") >= 0) {
            var v = e.target.offsetParent.innerText.trim(),
                y = v.split(" ")[0];
            switch (
                ((document.getElementById(t).nextElementSibling.innerText = ""),
                    $("#" + t)
                    .removeClass("error")
                    .addClass("ok"),
                    document.getElementById(t).nextElementSibling.classList.remove("error"),
                    y)
            ) {
                case "Voter":
                case "वोटर":
                case "வாக்காளர்":
                case "ఓటర్":
                    var h = new RegExp(/^((([a-zA-Z][ ,\/,-]*){2})(([0-9][ ,\/,-]*){7,28})|(([a-zA-Z][ ,\/,-]*){3})(([0-9][ ,\/,-]*){6,27}))$/),
                        b = r.length > 0 ? r.replace(/[ ,\\/,;\-"'{}|]/gi, "") : "";
                    b.length > 0 && b.length < u ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_VoterMin1") + u + localizedString("Dispute_VoterMin2")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        b.length > 8 && b.length < 31 ?
                        h.test(b) ||
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Voter")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        b.length > 30 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_VoterMax")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Voter")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error"));
                    break;
                case "Passport":
                case "पासपोर्ट":
                case "பாஸ்போர்ட்":
                case "పాస్పోర్ట్":
                    var h = new RegExp(/^((([a-zA-Z][ ,\\/,;\-"'{}|]*){1})([0-9][ ,\\/,;\-"'{}|]*){6,9})$/),
                        S = r.length > 0 ? r.replace(/[ ,\\/,;\-"'{}|]/gi, "") : "";
                    S.length > 0 && S.length < 7 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PassportMin")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        S.length > 6 && S.length < 11 ?
                        h.test(S) ||
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Passport")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        S.length > 10 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PassportMax")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Passport")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error"));
                    break;
                case "Income":
                case "आयकर":
                case "வருமான":
                case "ఆదాయ":
                    var h = new RegExp(/^((([a-zA-Z][ ,-\/]*){3})(([H|P|h|p][ ,-\/]*){1})(([a-zA-Z][ ,-\/]*){1})(([0-9][ ,-\/]*){4})(([a-zA-Z][ ,-\/]*){1})){1,10}$/),
                        w = r.length > 0 ? r.replace(/[ ,\\/,;\-"'{}|]/gi, "") : "";
                    10 == w.length ?
                        h.test(w) ||
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Pan")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        w.length > 0 && w.length < 10 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PanMin")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        w.length > 30 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PanMax")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Pan")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error"));
                    break;
                case "Driver's":
                case "ड्राइविंग":
                case "ஓட்டுனர்":
                case "డ్రైవర్":
                    var h = new RegExp(/^[a-zA-Z0-9 '.`"-|\\\\/:;_(){}<>~!#$%^&*=]{2,30}$/);
                    2 <= r.length && r.length <= 30 ?
                        h.test(r) ||
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_License")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        r.length > 0 && r.length < 2 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_LicenseMin")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        r.length > 30 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PanMax")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_License")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error"));
                    break;
                case "Ration":
                case "राशन":
                case "ரேஷன்":
                case "రేషన్":
                    var h = new RegExp(/^[a-zA-Z0-9 '.`"-|\\\\/:;_(){}<>~!#$%^&*=]{2,30}$/);
                    2 <= r.length && r.length <= 30 ?
                        h.test(r) ||
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Ration")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        r.length > 0 && r.length < 2 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_LicenseMin")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        r.length > 30 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_PanMax")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Ration")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error"));
                    break;
                case "Aadhaar":
                case "आधार":
                case "ஆதார்":
                case "ఆధార్":
                    var h = new RegExp(/^[0-9]{12}$/),
                        C = r.length > 0 ? r.replace(/[ ,\\/,;\-"'{}|]/gi, "") : "";
                    12 == C.length ?
                        h.test(C) ||
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Aadhar")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        C.length > 0 && C.length < 12 ?
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_AadharLen")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error")) :
                        (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Aadhar")),
                            $("#" + t)
                            .removeClass("ok")
                            .addClass("error"),
                            document.getElementById(t).nextElementSibling.classList.add("error"));
            }
        } else if (t.indexOf("Income_") >= 0) {
            var h = new RegExp(/^[-0-9,]{0,9}$/);
            (document.getElementById(t).nextElementSibling.innerText = ""),
            $("#" + t)
                .removeClass("error")
                .addClass("ok"),
                document.getElementById(t).nextElementSibling.classList.remove("error"),
                r !== e.target.defaultValue &&
                (r.length > 0 && n.length <= u && 0 != r ?
                    h.test(n) ||
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_Income")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")) :
                    n.length > u &&
                    (document.getElementById(t).nextElementSibling.append(localizedString("Dispute_IncomeMax") + u + localizedString("Dispute_digits")),
                        $("#" + t)
                        .removeClass("ok")
                        .addClass("error"),
                        document.getElementById(t).nextElementSibling.classList.add("error")));
        }
        "undefined" !== $("#" + t)[0].dataset.membername &&
            "SBI" === $("#" + t)[0].dataset.membername &&
            ((iCountSplit = t.split("_")),
                ($("#disputecity_" + iCountSplit[1]).nextAll()[2].innerText = ""),
                $("#disputecity_" + iCountSplit[1])
                .nextAll()[2]
                .classList.contains("error") ?
                $("#disputecity_" + iCountSplit[1])
                .nextAll()[2]
                .classList.remove("error") :
                "",
                checkForSBIDispute(e, iCountSplit[1]) && "" == $("#disputecity_" + iCountSplit[1]).val() ?
                ($("#disputecity_" + iCountSplit[1])
                    .nextAll()[2]
                    .append(localizedString("Dispute_State")),
                    $("#disputecity_" + iCountSplit[1])
                    .nextAll()[2]
                    .classList.add("error")) :
                "" !== $("#disputecity_" + iCountSplit[1]).val() &&
                (checkForSBIDispute(e, iCountSplit[1]) ||
                    ($("#disputecity_" + iCountSplit[1])
                        .nextAll()[2]
                        .append(localizedString("Dispute_StateSBI")),
                        $("#disputecity_" + iCountSplit[1])
                        .nextAll()[2]
                        .classList.add("error"))));
        var _ = $("#" + t)[0].defaultValue.replace(/,/g, ""),
            x = r.replace(/,/g, "");
        if (_ !== x)
            if (
                $("#" + t)
                .nextAll(".helper")
                .hasClass("error")
            ) {
                $("#" + t)
                    .next()
                    .removeClass("change")
                    .addClass("error");
                for (var P = 0; P < $(".helper").length; P++) $(".helper")[P].classList.contains("error") && $(".helper")[P].closest(".wrapperSection").classList.add("errorTrigger");
            } else
                $("#" + t)
                .removeClass("error")
                .addClass("change"),
                $("#" + t)
                .closest(".wrapperSection")
                .removeClass("errorTrigger");
        else if ("undefined" != $(".helper").length && $(".helper").length > 0)
            for (var P = 0; P < $(".helper").length; P++)
                $(".helper")[P].classList.contains("error") ?
                $(".helper")[P].closest(".wrapperSection").classList.add("errorTrigger") :
                ($("#" + t)
                    .next()
                    .removeClass("change error")
                    .addClass("noChange"),
                    $("input.noChange").parents(".wrapperSection").removeClass("errorTrigger"));
        showErrorMessage(t);
    }
}

function dateConvertorForDatePicker(e) {
    if ("" != e && void 0 != e && "-" != e) {
        var t = e.split("/");
        return t[0] + "-" + t[1] + "-" + t[2];
    }
    return "";
}


function scoreSimLogOut() {
    void 0 == sessionStorage.clickcount && (sessionStorage.clickcount = 0);
    var e = "Post Login – Score Simulator Section",
        t = e + " - User Score Simulation Count";
    generalGATracking(e, t, t + " - " + sessionStorage.clickcount),
        sessionStorage.removeItem("clickcount"),
        localStorage.removeItem("firstVisit"),
        sessionStorage.removeItem("userLangPref"),
        sessionStorage.removeItem("userLang"),
        sessionStorage.removeItem("SESSION_REAL_TIME_DISPUTE"),
        sessionStorage.removeItem("SESSION_REAL_TIME_DISPUTE_SUMMARY"),
        sessionStorage.removeItem("SESSION_REAL_TIME_DISPUTE_SUMMARY_RELOAD"),
        sessionStorage.removeItem("SESSION_PROMO_CODE_ID"),
        sessionStorage.removeItem("popupVisit");
}

function startIdleTimer() {
    idleSecondsCounter++,
    notIdleSecondsCounter++,
    sessionIdleSecondCounter++,
    idleSecondsCounter >= idleTimeoutPromptSeconds && ((notIdleSecondsCounter = 0), promptToExtendSession()),
        idleSecondsCounter >= idleTimeoutSeconds &&
        ((idleSecondsCounter = 0),
            scoreSimLogOut(),
            "ATLASSSO" === enterpriseName || "DIGILOCKER" === enterpriseName || "ICICIBANK" == currentEnterprise() ?
            (document.location.href = "/CreditView/ssologout.page?enterprise=" + enterpriseName + "&timeExceeded=true") :
            (document.location.href = "/CreditView/logout.page?enterprise=" + enterpriseName + "&timeExceeded=true")),
        sessionIdleSecondCounter >= sessionIdleTimeoutInSeconds &&
        ((sessionIdleSecondCounter = 0),
            scoreSimLogOut(),
            "ATLASSSO" === enterpriseName || "DIGILOCKER" === enterpriseName || "ICICIBANK" == currentEnterprise() ?
            (document.location.href = "/CreditView/ssologout.page?enterprise=" + enterpriseName + "&session=false") :
            (document.location.href = "/CreditView/logout.page?enterprise=" + enterpriseName + "&session=false"));
}


function checkForSBIDispute(e, t) {
    var r = !1;
    if ("-" !== $("#disputeOwnerShip_" + t)[0].innerText && "0" !== $("#disputeOwnerShip_" + t)[0].innerText && $("#disputeOwnerShip_" + t).val() !== $("#disputeOwnerShip_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#disputeAccountType_" + t)[0].innerText && "0" !== $("#disputeAccountType_" + t)[0].innerText && $("#disputeAccountType_" + t).val() !== $("#disputeAccountType_" + t)[0].defaultValue) return (r = !0);
    if (
        "-" !== $("#creditLimit_" + t)[0].innerText &&
        "0" !== $("#creditLimit_" + t)[0].innerText &&
        $("#creditLimit_" + t)
        .val()
        .replace(/,/g, "") !== $("#creditLimit_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if (
        "-" !== $("#sanctionedAmount_" + t)[0].innerText &&
        "0" !== $("#sanctionedAmount_" + t)[0].innerText &&
        $("#sanctionedAmount_" + t)
        .val()
        .replace(/,/g, "") !== $("#sanctionedAmount_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if (
        "-" !== $("#currentbalance_" + t)[0].innerText &&
        "0" !== $("#currentbalance_" + t)[0].innerText &&
        $("#currentbalance_" + t)
        .val()
        .replace(/,/g, "") !== $("#currentbalance_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if (
        "-" !== $("#cashLimit_" + t)[0].innerText &&
        "0" !== $("#cashLimit_" + t)[0].innerText &&
        $("#cashLimit_" + t)
        .val()
        .replace(/,/g, "") !== $("#cashLimit_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if (
        "-" !== $("#amountOverdue_" + t)[0].innerText &&
        "0" !== $("#amountOverdue_" + t)[0].innerText &&
        $("#amountOverdue_" + t)
        .val()
        .replace(/,/g, "") !== $("#amountOverdue_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if ("-" !== $("#rateOfInterest_" + t)[0].innerText && "0" !== $("#rateOfInterest_" + t)[0].innerText && $("#rateOfInterest_" + t).val() !== $("#rateOfInterest_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#repaymentTenure_" + t)[0].innerText && "0" !== $("#repaymentTenure_" + t)[0].innerText && $("#repaymentTenure_" + t).val() !== $("#repaymentTenure_" + t)[0].defaultValue) return (r = !0);
    if (
        "-" !== $("#emiAmount_" + t)[0].innerText &&
        "0" !== $("#emiAmount_" + t)[0].innerText &&
        $("#emiAmount_" + t)
        .val()
        .replace(/,/g, "") !== $("#emiAmount_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if ("-" !== $("#paymentFrequency_" + t)[0].innerText && "0" !== $("#paymentFrequency_" + t)[0].innerText && $("#paymentFrequency_" + t).val() !== $("#paymentFrequency_" + t)[0].defaultValue) return (r = !0);
    if (
        "-" !== $("#actualPaymentAmount_" + t)[0].innerText &&
        "0" !== $("#actualPaymentAmount_" + t)[0].innerText &&
        $("#actualPaymentAmount_" + t)
        .val()
        .replace(/,/g, "") !== $("#actualPaymentAmount_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if ("-" !== $("#dateOpened_" + t)[0].innerText && "0" !== $("#dateOpened_" + t)[0].innerText && $("#dateOpened_" + t).val() !== $("#dateOpened_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#dateClosed_" + t)[0].innerText && "0" !== $("#dateClosed_" + t)[0].innerText && $("#dateClosed_" + t).val() !== $("#dateClosed_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#dateOFLastPayment_" + t)[0].innerText && "0" !== $("#dateOFLastPayment_" + t)[0].innerText && $("#dateOFLastPayment_" + t).val() !== $("#dateOFLastPayment_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#valueOfColleteral_" + t)[0].innerText && "0" !== $("#valueOfColleteral_" + t)[0].innerText && $("#valueOfColleteral_" + t).val() !== $("#valueOfColleteral_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#typeOfColleteral_" + t)[0].innerText && "0" !== $("#typeOfColleteral_" + t)[0].innerText && $("#typeOfColleteral_" + t).val() !== $("#typeOfColleteral_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#suitFiles_" + t)[0].innerText && "0" !== $("#suitFiles_" + t)[0].innerText && $("#suitFiles_" + t).val() !== $("#suitFiles_" + t)[0].defaultValue) return (r = !0);
    if ("-" !== $("#writtenOffStatus_" + t)[0].innerText && "0" !== $("#writtenOffStatus_" + t)[0].innerText && $("#writtenOffStatus_" + t).val() !== $("#writtenOffStatus_" + t)[0].defaultValue) return (r = !0);
    if (
        "-" !== $("#writtenOffAmountTotal_" + t)[0].innerText &&
        "0" !== $("#writtenOffAmountTotal_" + t)[0].innerText &&
        $("#writtenOffAmountTotal_" + t)
        .val()
        .replace(/,/g, "") !== $("#writtenOffAmountTotal_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if (
        "-" !== $("#writtenOffAmountPrincipal_" + t)[0].innerText &&
        "0" !== $("#writtenOffAmountPrincipal_" + t)[0].innerText &&
        $("#writtenOffAmountPrincipal_" + t)
        .val()
        .replace(/,/g, "") !== $("#writtenOffAmountPrincipal_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    if (
        "-" !== $("#settlementAmount_" + t)[0].innerText &&
        "0" !== $("#settlementAmount_" + t)[0].innerText &&
        $("#settlementAmount_" + t)
        .val()
        .replace(/,/g, "") !== $("#settlementAmount_" + t)[0].defaultValue.replace(/,/g, "")
    )
        return (r = !0);
    var n;
    n = $("[id^='paymentStatus'][id$=" + t + "]");
    for (var a = 0; a < n.length; a++)
        if (n[a].value.toUpperCase() !== n[a].defaultValue.toUpperCase()) return (r = !0);
    return r;
}

function earliestDateOpened() {
    var e = convertDate($("#dateOpened_0")[0].value);
    return (
        document.querySelectorAll("[id^='dateOpened_']").forEach(function(t) {
            convertDate(t.value) < e && (e = convertDate(t.value));
        }),
        e
    );
}

function getSelectedValue(e) {
    return $("#" + e)
        .find("dt a span.value")
        .html();
}

function setSelectedValue() {
    $(".dropdown dt a span").html('<span id="dropdown-image"></span>Credit Card <span class="value">CreditCard</span>'), $(".dropdown dd ul").hide();
}

function populateTable(e) {
    for (
        var t = new Array(), r = $('<tr onclick="showMoreDetails(this)" data-tuiUrl="' + e.TUIURL + '" data-partnerName="' + e.PartnerName + '" data-product="' + e.Product + '" data-premium="' + e.Premium + '"></tr>'), n = 0; n < displayCol.length; n++
    ) {
        var a = "";
        "PartnerName" === displayCol[n] && (a = '<img class="card-image" src="' + e.OfferLogoId + '" alt="IMAGE"><br>');
        var i = void 0 === e[displayCol[n]] ? 0 : e[displayCol[n]],
            o = "";
        if (void 0 === e[displayCol[n]]) o = "_";
        else if ("A3" == displayCol[n] || "A2" == displayCol[n]) {
            var s = e[displayCol[n]].split(" ");
            o = "Rs" == s[0] ? "₹" + Number(s[1]).toLocaleString("en-IN") : "%" == s[1] ? s[0] + "%" : e[displayCol[n]];
        } else o = "PartnerName" == displayCol[n] ? ("CIBIL" == currentEnterprise() ? e[displayCol[n]] : "") : e[displayCol[n]];
        var l = $('<td style="width:170px" class="lineimage" data-order=' + i + ">" + a + o + "</td>");
        r.append(l);
    }
    return appendApplyButton(e, r), r.append(), t.push(r), t;
}

function populateMobileData(e, t) {
    if (e.Product === t && window.matchMedia("(max-width: 768px)").matches) {
        var r = $('<table class="table tablenew-mobile">'),
            n = $('<tr onclick="showMoreDetailsOnMobile(this)" data-tuiUrl="' + e.TUIURL + '" data-partnerName="' + e.PartnerName + '" data-product="' + e.Product + '"></tr>'),
            a = $("<td></td>");
        a.html(' <div><img class="card-image-mobile" src="' + e.OfferLogoId + ' "> </div>');
        var i = $("<td></td>"),
            o = "";
        (o = "CIBIL" == currentEnterprise() ? e.PartnerName + "<br><br>" : ""),
        i.html(
                '<div class="m-caption">' +
                o +
                '<a href="javascript:void(0);" style="display:block" class="modal-trigger detail-icon" data-modal="more-details" data-product="' +
                e.Product +
                '" onclick="triggerGTM(event);">' +
                localizedString("DE_MoreDetails") +
                "</a></b></div>"
            ),
            n.append(a),
            n.append(i),
            appendApplyButtonMobile(e, n);
        var s = $("<tr></tr>"),
            l = $("<td colspan=3></td>"),
            d = $('<table class="m-data" cellspacing="0">'),
            c = null;
        c = "CreditCard" === e.Product ? createMobileDataHeader() : createMobileDataHeader_NonCredit();
        var u = $("<tr></tr>"),
            p = "";
        p = void 0 === e.A3 ? "-" : "Rs" == e.A3.split(" ")[0] ? "₹" + Number(e.A3.split(" ")[1]).toLocaleString("en-IN") : "%" == e.A3.split(" ")[1] ? e.A3.split(" ")[0] + "%" : e.A3;
        var h = "";
        (h = void 0 === e.A2 ? "-" : "Rs" == e.A2.split(" ")[0] ? "₹" + Number(e.A2.split(" ")[1]).toLocaleString("en-IN") : "%" == e.A2.split(" ")[1] ? e.A2.split(" ")[0] + "%" : e.A2),
        u.append("<td><div>" + p + "</div></td>"),
            u.append("<td><div>" + (void 0 === e.A4 ? "-" : e.A4) + "</div></td>"),
            "CreditCard" !== e.Product && u.append('<td><div style="border:none">' + (void 0 === e.InterestType ? "-" : e.InterestType) + "</div></td>"),
            u.append("<td><div>" + h + "</div></td>"),
            d.append(c),
            d.append(u),
            l.append(d),
            s.append(l),
            r.append(n),
            r.append(s);
        var f = $("<tr></tr>"),
            m = $('<td style="border:none"></td>');
        return m.append(r), f.append(m), f;
    }
}

function appendApplyButton(e, t) {
    var r = $("<td></td>");
    r.html(
            '<button href="javascript:void(0);" id="apply-button-de" class="button modal-trigger detail-icon" data-modal="apply-now" data-product="' +
            e.Product +
            '" onclick="triggerGTM(event);">' +
            localizedString("DE_Apply") +
            '<span class="play-circle" id="apply-glyph"></span></button><a href="javascript:void(0);" style="display:block" class="modal-trigger detail-icon" data-modal="more-details" data-product="' +
            e.Product +
            '" onclick="triggerGTM(event);">' +
            localizedString("DE_MoreDetails") +
            "</a>"
        ),
        t.append(r);
}

function appendApplyButtonMobile(e, t) {
    var r = $("<td></td>");
    r.html(
            '<button href="javascript:void(0);" class="button modal-trigger detail-icon" data-modal="apply-now"  data-product="' +
            e.Product +
            '" onclick="triggerGTM(event);">' +
            localizedString("DE_Apply") +
            '<span class="play-circle" id="apply-glyph"></span></button>'
        ),
        t.append(r);
}

function createMobileDataHeader() {
    var e = $("<tr></tr>");
    return (
        e.append("<th><div>" + localizedString("DE_Tentativecreditlimitoffered") + "</div></th>"),
        e.append("<th><div>" + localizedString("DE_Monthlyinterestrate") + "</div></th>"),
        e.append("<th><div>" + localizedString("DE_Annualfees") + "</div></th>"),
        e
    );
}

function createMobileDataHeader_NonCredit() {
    var e = $("<tr></tr>");
    return (
        e.append("<th><div>" + localizedString("DE_Loanupto") + "</div></th>"),
        e.append("<th><div>" + localizedString("DE_Interestrate") + "</div></th>"),
        e.append("<th><div>" + localizedString("DE_Interesttype") + "</div></th>"),
        e.append("<th><div>" + localizedString("DE_Processingfeesupto") + "</div></th>"),
        e
    );
}

function sortClicked(e, t, r) {
    var n = t.children[1];
    $(".sortText").html("");
    var a = "";
    $(n).hasClass("glyphicons-chevron-down") ?
        ($(n).removeClass("glyphicons-chevron-down"), $(n).addClass("glyphicons-chevron-up"), (a = "[ Low to High ]"), (r = !0), ("PartnerName" !== e && "InterestType" !== e) || (a = "[ Z to A ]")) :
        ($(n).removeClass("glyphicons-chevron-up"), $(n).addClass("glyphicons-chevron-down"), (a = "[ High to Low ]"), (r = !1), ("PartnerName" !== e && "InterestType" !== e) || (a = "[ A to Z ]")),
        $(n).find("div").html(a);
    var i = getSelectedValue("sample");
    offersObj.Offers.sort(function(t, n) {
            if ("Amount" == e || "InterestRate" == e || "ProcessingFee" == e) {
                var a = t[e],
                    i = n[e];
                return isNaN(parseInt(a)) && (a = 0), isNaN(parseInt(i)) && (i = 0), r ? (parseInt(a) === parseInt(i) ? 0 : parseInt(a) > parseInt(i) ? 1 : -1) : parseInt(a) === parseInt(i) ? 0 : parseInt(a) < parseInt(i) ? 1 : -1;
            }
            return r ? (t[e] === n[e] ? 0 : t[e] > n[e] ? 1 : -1) : t[e] === n[e] ? 0 : t[e] < n[e] ? 1 : -1;
        }),
        $("#offersTableBodyMobile").html(""),
        offersObj.Offers.forEach(function(e) {
            $("#offersTableBodyMobile").append(populateMobileData(e, i));
        }),
        $(".sortOptions").children().css({ "background-color": "#f6f6f6", color: "#000" }),
        $(t).css({ "background-color": "#1b7996", color: "#ffff" }),
        $(t).children().show();
}

function showMoreDebtDetails(e) {
    $(".model-wrapper-heading").text(e.dataset.partnername),
        $(".model-wrapper-heading").closest("div").find("input,button").attr("data-product", e.dataset.product).attr("offerUrl", e.dataset.tuiurl),
        window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " Section",
            eventAction: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " Section - Debt Settlement Offers",
            eventLabel: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " Section - Settle This Debt Click",
        });
    for (var t = 0; t < offersObj.DebtSettlements.length; t++) {
        var r = offersObj.DebtSettlements[t].TUIURL.replace(/amp;/g, "");
        if (r === e.dataset.tuiurl && offersObj.DebtSettlements[t].PartnerName === e.dataset.partnername && offersObj.DebtSettlements[t].Product === e.dataset.product) {
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Benefits") + "</strong></h3>";
            offersObj.DebtSettlements[t].B1 && (n += '<li class="ol-heading">' + offersObj.DebtSettlements[t].B1 + "</li>"),
                offersObj.DebtSettlements[t].B2 && (n += '<li class="ol-heading">' + offersObj.DebtSettlements[t].B2 + "</li>"),
                offersObj.DebtSettlements[t].B3 && (n += '<li class="ol-heading">' + offersObj.DebtSettlements[t].B3 + "</li>"),
                offersObj.DebtSettlements[t].B4 && (n += '<li class="ol-heading">' + offersObj.DebtSettlements[t].B4 + "</li>"),
                offersObj.DebtSettlements[t].B1 || offersObj.DebtSettlements[t].B2 || offersObj.DebtSettlements[t].B3 || offersObj.DebtSettlements[t].B4 || (n += '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
                $(".debt-benifits-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Requireddocuments") + "</strong></h3>";
            offersObj.DebtSettlements[t].D1 && (n += '<li class="ol-reqdoc">' + offersObj.DebtSettlements[t].D1 + "</li>"),
                offersObj.DebtSettlements[t].D2 && (n += '<li class="ol-reqdoc">' + offersObj.DebtSettlements[t].D2 + "</li>"),
                offersObj.DebtSettlements[t].D3 && (n += '<li class="ol-reqdoc">' + offersObj.DebtSettlements[t].D3 + "</li>"),
                offersObj.DebtSettlements[t].D1 || offersObj.DebtSettlements[t].D2 || offersObj.DebtSettlements[t].D3 || (n += '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
                $(".debt-documents-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Fees") + "</strong></h3>";
            offersObj.DebtSettlements[t].F1 && (n += '<li class="ol-fee">' + offersObj.DebtSettlements[t].F1 + "</li>"),
                offersObj.DebtSettlements[t].F2 && (n += '<li class="ol-fee">' + offersObj.DebtSettlements[t].F2 + "</li>"),
                offersObj.DebtSettlements[t].F1 || offersObj.DebtSettlements[t].F2 || (n += '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
                $(".debt-fees-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Downloads") + "</strong></h3>";
            (n += offersObj.DebtSettlements[t].OfferTNCPdfId ?
                '<li class="ol-download"><a href="' +
                offersObj.DebtSettlements[t].OfferTNCPdfId +
                '" target="_blank" data-product="' +
                e.dataset.product +
                '" onclick="trackGA(event);" download>' +
                localizedString("DE_OfferTermsandConditions") +
                "</a></li>" :
                '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
            $(".debt-downloads-list").html(n);
            break;
        }
    }
}

function applyDebt(e) {
    event.preventDefault(),
        event.stopPropagation(),
        window.open($("#debt-terms-cond-apply").attr("offerUrl"), "_blank"),
        $("#modals").css("display", "none"),
        $('div[data-modal="settle-debt"]').css("display", "none"),
        window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login - Debt Settlement Section",
            eventAction: "Post Login - Debt Settlement Section - Terms & Conditions Subsection",
            eventLabel: "Post Login - Debt Settlement Section - Terms & Conditions Subsection - Accept & Continue Click",
        });
}

function debtSuccessApply(e) {
    $(".debtSettled-success").hide(), $("#modals").hide();
}

function showMoreDetails(e) {
    $(".model-wrapper-heading").text(e.dataset.partnername), $(".model-wrapper-heading").closest("div").find("input,button").attr("data-product", e.dataset.product).attr("offerUrl", e.dataset.tuiurl);
    for (var t = 0; t < offersObj.Offers.length; t++) {
        var r = offersObj.Offers[t].TUIURL.replace(/amp;/g, "");
        if (r === e.dataset.tuiurl && offersObj.Offers[t].PartnerName === e.dataset.partnername && offersObj.Offers[t].Product === e.dataset.product) {
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Benefits") + "</strong></h3>";
            offersObj.Offers[t].B1 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B1 + "</li>"),
                offersObj.Offers[t].B2 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B2 + "</li>"),
                offersObj.Offers[t].B3 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B3 + "</li>"),
                offersObj.Offers[t].B4 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B4 + "</li>"),
                offersObj.Offers[t].B1 || offersObj.Offers[t].B2 || offersObj.Offers[t].B3 || offersObj.Offers[t].B4 || (n += '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
                $(".benifits-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Requireddocuments") + "</strong></h3>";
            offersObj.Offers[t].D1 && (n += '<li class="ol-reqdoc">' + offersObj.Offers[t].D1 + "</li>"),
                offersObj.Offers[t].D2 && (n += '<li class="ol-reqdoc">' + offersObj.Offers[t].D2 + "</li>"),
                offersObj.Offers[t].D3 && (n += '<li class="ol-reqdoc">' + offersObj.Offers[t].D3 + "</li>"),
                offersObj.Offers[t].D1 || offersObj.Offers[t].D2 || offersObj.Offers[t].D3 || (n += '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
                $(".documents-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Fees") + "</strong></h3>";
            offersObj.Offers[t].F1 && (n += '<li class="ol-fee">' + offersObj.Offers[t].F1 + "</li>"),
                offersObj.Offers[t].F2 && (n += '<li class="ol-fee">' + offersObj.Offers[t].F2 + "</li>"),
                offersObj.Offers[t].F1 || offersObj.Offers[t].F2 || (n += '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
                $(".fees-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">' + localizedString("DE_Downloads") + "</strong></h3>";
            (n += offersObj.Offers[t].OfferTNCPdfId ?
                '<li class="ol-download"><a href="' +
                offersObj.Offers[t].OfferTNCPdfId +
                '" target="_blank" data-product="' +
                e.dataset.product +
                '" onclick="trackGA(event);" download>' +
                localizedString("DE_OfferTermsandConditions") +
                "</a></li>" :
                '<li class="grayedout"> ' + localizedString("DE_NotAvailable") + " </li>"),
            $(".downloads-list").html(n);
            break;
        }
    }
}

function showMoreDetailsOnMobile(e) {
    $(".model-wrapper-heading").text(e.dataset.partnername),
        $(".model-wrapper-heading").data("data-product", e.dataset.product),
        $(".model-wrapper-heading").closest("div").find("input,button").attr("data-product", e.dataset.product).attr("offerUrl", e.dataset.tuiurl);
    for (var t = 0; t < offersObj.Offers.length; t++) {
        var r = offersObj.Offers[t].TUIURL.replace(/amp;/g, "");
        if (r === e.dataset.tuiurl && offersObj.Offers[t].PartnerName === e.dataset.partnername && offersObj.Offers[t].Product === e.dataset.product) {
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">Benefits</strong></h3>';
            offersObj.Offers[t].B1 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B1 + "</li>"),
                offersObj.Offers[t].B2 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B2 + "</li>"),
                offersObj.Offers[t].B3 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B3 + "</li>"),
                offersObj.Offers[t].B4 && (n += '<li class="ol-heading">' + offersObj.Offers[t].B4 + "</li>"),
                offersObj.Offers[t].B1 || offersObj.Offers[t].B2 || offersObj.Offers[t].B3 || offersObj.Offers[t].B4 || (n += '<li class="grayedout"> Not Available </li>'),
                $(".benifits-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">Required documents</strong></h3>';
            offersObj.Offers[t].D1 && (n += '<li class="ol-reqdoc">' + offersObj.Offers[t].D1 + "</li>"),
                offersObj.Offers[t].Document2 && (n += '<li class="ol-reqdoc">' + offersObj.Offers[t].D2 + "</li>"),
                offersObj.Offers[t].Document3 && (n += '<li class="ol-reqdoc">' + offersObj.Offers[t].D3 + "</li>"),
                offersObj.Offers[t].D1 || offersObj.Offers[t].D2 || offersObj.Offers[t].D3 || (n += '<li class="grayedout"> Not Available </li>'),
                $(".documents-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">Fees</strong></h3>';
            offersObj.Offers[t].F1 && (n += '<li class="ol-fee">' + offersObj.Offers[t].F1 + "</li>"),
                offersObj.Offers[t].F2 && (n += '<li class="ol-fee">' + offersObj.Offers[t].F2 + "</li>"),
                offersObj.Offers[t].F1 || offersObj.Offers[t].F2 || (n += '<li class="grayedout"> Not Available </li>'),
                $(".fees-list").html(n);
            var n = '<h3 style="margin-bottom: 5px;"><strong class="model-wrapper-sub-heading">Downloads</strong></h3>';
            (n += offersObj.Offers[t].OfferTNCPdfId ?
                '<li class="ol-download"><a href="' + offersObj.Offers[t].OfferTNCPdfId + '" target="_blank" data-product="' + e.dataset.product + '" onclick="trackGA(event);" download>Offer Terms and Conditions</a></li>' :
                '<li class="grayedout"> Not Available </li>'),
            $(".downloads-list").html(n);
            break;
        }
    }
}

function showDeOffers() {
    window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " Section",
            eventAction: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers SubSection",
            eventLabel: "Income Type Selection Click - " + (void 0 === reqpar["request-params"]["tl.deCity"] ? $("#deCity").val() : $("#editCity").val()),
        }),
        window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " Section",
            eventAction: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers SubSection",
            eventLabel: "View Offers Click",
        }),
        $('input[name="Action"]').val("UPDATE_CUSTOMER"),
        $("form").attr("action", "/CreditView/dashboard.page?submit=true&componentID=1516418270755"),
        $("form").attr("target", "_self");
}

function acceptTerms(e) {
    window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login Atlas " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan"),
            eventAction: "Post Login - " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers Display Section -" + e.target.dataset.product + " Offers",
            eventLabel: "Accept TandC CTA Click",
        }),
        "CIBIL" == currentEnterprise() && gtag_report_conversion($("#terms-condition-apply").attr("offerUrl")),
        $(".modal-overlay").css("display", "none"),
        $('div[data-modal="apply-now"]').css("display", "none");
    var t = e.target.getAttribute("offerurl");
    $('input[name="Action"]').val("LEGAL_COPY_ACCEPTANCE"),
        $("<input>").attr("type", "hidden").attr("name", "tl.legalCopyRedirectUrl").attr("value", t).appendTo("form"),
        sessionStorage.setItem("redirectPartner", "true"),
        $("form").submit();
}

function displayEditDeForm(e) {
    window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " Section",
            eventAction: "Post Login – " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers SubSection",
            eventLabel: "Settings Click",
        }),
        $(".update-info input[type=hidden]").prop("type", "text"),
        $(".offers-form input[type=text]").prop("type", "hidden"),
        $(".update-info .helper").each(function() {
            $(this).removeClass("error"), ($(this).innerText = "");
        }),
        "undefined" != typeof reqpar &&
        ((document.getElementById("editEmployment").value = reqpar["request-params"]["tl.deEmployment"]),
            (document.getElementById("editCity").value = reqpar["request-params"]["tl.deCity"]),
            (document.getElementById("editEmployment-flexdatalist").value = reqpar["request-params"]["tl.deEmployment"]),
            (document.getElementById("editCity-flexdatalist").value = reqpar["request-params"]["tl.deCity"]),
            (document.getElementById("editSalary").value = reqpar["request-params"]["tl.deSalary"]));
}

function categoryGATracking(e, t) {
    if (t.isTrusted) {
        var r = $(e).find("h3").hasClass("creditCount") ?
            "Credit Card" :
            $(e).find("h3").hasClass("personalCount") ?
            "Personal Loan" :
            $(e).find("h3").hasClass("businessCount") ?
            "Business Loan" :
            $(e).find("h3").hasClass("homeCount") ?
            "Home Loan" :
            $(e).find("h3").hasClass("loanAganistcount") ?
            "Loan Against Property" :
            $(e).find("h3").hasClass("autoCount") ?
            "Auto Loan" :
            "Gold Loan";
        window.dataLayer.push({
            event: "EventTracking",
            eventCategory: "Post Login Atlas " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan"),
            eventAction: "Post Login - " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers SubSection",
            eventLabel: r + " Click",
        });
    }
}

function triggerGTM(e) {
    window.dataLayer.push({
        event: "EventTracking",
        eventCategory: "Post Login Atlas " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan"),
        eventAction: "Post Login - " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers Display Section - " + e.target.dataset.product + " Offers",
        eventLabel: "apply-now" === e.target.dataset.modal ? "Apply Offer CTA Click" : "More Details Click",
    });
}

function trackGA(e) {
    window.dataLayer.push({
        event: "EventTracking",
        eventCategory: "Post Login Atlas " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan"),
        eventAction: "Post Login - " + (window.location.href.indexOf("/dashboard.page") > 0 ? "Dasboard" : "Loan") + " - Offers Display Section - " + event.target.dataset.product + " Offers",
        eventLabel: "Details Box - Offer TandC Download Click",
    });
}

function validateScore(e) {
    var t = $("#loanType").val();
    if ("" !== t && null !== t) {
        var r = "creditCardLoan" === t ? 15e5 : "homeLoan" === t ? 5e7 : "autoLoan" === t ? 2e6 : 1e6,
            n = "creditCardLoan" === t ? 2e4 : "homeLoan" === t ? 1e6 : "autoLoan" === t ? 1e5 : 5e3;
        $("#loanAmount").removeAttr("disabled").addClass("required"),
            "loanAmount" === e.attr("id") &&
            ($("#loanAmount").val() < n || $("#loanAmount").val() > r ?
                ($("#loanAmount").addClass("error").removeClass("ok"),
                    $("#loanAmount").next(".helper").addClass("error"),
                    "hi" === sessionStorage.getItem("userLangPref") ?
                    $("#loanAmount")
                    .next(".helper")
                    .append("कृपया " + n + " और " + r + "के बीच वैल्यू दर्ज करें") :
                    "ta" === sessionStorage.getItem("userLangPref") ?
                    $("#loanAmount")
                    .next(".helper")
                    .append("தயவுசெய்து " + n + " மற்றும்  " + r + "-ற்கு இடையில் ஒரு மதிப்பை உள்ளிடவும்") :
                    "te" === sessionStorage.getItem("userLangPref") ?
                    $("#loanAmount")
                    .next(".helper")
                    .append("దయచేసి " + n + " మరియు " + r + " మధ్యలో విలువను ఎంటర్ చేయండి ") :
                    "be" === sessionStorage.getItem("userLangPref") ?
                    $("#loanAmount")
                    .next(".helper")
                    .append("অনুগ্রহ করে " + n + " ও " + r + " এর মধ্যেকার একটি মান লিখুন") :
                    $("#loanAmount")
                    .next(".helper")
                    .append("Please enter a value between " + n + " and " + r)) :
                ($("#loanAmount").removeClass("error").addClass("ok"), $("#loanAmount").next(".helper").removeClass("error"), $("#loanAmount").next(".helper").text("")));
    }
}

function showDiscountJson(e) {
    var t = "",
        r = parseFloat(matchKeyValue(analytics, "Management")) + parseFloat(matchKeyValue(analytics, "Information")),
        n = Math.round((parseFloat(r) / 100) * 18 * 100) / 100,
        a = (r + n).toFixed(2);
    return (
        "hi" === sessionStorage.getItem("userLangPref") ?
        ((t += '<h1 class="mainTitle margin5">अपने ऑर्डर की समीक्षा करें.</h1>'),
            (t += '<table class="lightTable">'),
            (t += '<tr><th class="pText">' + e.offerDescription + '</th><th class="pText totalamt">&#8377;' + a + "</th></tr>"),
            (t += '<tr class="succesMsg hide"><th class="pText"><p><span class="congratsMsg">बधाई हो! छूट लागू की गई.</span><span class="cancelDiscount">रद्द करें</span></p></th></tr>'),
            (t +=
                '<tr class="applyPromo"><th class="pText"> <p class="applyDiscount"><a href="javascript:void(0);">छूट कोड लागू करें </a></p><div class="toggle discountInp hide"><input type="text" name="tl.promocode" id="promoCode" maxlength="30" oninput="changePromoColor();"><span id="valPromo" class="small bold" onclick="ajaxCoupon();">लागू करें</span><p class="pNotePromo pSmallBold margin5"></p><p class="helper margin5"></p></div></th></tr>'),
            (t += '<tr class="priceCol"><th class="pText"><p class="totalPrice bold">कुल मूल्य </p></th><th class="pText discountamt bold">&#8377;' + e.billingTotalAmount + "</th></tr>")) :
        "ta" === sessionStorage.getItem("userLangPref") ?
        ((t += '<h1 class="mainTitle margin5">உங்கள் ஆர்டரை மதிப்பாய்வு செய்யுங்கள்</h1>'),
            (t += '<table class="lightTable">'),
            (t += '<tr><th class="pText">' + e.offerDescription + '</th><th class="pText totalamt">&#8377;' + a + "</th></tr>"),
            (t += '<tr class="succesMsg hide"><th class="pText"><p><span class="congratsMsg">வாழ்த்துக்கள்! தள்ளுபடி பயன்படுத்தப்பட்டது.</span><span class="cancelDiscount">இரத்துச் செய்</span></p></th></tr>'),
            (t +=
                '<tr class="applyPromo"><th class="pText"> <p class="applyDiscount"><a href="javascript:void(0);">தள்ளுபடி குறியீட்டைப் பயன்படுத்துங்கள் </a></p><div class="toggle discountInp hide"><input type="text" name="tl.promocode" id="promoCode" maxlength="30" oninput="changePromoColor();"><span id="valPromo" class="small bold" onclick="ajaxCoupon();">பயன்படுத்து</span><p class="pNotePromo pSmallBold margin5"></p><p class="helper margin5"></p></div></th></tr>'),
            (t += '<tr class="priceCol"><th class="pText"><p class="totalPrice bold">மொத்த விலை</p></th><th class="pText discountamt bold">&#8377;' + e.billingTotalAmount + "</th></tr>")) :
        "te" === sessionStorage.getItem("userLangPref") ?
        ((t += '<h1 class="mainTitle margin5">మీ ఆర్డర్ను సమీక్షించండి</h1>'),
            (t += '<table class="lightTable">'),
            (t += '<tr><th class="pText">' + e.offerDescription + '</th><th class="pText totalamt">&#8377;' + a + "</th></tr>"),
            (t += '<tr class="succesMsg hide"><th class="pText"><p><span class="congratsMsg">అభినందనలు! డిస్కౌంట్ అప్లై చేయబడినది.</span><span class="cancelDiscount">రద్దు చేయండి</span></p></th></tr>'),
            (t +=
                '<tr class="applyPromo"><th class="pText"> <p class="applyDiscount"><a href="javascript:void(0);">ఒక డిస్కౌంట్ కోడ్ అప్లై చేయండి</a></p><div class="toggle discountInp hide"><input type="text" name="tl.promocode" id="promoCode" maxlength="30" oninput="changePromoColor();"><span id="valPromo" class="small bold" onclick="ajaxCoupon();">అప్లై</span><p class="pNotePromo pSmallBold margin5"></p><p class="helper margin5"></p></div></th></tr>'),
            (t += '<tr class="priceCol"><th class="pText"><p class="totalPrice bold">మొత్తం ధర</p></th><th class="pText discountamt bold">&#8377;' + e.billingTotalAmount + "</th></tr>")) :
        "be" === sessionStorage.getItem("userLangPref") ?
        ((t += '<h1 class="mainTitle margin5">আপনার অর্ডার পর্যালোচনা করুন</h1>'),
            (t += '<table class="lightTable">'),
            (t += '<tr><th class="pText">' + e.offerDescription + '</th><th class="pText totalamt">&#8377;' + a + "</th></tr>"),
            (t += '<tr class="succesMsg hide"><th class="pText"><p><span class="congratsMsg">অভিনন্দন! ছাড় প্রযুক্ত হয়েছে।</span><span class="cancelDiscount">বাতিল করুন</span></p></th></tr>'),
            (t +=
                '<tr class="applyPromo"><th class="pText"> <p class="applyDiscount"><a href="javascript:void(0);">একটি ছাড়ের কোড প্রয়োগ করুন</a></p><div class="toggle discountInp hide"><input type="text" name="tl.promocode" id="promoCode" maxlength="30" oninput="changePromoColor();"><span id="valPromo" class="small bold" onclick="ajaxCoupon();">আবেদন করুন</span><p class="pNotePromo pSmallBold margin5"></p><p class="helper margin5"></p></div></th></tr>'),
            (t += '<tr class="priceCol"><th class="pText"><p class="totalPrice bold">মোট মূল্য</p></th><th class="pText discountamt bold">&#8377;' + e.billingTotalAmount + "</th></tr>")) :
        ((t += '<h1 class="mainTitle margin5">Review Your Order</h1>'),
            (t += '<table class="lightTable">'),
            (t += '<tr><th class="pText">' + e.offerDescription + '</th><th class="pText totalamt">&#8377;' + a + "</th></tr>"),
            (t += '<tr class="succesMsg hide"><th class="pText"><p><span class="congratsMsg">Congratulations! Discount applied.</span><span class="cancelDiscount">Cancel</span></p></th></tr>'),
            (t +=
                '<tr class="applyPromo"><th class="pText"> <p class="applyDiscount"><a href="javascript:void(0);">Apply a discount code</a></p><div class="toggle discountInp hide"><input type="text" name="tl.promocode" id="promoCode" maxlength="30" oninput="changePromoColor();"><span id="valPromo" class="small bold" onclick="ajaxCoupon();">Apply</span><p class="pNotePromo pSmallBold margin5"></p><p class="helper margin5"></p></div></th></tr>'),
            (t += '<tr class="priceCol"><th class="pText"><p class="totalPrice bold">Total Price</p></th><th class="pText discountamt bold">&#8377;' + e.billingTotalAmount + "</th></tr>")),
        t
    );
}

function validPromoValidation() {
    var e = reqpar["request-params"]["tl.promocode"];
    $(".pNotePromo")
        .addClass("success")
        .removeClass("error")
        .text(e + " has successfully been applied "),
        $(".promoDiscount").addClass("success"),
        $("#promoCode").val(reqpar["request-params"]["tl.promocode"]).addClass("success").removeClass("error"),
        $(".succesMsg").show(),
        $(".applyPromo").hide(),
        $(".totalPrice").text(localizedString("TotalAfterDiscount")),
        $(".totalamt").css("text-decoration", "line-through"),
        generalGATracking("Form Event Field Success Step Payment- Upgrade", "Discount Code", "Discount Code Applied - " + reqpar["request-params"]["tl.promocode"]);
}

function promoErrorMessage() {
    $(".promoDiscount").removeClass("success"), $(".promoDiscount").html("₹ 0.00");
    var e = parseFloat(matchKeyValue(analytics, "Management")) + parseFloat(matchKeyValue(analytics, "Information"));
    $(".totTax").html(e);
    var t = (parseFloat(e) / 100) * 9;
    matchKey(analytics, "CGST") ? $(".gst").html(Math.round(100 * parseFloat(t)) / 100) : $(".gst").html(Math.round(2 * parseFloat(t) * 100) / 100);
    var r = parseFloat(e) + 2 * parseFloat(t);
    $(".discountamt").html("&#8377;" + r.toFixed(2));
}

function generateValidation() {
    "undefined" != typeof failureInfo && "undefined" != typeof failureInfo.reason ?
        ("INVALID_COUPON_CODE" === failureInfo.reason ?
            ($(".pNotePromo").removeClass("success").addClass("error").text(localizedString("INVALID_COUPON_CODE")),
                generalGATracking("Form Event Field Error Step Payment- Upgrade", "Discount Code", "Error Message - " + reqpar["request-params"]["tl.promocode"] + " - Discount code is invalid"),
                $("#promoCode").val(reqpar["request-params"]["tl.promocode"]).removeClass("success").addClass("error"),
                promoErrorMessage()) :
            "INVALID_COUPON_OFFER_COMBO" === failureInfo.reason ?
            ($(".pNotePromo").removeClass("success").addClass("error").text(localizedString("INVALID_COUPON_OFFER_COMBO")),
                generalGATracking("Form Event Field Error Step Payment- Upgrade", "Discount Code", "Error Message - " + reqpar["request-params"]["tl.promocode"] + " - Discount code is not valid for this subscription"),
                $("#promoCode").val(reqpar["request-params"]["tl.promocode"]).removeClass("success").addClass("error"),
                promoErrorMessage()) :
            "COUPON_EXPIRED" === failureInfo.reason ?
            ($(".pNotePromo").removeClass("success").addClass("error").text(localizedString("COUPON_EXPIRED")),
                generalGATracking("Form Event Field Error Step Payment- Upgrade", "Discount Code", "Error Message - " + reqpar["request-params"]["tl.promocode"] + " - Discount code is no longer valid"),
                $("#promoCode").val(reqpar["request-params"]["tl.promocode"]).removeClass("success").addClass("error"),
                promoErrorMessage()) :
            "COUPON_REDEMPTION_LIMIT" === failureInfo.reason &&
            ($(".pNotePromo").removeClass("success").addClass("error").text(localizedString("COUPON_REDEMPTION_LIMIT")),
                generalGATracking("Form Event Field Error Step Payment- Upgrade", "Discount Code", "Error Message - " + reqpar["request-params"]["tl.promocode"] + " - Discount code has reached max number of usage and is no longer valid"),
                $("#promoCode").val(reqpar["request-params"]["tl.promocode"]).removeClass("success").addClass("error"),
                promoErrorMessage()),
            $("#promoCode").val(reqpar["request-params"]["tl.promocode"]).removeClass("success"),
            void 0 != reqpar["request-params"]["tl.promocode"] && "" != reqpar["request-params"]["tl.promocode"] && ($(".discountInp").show(), $(".applyDiscount a").css({ color: "#000", border: " none" }))) :
        null != matchKeyValue(analytics, "discount") && "" != reqpar["request-params"]["tl.promocode"] ?
        validPromoValidation() :
        promoErrorMessage();
}

function billBreakdown() {
    $(".loadingDiv").hide(), $("#couponDes").html(showDiscountJson(analytics)), generateValidation();
}

function ajaxCoupon() {
    "" == $("#promoCode").val() || $(".toggle .helper").hasClass("error") ?
        $(".toggle .helper").hasClass("error") || $(".pNotePromo").removeClass("success").addClass("error").text(localizedString("Enterdiscountcode")) :
        ($(".loadingDiv").show(), $('input[name="Action"]').val("GET_PAYMENT_OFFER_DETAILS"), $("form").submit());
}

function changePromoColor() {
    $("#promoCode").removeClass("error success"), $(".pNotePromo").removeClass("success error").text("");
}

function closePopupText() {
    $(".popuptext").removeClass("show");
}

function changeUrlParam(e) {
    var t = removeParam("locale", window.location.href);
    return document.location.search.length > 1 ? $(this).attr("href", t + "&locale=" + e) : $(this).attr("href", t + "?locale=" + e), $(this).attr("href");
}

function removeParam(e, t) {
    var r,
        n = t.split("?")[0],
        a = [],
        i = t.indexOf("?") !== -1 ? t.split("?")[1] : "";
    if ("" !== i) {
        a = i.split("&");
        for (var o = a.length - 1; o >= 0; o -= 1)(r = a[o].split("=")[0]), r === e && a.splice(o, 1);
        n = n + "?" + a.join("&");
    }
    return (n = n.replace("#", ""));
}

function guidGenerator() {
    var e = function() {
        return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
    };
    return e() + e() + e() + e() + e() + e() + e();
}

function realTimeDisputePop() {
    $("#modals").show(),
        $("#modals .modal-wrapper").css({ "max-width": "80%", height: "400px" }),
        $(".modal-close").hide(),
        $('#modals div[data-modal="real-time-dispute"]').show(),
        $(".accountInfoSection, .enquiryInfoSection").hide(),
        getRealTimeDisputeDetails();
}

function getRealTimeDisputeDetails() {
    var e = reqpar["request-params"]["tl.disputeResponse"],
        t = JSON.parse(e.replace(/&quot;/g, '"')),
        r = "";
    if (((r = t), r && r.data && r.data.disputedField && r.data.disputedField.length > 0)) {
        var n,
            a,
            i = r.data.disputedField.filter(function(e) {
                return "ACCOUNT_OWNERSHIP" === e.field && "RIGHTMERGE" === e.decision;
            }),
            o = r.data.disputedField.filter(function(e) {
                return "ENQUIRY_OWNERSHIP" === e.field && "RIGHTMERGE" === e.decision;
            });
        (n = a = ""),
        i &&
            i.length > 0 &&
            ($.each(i, function(e, t) {
                    var a = getSessionDetailsToCompare(t, !0),
                        i = {};
                    (i.memberName = t.memberName),
                    (i.accountNumber = t.accountNumber),
                    (n +=
                        '<div class="frow report-row tu-row mobileRealTime" data-hj-suppress=""><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Select</strong></div><div><input type="checkbox" data-infosection="account" data-disputecode="' +
                        r.data.disputeCode +
                        "\" data-reinitiate='" +
                        JSON.stringify(i) +
                        "' data-array-list='" +
                        JSON.stringify(t) +
                        '\' class="checkBoxlist" onclick="disableSubmitDisputeBtn();"></div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Member Name</strong></div><div>' +
                        a[0].memberName +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Account Number</strong></div><div>' +
                        a[0].accountNumber +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Account Type</strong></div><div>' +
                        a[0].accountType +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Sanctioned Amount/Credit Limit</strong></div><div>' +
                        a[0].accountAmount +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Dispute Type</strong></div><div>' +
                        a[0].value +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Decision</strong></div><div>' +
                        a.decision +
                        "</div></div></div>");
                }),
                $(".realTimeDisputeAccountTable #tblBody").html(n),
                $(".accountInfoSection").show()),
            o &&
            o.length > 0 &&
            ($.each(o, function(e, t) {
                    var n = getSessionDetailsToCompare(t, !1),
                        i = {};
                    (i.memberName = t.memberName),
                    (i.dateOfEnq = t.dateOfEnq),
                    (i.enqECN = t.enqECN),
                    (a +=
                        '<div class="frow report-row tu-row mobileRealTime" data-hj-suppress=""><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Select</strong></div><div><input type="checkbox" data-infosection="enquiry"  data-disputecode="' +
                        r.data.disputeCode +
                        "\"  data-reinitiate='" +
                        JSON.stringify(i) +
                        "' data-array-list='" +
                        JSON.stringify(t) +
                        '\' class="checkBoxlist" onclick="disableSubmitDisputeBtn();"></div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Member Name</strong></div><div>' +
                        n[0].memberName +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Date of Enquiry</strong></div><div>' +
                        dateFormatter(n[0].dateOfEnq) +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Enquiry Purpose</strong></div><div>' +
                        n[0].enqPurpose +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Enquiry Amount</strong></div><div>' +
                        Number(n[0].enqAmount).toLocaleString("en-IN") +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Dispute Type</strong></div><div>' +
                        n[0].value +
                        '</div></div><div class="fhcell"><div class="sectionMobileTitle"><strong class="fhheader">Decision</strong></div><div>' +
                        n.decision +
                        "</div></div></div>");
                }),
                $(".realTimeDisputeEnquiryTable #tblBody").html(a),
                $(".enquiryInfoSection").show());
    }
}

function getSessionDetailsToCompare(e, t) {
    var r = sessionStorage.getItem("SESSION_REAL_TIME_DISPUTE"),
        n = JSON.parse(r),
        a = e;
    return (
        n &&
        ((n.account && n.account.length > 0) || (n.enquiry && n.enquiry.length > 0)) &&
        (t ?
            ((a = n.account.filter(function(t) {
                    return t.accountNumber === e.accountNumber;
                })),
                0 === a.length && (a = [{ field: "ACCOUNT_OWNERSHIP", value: "Account does not belong to me", memberName: e.memberName, accountNumber: e.accountNumber, accountType: "", accountAmount: "", accountCredit: "" }]),
                (a.decision = "Information belongs to you")) :
            ((a = n.enquiry.filter(function(t) {
                    return t.enqECN === e.enqECN;
                })),
                0 === a.length && (a = [{ field: "ENQUIRY_OWNERSHIP", value: "Never Applied", memberName: e.memberName, dateOfEnq: e.dateOfEnq, enqECN: e.enqECN, enqAmount: "", enqPurpose: "" }]),
                (a.decision = "Information belongs to you"))),
        a
    );
}

function disableSubmitDisputeBtn() {
    var e;
    e = 0;
    var t = $('.realTimeDisputeInfoSection input.checkBoxlist[type="checkbox"]');
    (e = t.filter(":checked").length), $("button#realTimeSubmitBtn").attr("disabled", !0), e > 0 && $("button#realTimeSubmitBtn").attr("disabled", !1);
}

function submitRealTimeDisputeInfo() {
    var e = $('.realTimeDisputeInfoSection input.checkBoxlist[type="checkbox"]'),
        t = (e.filter(":checked").length, []),
        r = {};
    (r.account = []),
    (r.enquiry = []),
    $.each($(e.filter(":checked")), function() {
            "account" === $(this).attr("data-infosection") ? r.account.push(JSON.parse($(this).attr("data-reinitiate"))) : "enquiry" === $(this).attr("data-infosection") && r.enquiry.push(JSON.parse($(this).attr("data-reinitiate"))),
                t.push(JSON.parse($(this).attr("data-reinitiate")));
        }),
        sessionStorage.setItem("SESSION_REAL_TIME_DISPUTE_SUMMARY_RELOAD", "true"),
        sessionStorage.setItem("SESSION_REAL_TIME_DISPUTE_SUMMARY", JSON.stringify(r));
    var n = {};
    (n.data = { cds: e.attr("data-disputecode"), accountDetails: t }),
    generalGATracking(
            "Post Login - Credit Report Section",
            "Post Login - Credit Report Section - Credit Report Subsection - Personal Information SubSection",
            "Post Login - Credit Report Section - Credit Report Subsection - Personal Information SubSection - Real Time Disputes SubSection PopUp - Submit Dispute Click"
        ),
        $('input[name="Action"]').val("DISPUTE_REINITIATE"),
        $("<input>").attr("type", "hidden").attr("name", "tl.disputeReinitiateRequest").attr("value", JSON.stringify(n)).appendTo("form"),
        $("form").submit();
}

function closeRealTimePopup() {
    sessionStorage.setItem("SESSION_REAL_TIME_DISPUTE_SUMMARY_RELOAD", "true"),
        $("#modals").hide(),
        $("#modals .modal-wrapper div").hide(),
        generalGATracking(
            "Post Login - Credit Report Section",
            "Post Login - Credit Report Section - Credit Report Subsection - Personal Information SubSection",
            "Post Login - Credit Report Section - Credit Report Subsection - Personal Information SubSection - Real Time Disputes SubSection PopUp - Agree and Proceed Click"
        );
}

function validateIfUserNotMeetTUEF() {
    $("#dashboard").css("opacity", "0.2"), $("#modals").show(), $(".modal-close").hide(), $(".loadingDiv").hide(), $('#modals div[data-modal="tuef-valitions-for-user"]').show();
}

function updateTUEFUserInfo() {
    $(".tuefValidations .required").hasClass("error") || "" === $(".tuefValidations .required").val() || (showLoading(), $('input[name="Action"]').val("UPDATE_CUSTOMER"), $("form").submit());
}

function showOpenDisputes(e) {
    var t = "";
    for (var r in e)
        "New" == e[r].disputeStatus &&
        (t +=
            '<div class="frow report-row tu-row" data-hj-suppress=""><div class="fhcell editable"><div id="disputeName">' +
            e[r].disputeCode +
            '<br><span data-ga="open"  class="showMore' +
            r +
            '">View Details</span></div></div><div class="fcell tu-cell editable"><div id="datepicker">' +
            e[r].disputeDate +
            '</div></div><div class="fcell tu-cell editable"><div id="disputeName">' +
            e[r].disputeStatus +
            "</div></div></div>");
    return mainVal + t;
}

function showCloseDisputes(e) {
    var t = "";
    for (var r in e)
        "closed" == e[r].disputeStatus &&
        (t +=
            '<div class="frow report-row tu-row" data-hj-suppress=""><div class="fhcell editable"><div id="disputeName">' +
            e[r].disputeCode +
            '<br><span data-ga="closed" class="showMore' +
            r +
            '">View Details</span></div></div><div class="fcell tu-cell editable"><div id="datepicker">' +
            e[r].disputeDate +
            '</div></div><div class="fcell tu-cell editable"><div id="disputeName">' +
            e[r].disputeStatus +
            '</div></div><div class="fcell tu-cell editable"><div id="datepicker">' +
            e[r].closedDate +
            "</div></div></div>");
    return mainVal1 + t;
}

function showDisputesDetails(e) {
    var t = "";
    for (var r in e)
        t +=
        '<div class="frow report-row tu-row" data-hj-suppress=""><div class="fhcell editable"><div id="disputeName">' +
        e[r].sectionName +
        '</div></div><div class="fcell tu-cell editable"><div id="datepicker">' +
        e[r].sectionField +
        '</div></div><div class="fcell tu-cell editable"><div id="disputeName">' +
        e[r].disputeDetail +
        '</div></div><div class="fcell tu-cell editable"><div id="disputeName">' +
        e[r].sectionFieldStatus +
        "</div></div></div>";
    return mainVal + t;
}

function showPromoDetails(e) {
    $("#pr-content-" + e).show(), validatePromoResponse(e);
}

function validatePromoResponse(e) {
    "undefined" != typeof failureInfo && "undefined" != typeof failureInfo.reason ?
        ("INVALID_COUPON_CODE" === failureInfo.reason ?
            ($("#pr-msg-" + e)
                .removeClass("success")
                .addClass("error")
                .text(localizedString("INVALID_PROMO_CODE")),
                $("#pr-input-" + e)
                .val(reqpar["request-params"]["tl.promocode"])
                .removeClass("success")
                .addClass("error")) :
            "INVALID_COUPON_OFFER_COMBO" === failureInfo.reason ?
            ($("#pr-msg-" + e)
                .removeClass("success")
                .addClass("error")
                .text(localizedString("INVALID_PROMO_OFFER_COMBO")),
                $("#pr-input-" + e)
                .val(reqpar["request-params"]["tl.promocode"])
                .removeClass("success")
                .addClass("error")) :
            "COUPON_EXPIRED" === failureInfo.reason ?
            ($("#pr-msg-" + e)
                .removeClass("success")
                .addClass("error")
                .text(localizedString("PROMO_EXPIRED")),
                $("#pr-input-" + e)
                .val(reqpar["request-params"]["tl.promocode"])
                .removeClass("success")
                .addClass("error")) :
            "COUPON_REDEMPTION_LIMIT" === failureInfo.reason &&
            ($("#pr-msg-" + e)
                .removeClass("success")
                .addClass("error")
                .text(localizedString("PROMO_REDEMPTION_LIMIT")),
                $("#pr-input-" + e)
                .val(reqpar["request-params"]["tl.promocode"])
                .removeClass("success")
                .addClass("error")),
            $("#pr-input-" + e)
            .val(reqpar["request-params"]["tl.promocode"])
            .removeClass("success"),
            $("#pr-re-" + e).hide(),
            window.location.href.indexOf("/dashboard.page") > 0 && $("html, body").animate({ scrollTop: $("#upgradeUnlock").offset().top }, 2e3),
            window.location.href.indexOf("/upgradeSubscription.page") > 0 && $("html, body").animate({ scrollTop: $(".priceColumnWrapper").offset().top }, 2e3),
            window.location.href.indexOf("/creditAlerts.page") > 0 && $("html, body").animate({ scrollTop: $(".column").offset().top }, 2e3),
            window.location.href.indexOf("/scoreSimulatorUpgrade.page") > 0 && $("html, body").animate({ scrollTop: $(".column").offset().top }, 2e3),
            window.location.href.indexOf("/prepurchaseSubscription.page") > 0 && $("html, body").animate({ scrollTop: $(".priceColumnWrapper").offset().top }, 2e3)) :
        (validatePromoResponseSuccess(e),
            window.location.href.indexOf("/dashboard.page") > 0 && $("html, body").animate({ scrollTop: $("#upgradeUnlock").offset().top }, 2e3),
            window.location.href.indexOf("/upgradeSubscription.page") > 0 && $("html, body").animate({ scrollTop: $(".priceColumnWrapper").offset().top }, 2e3),
            window.location.href.indexOf("/creditAlerts.page") > 0 && $("html, body").animate({ scrollTop: $(".column").offset().top }, 2e3),
            window.location.href.indexOf("/scoreSimulatorUpgrade.page") > 0 && $("html, body").animate({ scrollTop: $(".column").offset().top }, 2e3),
            window.location.href.indexOf("/prepurchaseSubscription.page") > 0 && $("html, body").animate({ scrollTop: $(".priceColumnWrapper").offset().top }, 2e3));
}

function validatePromoResponseSuccess(e) {
    $("#pr-input-" + e)
        .val(reqpar["request-params"]["tl.promocode"])
        .removeClass("error"),
        $("#pr-msg-" + e)
        .removeClass("error")
        .addClass("success")
        .text("Promo code applied!"),
        $("#pr-tol-amt-" + e).css("text-decoration", "line-through"),
        $(".pr-promo-" + e).hide(),
        $("#pr-re-" + e).show();
    var t = parseFloat(reqpar["request-params"]["tl.offerPrice"]);
    $("#pr-dis-amt-" + e).html(" &#8377; " + t);
}

function validPromoCode(e, t) {
    var r = $("#pr-input-" + e).val();
    if (r) {
        var n = /^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9]{0,30}$/;
        n.test(r) ?
            (sessionStorage.setItem("SESSION_PROMO_CODE_ID", e), submitPromoCode(e, t)) :
            $("#pr-msg-" + e)
            .removeClass("success")
            .addClass("error")
            .text(localizedString("ALPHANUMERIC_PROMO_CODE"));
    } else
        $("#pr-msg-" + e)
        .removeClass("success")
        .addClass("error")
        .text(localizedString("Enterpromocode"));
    return !1;
}

function submitPromoCode(e, t) {
    showLoading();
    var r = $("#pr-input-" + e).val();
    $("#" + t).val();
    window.location.href.indexOf("/prepurchaseSubscription.page") > 0 ?
        $("<input>").attr("type", "hidden").attr("name", "tl.prePurchaseOfferCode").attr("value", t).appendTo("form") :
        $("<input>").attr("type", "hidden").attr("name", "tl.offer-id").attr("value", t).appendTo("form"),
        $("<input>").attr("type", "hidden").attr("name", "tl.promocode").attr("value", r).appendTo("form"),
        $('input[name="Action"]').val("GET_PAYMENT_OFFER_DETAILS"),
        $("form").submit();
}

function removePromoCode(e) {
    showLoading(),
        sessionStorage.setItem("SESSION_PROMO_CODE_ID", 0),
        sessionStorage.setItem("SESSION_PROMO_CODE_REMOVE", 0),
        $("#pr-input-" + e).val(""),
        $("#pr-tol-amt-" + e).css("text-decoration", "none"),
        $("#pr-dis-amt-" + e).html(""),
        onChangeDefault(e),
        $("<input>").attr("type", "hidden").attr("name", "tl.promocode").attr("value", "").appendTo("form"),
        $('input[name="Action"]').val("GET_PAYMENT_OFFER_DETAILS"),
        $("form").submit();
}

function submitPromoPaymentProceed(e, t) {
    sessionStorage.setItem("SESSION_PROMO_CODE_ID", 0),
        showLoading(),
        resetDefautForSubscription(e),
        "" !== $("#pr-input-" + e).val() && "" !== $("#pr-dis-amt-" + e) ?
        window.location.href.indexOf("/prepurchaseSubscription.page") > 0 ?
        ($("<input>").attr("type", "hidden").attr("name", "tl.prePurchaseOfferCode").attr("value", t).appendTo("form"),
            "undefined" != typeof reqpar["request-params"]["tl.promocode"] &&
            "" !== reqpar["request-params"]["tl.promocode"] &&
            $("<input>")
            .attr("type", "hidden")
            .attr("name", "tl.promocode")
            .attr("value", $("#pr-input-" + e).val())
            .appendTo("form"),
            $('input[name="Action"]').val("PREPURCHASE_SUBSCRIPTION"),
            $("form").submit()) :
        ($("<input>").attr("type", "hidden").attr("name", "tl.offer-id").attr("value", t).appendTo("form"),
            "undefined" != typeof reqpar["request-params"]["tl.promocode"] &&
            "" !== reqpar["request-params"]["tl.promocode"] &&
            $("<input>")
            .attr("type", "hidden")
            .attr("name", "tl.promocode")
            .attr("value", $("#pr-input-" + e).val())
            .appendTo("form"),
            $('input[name="Action"]').val("GET_INVOICE_AND_PAYMENT"),
            $("form").submit()) :
        (window.location.href.indexOf("/prepurchaseSubscription.page") > 0 ?
            $("<input>").attr("type", "hidden").attr("name", "tl.prePurchaseOfferCode").attr("value", t).appendTo("form") :
            $("<input>").attr("type", "hidden").attr("name", "tl.offer-id").attr("value", t).appendTo("form"),
            $("<input>").attr("type", "hidden").attr("name", "tl.promocode").attr("value", "").appendTo("form"),
            window.location.href.indexOf("/prepurchaseSubscription.page") > 0 ?
            ($('input[name="Action"]').val("PREPURCHASE_SUBSCRIPTION"), $("form").submit()) :
            ($('input[name="Action"]').val("FULFILL_UPSELL_ORDER"), $("form").submit()));
}


function renewalDateTimer() {
    var e = (renewalTodayTime = renewalTimeLeft = renewalHours = renewalMinutes = renewalSec = renewalDay = "");
    if (window.location.href.indexOf("/dashboard.page") > 0 || window.location.href.indexOf("/creditAlerts.page") > 0 || window.location.href.indexOf("/scoreSimulator.page") > 0)
        for (var t = 0; t < ud.reportstu.ComponentDetail.length; t++) var r = ud.reportstu.ComponentDetail[t].ExpireDate,
            n = r.substring(8, 10),
            a = r.substring(5, 7),
            i = r.substring(0, 4),
            o = n + "/" + a + "/" + i,
            r = convertDate(o);
    (e = r),
    (e = Date.parse(e) / 1e3),
    (renewalTodayTime = new Date()),
    (renewalTodayTime = Date.parse(renewalTodayTime) / 1e3),
    (renewalTimeLeft = e - renewalTodayTime),
    (renewalDay = Math.floor(renewalTimeLeft / 86400)),
    (renewalHours = Math.floor((renewalTimeLeft - 86400 * renewalDay) / 3600)),
    (renewalMinutes = Math.floor((renewalTimeLeft - 86400 * renewalDay - 3600 * renewalHours) / 60)),
    (renewalSec = Math.floor(renewalTimeLeft - 86400 * renewalDay - 3600 * renewalHours - 60 * renewalMinutes)),
    renewalDay < "10" && (renewalDay = "0" + renewalDay),
        renewalHours < "10" && (renewalHours = "0" + renewalHours),
        renewalMinutes < "10" && (renewalMinutes = "0" + renewalMinutes),
        renewalSec < "10" && (renewalSec = "0" + renewalSec);
    for (var s = [], l = renewalDay.toString(), t = 0, d = l.length; t < d; t += 1) s.push(+l.charAt(t));
    for (var c = [], u = renewalHours.toString(), t = 0, d = u.length; t < d; t += 1) c.push(+u.charAt(t));
    for (var p = [], h = renewalMinutes.toString(), t = 0, d = h.length; t < d; t += 1) p.push(+h.charAt(t));
    $(".countDownTimer .days").html(s[0]),
        $(".countDownTimer .days1").html(s[1]),
        $(".countDownTimer .hours").html(c[0]),
        $(".countDownTimer .hours1").html(c[1]),
        $(".countDownTimer .minutes").html(p[0]),
        $(".countDownTimer .minutes1").html(p[1]),
        today >= r &&
        ($(".countDownTimer .days").html("0"),
            $(".countDownTimer .days1").html("0"),
            $(".countDownTimer .hours").html("0"),
            $(".countDownTimer .hours1").html("0"),
            $(".countDownTimer .minutes").html("0"),
            $(".countDownTimer .minutes1").html("0"));
}!(function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ?
        (module.exports = e.document ?
            t(e, !0) :
            function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return t(e);
            }) :
        t(e);
})("undefined" != typeof window ? window : this, function(e, t) {
    function r(e) {
        var t = e.length,
            r = ae.type(e);
        return "function" !== r && !ae.isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === r || 0 === t || ("number" == typeof t && t > 0 && t - 1 in e));
    }

    function n(e, t, r) {
        if (ae.isFunction(t))
            return ae.grep(e, function(e, n) {
                return !!t.call(e, n, e) !== r;
            });
        if (t.nodeType)
            return ae.grep(e, function(e) {
                return (e === t) !== r;
            });
        if ("string" == typeof t) {
            if (pe.test(t)) return ae.filter(t, e, r);
            t = ae.filter(t, e);
        }
        return ae.grep(e, function(e) {
            return ae.inArray(e, t) >= 0 !== r;
        });
    }

    function a(e, t) {
        do e = e[t];
        while (e && 1 !== e.nodeType);
        return e;
    }

    function i(e) {
        var t = (Se[e] = {});
        return (
            ae.each(e.match(be) || [], function(e, r) {
                t[r] = !0;
            }),
            t
        );
    }

    function o() {
        fe.addEventListener ? (fe.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (fe.detachEvent("onreadystatechange", s), e.detachEvent("onload", s));
    }

    function s() {
        (fe.addEventListener || "load" === event.type || "complete" === fe.readyState) && (o(), ae.ready());
    }

    function l(e, t, r) {
        if (void 0 === r && 1 === e.nodeType) {
            var n = "data-" + t.replace(Pe, "-$1").toLowerCase();
            if (((r = e.getAttribute(n)), "string" == typeof r)) {
                try {
                    r = "true" === r || ("false" !== r && ("null" === r ? null : +r + "" === r ? +r : xe.test(r) ? ae.parseJSON(r) : r));
                } catch (a) {}
                ae.data(e, t, r);
            } else r = void 0;
        }
        return r;
    }

    function d(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ae.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0;
    }

    function c(e, t, r, n) {
        if (ae.acceptData(e)) {
            var a,
                i,
                o = ae.expando,
                s = e.nodeType,
                l = s ? ae.cache : e,
                d = s ? e[o] : e[o] && o;
            if ((d && l[d] && (n || l[d].data)) || void 0 !== r || "string" != typeof t)
                return (
                    d || (d = s ? (e[o] = Y.pop() || ae.guid++) : o),
                    l[d] || (l[d] = s ? {} : { toJSON: ae.noop }),
                    ("object" != typeof t && "function" != typeof t) || (n ? (l[d] = ae.extend(l[d], t)) : (l[d].data = ae.extend(l[d].data, t))),
                    (i = l[d]),
                    n || (i.data || (i.data = {}), (i = i.data)),
                    void 0 !== r && (i[ae.camelCase(t)] = r),
                    "string" == typeof t ? ((a = i[t]), null == a && (a = i[ae.camelCase(t)])) : (a = i),
                    a
                );
        }
    }

    function u(e, t, r) {
        if (ae.acceptData(e)) {
            var n,
                a,
                i = e.nodeType,
                o = i ? ae.cache : e,
                s = i ? e[ae.expando] : ae.expando;
            if (o[s]) {
                if (t && (n = r ? o[s] : o[s].data)) {
                    ae.isArray(t) ? (t = t.concat(ae.map(t, ae.camelCase))) : t in n ? (t = [t]) : ((t = ae.camelCase(t)), (t = t in n ? [t] : t.split(" "))), (a = t.length);
                    for (; a--;) delete n[t[a]];
                    if (r ? !d(n) : !ae.isEmptyObject(n)) return;
                }
                (r || (delete o[s].data, d(o[s]))) && (i ? ae.cleanData([e], !0) : re.deleteExpando || o != o.window ? delete o[s] : (o[s] = null));
            }
        }
    }

    function p() {
        return !0;
    }

    function h() {
        return !1;
    }

    function f() {
        try {
            return fe.activeElement;
        } catch (e) {}
    }

    function m(e) {
        var t = Re.split("|"),
            r = e.createDocumentFragment();
        if (r.createElement)
            for (; t.length;) r.createElement(t.pop());
        return r;
    }

    function g(e, t) {
        var r,
            n,
            a = 0,
            i = typeof e.getElementsByTagName !== _e ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== _e ? e.querySelectorAll(t || "*") : void 0;
        if (!i)
            for (i = [], r = e.childNodes || e; null != (n = r[a]); a++) !t || ae.nodeName(n, t) ? i.push(n) : ae.merge(i, g(n, t));
        return void 0 === t || (t && ae.nodeName(e, t)) ? ae.merge([e], i) : i;
    }

    function v(e) {
        Ee.test(e.type) && (e.defaultChecked = e.checked);
    }

    function y(e, t) {
        return ae.nodeName(e, "table") && ae.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }

    function b(e) {
        return (e.type = (null !== ae.find.attr(e, "type")) + "/" + e.type), e;
    }

    function S(e) {
        var t = We.exec(e.type);
        return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
    }

    function w(e, t) {
        for (var r, n = 0; null != (r = e[n]); n++) ae._data(r, "globalEval", !t || ae._data(t[n], "globalEval"));
    }

    function C(e, t) {
        if (1 === t.nodeType && ae.hasData(e)) {
            var r,
                n,
                a,
                i = ae._data(e),
                o = ae._data(t, i),
                s = i.events;
            if (s) {
                delete o.handle, (o.events = {});
                for (r in s)
                    for (n = 0, a = s[r].length; n < a; n++) ae.event.add(t, r, s[r][n]);
            }
            o.data && (o.data = ae.extend({}, o.data));
        }
    }

    function _(e, t) {
        var r, n, a;
        if (1 === t.nodeType) {
            if (((r = t.nodeName.toLowerCase()), !re.noCloneEvent && t[ae.expando])) {
                a = ae._data(t);
                for (n in a.events) ae.removeEvent(t, n, a.handle);
                t.removeAttribute(ae.expando);
            }
            "script" === r && t.text !== e.text ?
                ((b(t).text = e.text), S(t)) :
                "object" === r ?
                (t.parentNode && (t.outerHTML = e.outerHTML), re.html5Clone && e.innerHTML && !ae.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) :
                "input" === r && Ee.test(e.type) ?
                ((t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value)) :
                "option" === r ?
                (t.defaultSelected = t.selected = e.defaultSelected) :
                ("input" !== r && "textarea" !== r) || (t.defaultValue = e.defaultValue);
        }
    }

    function x(t, r) {
        var n,
            a = ae(r.createElement(t)).appendTo(r.body),
            i = e.getDefaultComputedStyle && (n = e.getDefaultComputedStyle(a[0])) ? n.display : ae.css(a[0], "display");
        return a.detach(), i;
    }

    function P(e) {
        var t = fe,
            r = Xe[e];
        return (
            r ||
            ((r = x(e, t)),
                ("none" !== r && r) ||
                ((Je = (Je || ae("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement)), (t = (Je[0].contentWindow || Je[0].contentDocument).document), t.write(), t.close(), (r = x(e, t)), Je.detach()),
                (Xe[e] = r)),
            r
        );
    }

    function A(e, t) {
        return {
            get: function() {
                var r = e();
                if (null != r) return r ? void delete this.get : (this.get = t).apply(this, arguments);
            },
        };
    }

    function $(e, t) {
        if (t in e) return t;
        for (var r = t.charAt(0).toUpperCase() + t.slice(1), n = t, a = pt.length; a--;)
            if (((t = pt[a] + r), t in e)) return t;
        return n;
    }

    function D(e, t) {
        for (var r, n, a, i = [], o = 0, s = e.length; o < s; o++)
            (n = e[o]),
            n.style &&
            ((i[o] = ae._data(n, "olddisplay")),
                (r = n.style.display),
                t ?
                (i[o] || "none" !== r || (n.style.display = ""), "" === n.style.display && De(n) && (i[o] = ae._data(n, "olddisplay", P(n.nodeName)))) :
                ((a = De(n)), ((r && "none" !== r) || !a) && ae._data(n, "olddisplay", a ? r : ae.css(n, "display"))));
        for (o = 0; o < s; o++)(n = e[o]), n.style && ((t && "none" !== n.style.display && "" !== n.style.display) || (n.style.display = t ? i[o] || "" : "none"));
        return e;
    }

    function I(e, t, r) {
        var n = lt.exec(t);
        return n ? Math.max(0, n[1] - (r || 0)) + (n[2] || "px") : t;
    }

    function E(e, t, r, n, a) {
        for (var i = r === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; i < 4; i += 2)
            "margin" === r && (o += ae.css(e, r + $e[i], !0, a)),
            n ?
            ("content" === r && (o -= ae.css(e, "padding" + $e[i], !0, a)), "margin" !== r && (o -= ae.css(e, "border" + $e[i] + "Width", !0, a))) :
            ((o += ae.css(e, "padding" + $e[i], !0, a)), "padding" !== r && (o += ae.css(e, "border" + $e[i] + "Width", !0, a)));
        return o;
    }

    function B(e, t, r) {
        var n = !0,
            a = "width" === t ? e.offsetWidth : e.offsetHeight,
            i = et(e),
            o = re.boxSizing && "border-box" === ae.css(e, "boxSizing", !1, i);
        if (a <= 0 || null == a) {
            if (((a = tt(e, t, i)), (a < 0 || null == a) && (a = e.style[t]), nt.test(a))) return a;
            (n = o && (re.boxSizingReliable() || a === e.style[t])), (a = parseFloat(a) || 0);
        }
        return a + E(e, t, r || (o ? "border" : "content"), n, i) + "px";
    }

    function O(e, t, r, n, a) {
        return new O.prototype.init(e, t, r, n, a);
    }

    function k() {
        return (
            setTimeout(function() {
                ht = void 0;
            }),
            (ht = ae.now())
        );
    }

    function L(e, t) {
        var r,
            n = { height: e },
            a = 0;
        for (t = t ? 1 : 0; a < 4; a += 2 - t)(r = $e[a]), (n["margin" + r] = n["padding" + r] = e);
        return t && (n.opacity = n.width = e), n;
    }

    function T(e, t, r) {
        for (var n, a = (bt[t] || []).concat(bt["*"]), i = 0, o = a.length; i < o; i++)
            if ((n = a[i].call(r, t, e))) return n;
    }

    function R(e, t, r) {
        var n,
            a,
            i,
            o,
            s,
            l,
            d,
            c,
            u = this,
            p = {},
            h = e.style,
            f = e.nodeType && De(e),
            m = ae._data(e, "fxshow");
        r.queue ||
            ((s = ae._queueHooks(e, "fx")),
                null == s.unqueued &&
                ((s.unqueued = 0),
                    (l = s.empty.fire),
                    (s.empty.fire = function() {
                        s.unqueued || l();
                    })),
                s.unqueued++,
                u.always(function() {
                    u.always(function() {
                        s.unqueued--, ae.queue(e, "fx").length || s.empty.fire();
                    });
                })),
            1 === e.nodeType &&
            ("height" in t || "width" in t) &&
            ((r.overflow = [h.overflow, h.overflowX, h.overflowY]),
                (d = ae.css(e, "display")),
                (c = "none" === d ? ae._data(e, "olddisplay") || P(e.nodeName) : d),
                "inline" === c && "none" === ae.css(e, "float") && (re.inlineBlockNeedsLayout && "inline" !== P(e.nodeName) ? (h.zoom = 1) : (h.display = "inline-block"))),
            r.overflow &&
            ((h.overflow = "hidden"),
                re.shrinkWrapBlocks() ||
                u.always(function() {
                    (h.overflow = r.overflow[0]), (h.overflowX = r.overflow[1]), (h.overflowY = r.overflow[2]);
                }));
        for (n in t)
            if (((a = t[n]), mt.exec(a))) {
                if ((delete t[n], (i = i || "toggle" === a), a === (f ? "hide" : "show"))) {
                    if ("show" !== a || !m || void 0 === m[n]) continue;
                    f = !0;
                }
                p[n] = (m && m[n]) || ae.style(e, n);
            } else d = void 0;
        if (ae.isEmptyObject(p)) "inline" === ("none" === d ? P(e.nodeName) : d) && (h.display = d);
        else {
            m ? "hidden" in m && (f = m.hidden) : (m = ae._data(e, "fxshow", {})),
                i && (m.hidden = !f),
                f ?
                ae(e).show() :
                u.done(function() {
                    ae(e).hide();
                }),
                u.done(function() {
                    var t;
                    ae._removeData(e, "fxshow");
                    for (t in p) ae.style(e, t, p[t]);
                });
            for (n in p)(o = T(f ? m[n] : 0, n, u)), n in m || ((m[n] = o.start), f && ((o.end = o.start), (o.start = "width" === n || "height" === n ? 1 : 0)));
        }
    }

    function N(e, t) {
        var r, n, a, i, o;
        for (r in e)
            if (((n = ae.camelCase(r)), (a = t[n]), (i = e[r]), ae.isArray(i) && ((a = i[1]), (i = e[r] = i[0])), r !== n && ((e[n] = i), delete e[r]), (o = ae.cssHooks[n]), o && "expand" in o)) {
                (i = o.expand(i)), delete e[n];
                for (r in i) r in e || ((e[r] = i[r]), (t[r] = a));
            } else t[n] = a;
    }

    function q(e, t, r) {
        var n,
            a,
            i = 0,
            o = yt.length,
            s = ae.Deferred().always(function() {
                delete l.elem;
            }),
            l = function() {
                if (a) return !1;
                for (var t = ht || k(), r = Math.max(0, d.startTime + d.duration - t), n = r / d.duration || 0, i = 1 - n, o = 0, l = d.tweens.length; o < l; o++) d.tweens[o].run(i);
                return s.notifyWith(e, [d, i, r]), i < 1 && l ? r : (s.resolveWith(e, [d]), !1);
            },
            d = s.promise({
                elem: e,
                props: ae.extend({}, t),
                opts: ae.extend(!0, { specialEasing: {} }, r),
                originalProperties: t,
                originalOptions: r,
                startTime: ht || k(),
                duration: r.duration,
                tweens: [],
                createTween: function(t, r) {
                    var n = ae.Tween(e, d.opts, t, r, d.opts.specialEasing[t] || d.opts.easing);
                    return d.tweens.push(n), n;
                },
                stop: function(t) {
                    var r = 0,
                        n = t ? d.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; r < n; r++) d.tweens[r].run(1);
                    return t ? s.resolveWith(e, [d, t]) : s.rejectWith(e, [d, t]), this;
                },
            }),
            c = d.props;
        for (N(c, d.opts.specialEasing); i < o; i++)
            if ((n = yt[i].call(d, e, c, d.opts))) return n;
        return (
            ae.map(c, T, d),
            ae.isFunction(d.opts.start) && d.opts.start.call(e, d),
            ae.fx.timer(ae.extend(l, { elem: e, anim: d, queue: d.opts.queue })),
            d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always)
        );
    }

    function M(e) {
        return function(t, r) {
            "string" != typeof t && ((r = t), (t = "*"));
            var n,
                a = 0,
                i = t.toLowerCase().match(be) || [];
            if (ae.isFunction(r))
                for (;
                    (n = i[a++]);) "+" === n.charAt(0) ? ((n = n.slice(1) || "*"), (e[n] = e[n] || []).unshift(r)) : (e[n] = e[n] || []).push(r);
        };
    }

    function F(e, t, r, n) {
        function a(s) {
            var l;
            return (
                (i[s] = !0),
                ae.each(e[s] || [], function(e, s) {
                    var d = s(t, r, n);
                    return "string" != typeof d || o || i[d] ? (o ? !(l = d) : void 0) : (t.dataTypes.unshift(d), a(d), !1);
                }),
                l
            );
        }
        var i = {},
            o = e === zt;
        return a(t.dataTypes[0]) || (!i["*"] && a("*"));
    }

    function U(e, t) {
        var r,
            n,
            a = ae.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((a[n] ? e : r || (r = {}))[n] = t[n]);
        return r && ae.extend(!0, e, r), e;
    }

    function H(e, t, r) {
        for (var n, a, i, o, s = e.contents, l = e.dataTypes;
            "*" === l[0];) l.shift(), void 0 === a && (a = e.mimeType || t.getResponseHeader("Content-Type"));
        if (a)
            for (o in s)
                if (s[o] && s[o].test(a)) {
                    l.unshift(o);
                    break;
                }
        if (l[0] in r) i = l[0];
        else {
            for (o in r) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    i = o;
                    break;
                }
                n || (n = o);
            }
            i = i || n;
        }
        if (i) return i !== l[0] && l.unshift(i), r[i];
    }

    function z(e, t, r, n) {
        var a,
            i,
            o,
            s,
            l,
            d = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (o in e.converters) d[o.toLowerCase()] = e.converters[o];
        for (i = c.shift(); i;)
            if ((e.responseFields[i] && (r[e.responseFields[i]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (l = i), (i = c.shift())))
                if ("*" === i) i = l;
                else if ("*" !== l && l !== i) {
            if (((o = d[l + " " + i] || d["* " + i]), !o))
                for (a in d)
                    if (((s = a.split(" ")), s[1] === i && (o = d[l + " " + s[0]] || d["* " + s[0]]))) {
                        o === !0 ? (o = d[a]) : d[a] !== !0 && ((i = s[0]), c.unshift(s[1]));
                        break;
                    }
            if (o !== !0)
                if (o && e["throws"]) t = o(t);
                else
                    try {
                        t = o(t);
                    } catch (u) {
                        return { state: "parsererror", error: o ? u : "No conversion from " + l + " to " + i };
                    }
        }
        return { state: "success", data: t };
    }

    function V(e, t, r, n) {
        var a;
        if (ae.isArray(t))
            ae.each(t, function(t, a) {
                r || Wt.test(e) ? n(e, a) : V(e + "[" + ("object" == typeof a ? t : "") + "]", a, r, n);
            });
        else if (r || "object" !== ae.type(t)) n(e, t);
        else
            for (a in t) V(e + "[" + a + "]", t[a], r, n);
    }

    function j() {
        try {
            return new e.XMLHttpRequest();
        } catch (t) {}
    }

    function G() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP");
        } catch (t) {}
    }

    function W(e) {
        return ae.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow);
    }
    var Y = [],
        K = Y.slice,
        Q = Y.concat,
        Z = Y.push,
        J = Y.indexOf,
        X = {},
        ee = X.toString,
        te = X.hasOwnProperty,
        re = {},
        ne = "1.11.2",
        ae = function(e, t) {
            return new ae.fn.init(e, t);
        },
        ie = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        oe = /^-ms-/,
        se = /-([\da-z])/gi,
        le = function(e, t) {
            return t.toUpperCase();
        };
    (ae.fn = ae.prototype = {
        jquery: ne,
        constructor: ae,
        selector: "",
        length: 0,
        toArray: function() {
            return K.call(this);
        },
        get: function(e) {
            return null != e ? (e < 0 ? this[e + this.length] : this[e]) : K.call(this);
        },
        pushStack: function(e) {
            var t = ae.merge(this.constructor(), e);
            return (t.prevObject = this), (t.context = this.context), t;
        },
        each: function(e, t) {
            return ae.each(this, e, t);
        },
        map: function(e) {
            return this.pushStack(
                ae.map(this, function(t, r) {
                    return e.call(t, r, t);
                })
            );
        },
        slice: function() {
            return this.pushStack(K.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length,
                r = +e + (e < 0 ? t : 0);
            return this.pushStack(r >= 0 && r < t ? [this[r]] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: Z,
        sort: Y.sort,
        splice: Y.splice,
    }),
    (ae.extend = ae.fn.extend = function() {
        var e,
            t,
            r,
            n,
            a,
            i,
            o = arguments[0] || {},
            s = 1,
            l = arguments.length,
            d = !1;
        for ("boolean" == typeof o && ((d = o), (o = arguments[s] || {}), s++), "object" == typeof o || ae.isFunction(o) || (o = {}), s === l && ((o = this), s--); s < l; s++)
            if (null != (a = arguments[s]))
                for (n in a)
                    (e = o[n]),
                    (r = a[n]),
                    o !== r &&
                    (d && r && (ae.isPlainObject(r) || (t = ae.isArray(r))) ?
                        (t ? ((t = !1), (i = e && ae.isArray(e) ? e : [])) : (i = e && ae.isPlainObject(e) ? e : {}), (o[n] = ae.extend(d, i, r))) :
                        void 0 !== r && (o[n] = r));
        return o;
    }),
    ae.extend({
            expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e);
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === ae.type(e);
            },
            isArray: Array.isArray ||
                function(e) {
                    return "array" === ae.type(e);
                },
            isWindow: function(e) {
                return null != e && e == e.window;
            },
            isNumeric: function(e) {
                return !ae.isArray(e) && e - parseFloat(e) + 1 >= 0;
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0;
            },
            isPlainObject: function(e) {
                var t;
                if (!e || "object" !== ae.type(e) || e.nodeType || ae.isWindow(e)) return !1;
                try {
                    if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (r) {
                    return !1;
                }
                if (re.ownLast)
                    for (t in e) return te.call(e, t);
                for (t in e);
                return void 0 === t || te.call(e, t);
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? X[ee.call(e)] || "object" : typeof e;
            },
            globalEval: function(t) {
                t &&
                    ae.trim(t) &&
                    (
                        e.execScript ||
                        function(t) {
                            e.eval.call(e, t);
                        }
                    )(t);
            },
            camelCase: function(e) {
                return e.replace(oe, "ms-").replace(se, le);
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            },
            each: function(e, t, n) {
                var a,
                    i = 0,
                    o = e.length,
                    s = r(e);
                if (n) {
                    if (s)
                        for (; i < o && ((a = t.apply(e[i], n)), a !== !1); i++);
                    else
                        for (i in e)
                            if (((a = t.apply(e[i], n)), a === !1)) break;
                } else if (s)
                    for (; i < o && ((a = t.call(e[i], i, e[i])), a !== !1); i++);
                else
                    for (i in e)
                        if (((a = t.call(e[i], i, e[i])), a === !1)) break;
                return e;
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(ie, "");
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (r(Object(e)) ? ae.merge(n, "string" == typeof e ? [e] : e) : Z.call(n, e)), n;
            },
            inArray: function(e, t, r) {
                var n;
                if (t) {
                    if (J) return J.call(t, e, r);
                    for (n = t.length, r = r ? (r < 0 ? Math.max(0, n + r) : r) : 0; r < n; r++)
                        if (r in t && t[r] === e) return r;
                }
                return -1;
            },
            merge: function(e, t) {
                for (var r = +t.length, n = 0, a = e.length; n < r;) e[a++] = t[n++];
                if (r !== r)
                    for (; void 0 !== t[n];) e[a++] = t[n++];
                return (e.length = a), e;
            },
            grep: function(e, t, r) {
                for (var n, a = [], i = 0, o = e.length, s = !r; i < o; i++)(n = !t(e[i], i)), n !== s && a.push(e[i]);
                return a;
            },
            map: function(e, t, n) {
                var a,
                    i = 0,
                    o = e.length,
                    s = r(e),
                    l = [];
                if (s)
                    for (; i < o; i++)(a = t(e[i], i, n)), null != a && l.push(a);
                else
                    for (i in e)(a = t(e[i], i, n)), null != a && l.push(a);
                return Q.apply([], l);
            },
            guid: 1,
            proxy: function(e, t) {
                var r, n, a;
                if (("string" == typeof t && ((a = e[t]), (t = e), (e = a)), ae.isFunction(e)))
                    return (
                        (r = K.call(arguments, 2)),
                        (n = function() {
                            return e.apply(t || this, r.concat(K.call(arguments)));
                        }),
                        (n.guid = e.guid = e.guid || ae.guid++),
                        n
                    );
            },
            now: function() {
                return +new Date();
            },
            support: re,
        }),
        ae.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            X["[object " + t + "]"] = t.toLowerCase();
        });
    var de = (function(e) {
        function t(e, t, r, n) {
            var a, i, o, s, l, d, u, h, f, m;
            if (((t ? t.ownerDocument || t : F) !== O && B(t), (t = t || O), (r = r || []), (s = t.nodeType), "string" != typeof e || !e || (1 !== s && 9 !== s && 11 !== s))) return r;
            if (!n && L) {
                if (11 !== s && (a = ye.exec(e)))
                    if ((o = a[1])) {
                        if (9 === s) {
                            if (((i = t.getElementById(o)), !i || !i.parentNode)) return r;
                            if (i.id === o) return r.push(i), r;
                        } else if (t.ownerDocument && (i = t.ownerDocument.getElementById(o)) && q(t, i) && i.id === o) return r.push(i), r;
                    } else {
                        if (a[2]) return J.apply(r, t.getElementsByTagName(e)), r;
                        if ((o = a[3]) && w.getElementsByClassName) return J.apply(r, t.getElementsByClassName(o)), r;
                    }
                if (w.qsa && (!T || !T.test(e))) {
                    if (((h = u = M), (f = t), (m = 1 !== s && e), 1 === s && "object" !== t.nodeName.toLowerCase())) {
                        for (d = P(e), (u = t.getAttribute("id")) ? (h = u.replace(Se, "\\$&")) : t.setAttribute("id", h), h = "[id='" + h + "'] ", l = d.length; l--;) d[l] = h + p(d[l]);
                        (f = (be.test(e) && c(t.parentNode)) || t), (m = d.join(","));
                    }
                    if (m)
                        try {
                            return J.apply(r, f.querySelectorAll(m)), r;
                        } catch (g) {} finally {
                            u || t.removeAttribute("id");
                        }
                }
            }
            return $(e.replace(le, "$1"), t, r, n);
        }

        function r() {
            function e(r, n) {
                return t.push(r + " ") > C.cacheLength && delete e[t.shift()], (e[r + " "] = n);
            }
            var t = [];
            return e;
        }

        function n(e) {
            return (e[M] = !0), e;
        }

        function a(e) {
            var t = O.createElement("div");
            try {
                return !!e(t);
            } catch (r) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
            }
        }

        function i(e, t) {
            for (var r = e.split("|"), n = e.length; n--;) C.attrHandle[r[n]] = t;
        }

        function o(e, t) {
            var r = t && e,
                n = r && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || W) - (~e.sourceIndex || W);
            if (n) return n;
            if (r)
                for (;
                    (r = r.nextSibling);)
                    if (r === t) return -1;
            return e ? 1 : -1;
        }

        function s(e) {
            return function(t) {
                var r = t.nodeName.toLowerCase();
                return "input" === r && t.type === e;
            };
        }

        function l(e) {
            return function(t) {
                var r = t.nodeName.toLowerCase();
                return ("input" === r || "button" === r) && t.type === e;
            };
        }

        function d(e) {
            return n(function(t) {
                return (
                    (t = +t),
                    n(function(r, n) {
                        for (var a, i = e([], r.length, t), o = i.length; o--;) r[(a = i[o])] && (r[a] = !(n[a] = r[a]));
                    })
                );
            });
        }

        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e;
        }

        function u() {}

        function p(e) {
            for (var t = 0, r = e.length, n = ""; t < r; t++) n += e[t].value;
            return n;
        }

        function h(e, t, r) {
            var n = t.dir,
                a = r && "parentNode" === n,
                i = H++;
            return t.first ?

                function(t, r, i) {
                    for (;
                        (t = t[n]);)
                        if (1 === t.nodeType || a) return e(t, r, i);
                } :
                function(t, r, o) {
                    var s,
                        l,
                        d = [U, i];
                    if (o) {
                        for (;
                            (t = t[n]);)
                            if ((1 === t.nodeType || a) && e(t, r, o)) return !0;
                    } else
                        for (;
                            (t = t[n]);)
                            if (1 === t.nodeType || a) {
                                if (((l = t[M] || (t[M] = {})), (s = l[n]) && s[0] === U && s[1] === i)) return (d[2] = s[2]);
                                if (((l[n] = d), (d[2] = e(t, r, o)))) return !0;
                            }
                };
        }

        function f(e) {
            return e.length > 1 ?

                function(t, r, n) {
                    for (var a = e.length; a--;)
                        if (!e[a](t, r, n)) return !1;
                    return !0;
                } :
                e[0];
        }

        function m(e, r, n) {
            for (var a = 0, i = r.length; a < i; a++) t(e, r[a], n);
            return n;
        }

        function g(e, t, r, n, a) {
            for (var i, o = [], s = 0, l = e.length, d = null != t; s < l; s++)(i = e[s]) && ((r && !r(i, n, a)) || (o.push(i), d && t.push(s)));
            return o;
        }

        function v(e, t, r, a, i, o) {
            return (
                a && !a[M] && (a = v(a)),
                i && !i[M] && (i = v(i, o)),
                n(function(n, o, s, l) {
                    var d,
                        c,
                        u,
                        p = [],
                        h = [],
                        f = o.length,
                        v = n || m(t || "*", s.nodeType ? [s] : s, []),
                        y = !e || (!n && t) ? v : g(v, p, e, s, l),
                        b = r ? (i || (n ? e : f || a) ? [] : o) : y;
                    if ((r && r(y, b, s, l), a))
                        for (d = g(b, h), a(d, [], s, l), c = d.length; c--;)(u = d[c]) && (b[h[c]] = !(y[h[c]] = u));
                    if (n) {
                        if (i || e) {
                            if (i) {
                                for (d = [], c = b.length; c--;)(u = b[c]) && d.push((y[c] = u));
                                i(null, (b = []), d, l);
                            }
                            for (c = b.length; c--;)(u = b[c]) && (d = i ? ee(n, u) : p[c]) > -1 && (n[d] = !(o[d] = u));
                        }
                    } else(b = g(b === o ? b.splice(f, b.length) : b)), i ? i(null, o, b, l) : J.apply(o, b);
                })
            );
        }

        function y(e) {
            for (
                var t,
                    r,
                    n,
                    a = e.length,
                    i = C.relative[e[0].type],
                    o = i || C.relative[" "],
                    s = i ? 1 : 0,
                    l = h(
                        function(e) {
                            return e === t;
                        },
                        o, !0
                    ),
                    d = h(
                        function(e) {
                            return ee(t, e) > -1;
                        },
                        o, !0
                    ),
                    c = [
                        function(e, r, n) {
                            var a = (!i && (n || r !== D)) || ((t = r).nodeType ? l(e, r, n) : d(e, r, n));
                            return (t = null), a;
                        },
                    ]; s < a; s++
            )
                if ((r = C.relative[e[s].type])) c = [h(f(c), r)];
                else {
                    if (((r = C.filter[e[s].type].apply(null, e[s].matches)), r[M])) {
                        for (n = ++s; n < a && !C.relative[e[n].type]; n++);
                        return v(s > 1 && f(c), s > 1 && p(e.slice(0, s - 1).concat({ value: " " === e[s - 2].type ? "*" : "" })).replace(le, "$1"), r, s < n && y(e.slice(s, n)), n < a && y((e = e.slice(n))), n < a && p(e));
                    }
                    c.push(r);
                }
            return f(c);
        }

        function b(e, r) {
            var a = r.length > 0,
                i = e.length > 0,
                o = function(n, o, s, l, d) {
                    var c,
                        u,
                        p,
                        h = 0,
                        f = "0",
                        m = n && [],
                        v = [],
                        y = D,
                        b = n || (i && C.find.TAG("*", d)),
                        S = (U += null == y ? 1 : Math.random() || 0.1),
                        w = b.length;
                    for (d && (D = o !== O && o); f !== w && null != (c = b[f]); f++) {
                        if (i && c) {
                            for (u = 0;
                                (p = e[u++]);)
                                if (p(c, o, s)) {
                                    l.push(c);
                                    break;
                                }
                            d && (U = S);
                        }
                        a && ((c = !p && c) && h--, n && m.push(c));
                    }
                    if (((h += f), a && f !== h)) {
                        for (u = 0;
                            (p = r[u++]);) p(m, v, o, s);
                        if (n) {
                            if (h > 0)
                                for (; f--;) m[f] || v[f] || (v[f] = Q.call(l));
                            v = g(v);
                        }
                        J.apply(l, v), d && !n && v.length > 0 && h + r.length > 1 && t.uniqueSort(l);
                    }
                    return d && ((U = S), (D = y)), m;
                };
            return a ? n(o) : o;
        }
        var S,
            w,
            C,
            _,
            x,
            P,
            A,
            $,
            D,
            I,
            E,
            B,
            O,
            k,
            L,
            T,
            R,
            N,
            q,
            M = "sizzle" + 1 * new Date(),
            F = e.document,
            U = 0,
            H = 0,
            z = r(),
            V = r(),
            j = r(),
            G = function(e, t) {
                return e === t && (E = !0), 0;
            },
            W = 1 << 31,
            Y = {}.hasOwnProperty,
            K = [],
            Q = K.pop,
            Z = K.push,
            J = K.push,
            X = K.slice,
            ee = function(e, t) {
                for (var r = 0, n = e.length; r < n; r++)
                    if (e[r] === t) return r;
                return -1;
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            re = "[\\x20\\t\\r\\n\\f]",
            ne = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ae = ne.replace("w", "w#"),
            ie = "\\[" + re + "*(" + ne + ")(?:" + re + "*([*^$|!~]?=)" + re + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ae + "))|)" + re + "*\\]",
            oe = ":(" + ne + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
            se = new RegExp(re + "+", "g"),
            le = new RegExp("^" + re + "+|((?:^|[^\\\\])(?:\\\\.)*)" + re + "+$", "g"),
            de = new RegExp("^" + re + "*," + re + "*"),
            ce = new RegExp("^" + re + "*([>+~]|" + re + ")" + re + "*"),
            ue = new RegExp("=" + re + "*([^\\]'\"]*?)" + re + "*\\]", "g"),
            pe = new RegExp(oe),
            he = new RegExp("^" + ae + "$"),
            fe = {
                ID: new RegExp("^#(" + ne + ")"),
                CLASS: new RegExp("^\\.(" + ne + ")"),
                TAG: new RegExp("^(" + ne.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ie),
                PSEUDO: new RegExp("^" + oe),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + re + "*(even|odd|(([+-]|)(\\d*)n|)" + re + "*(?:([+-]|)" + re + "*(\\d+)|))" + re + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + re + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + re + "*((?:-\\d)?\\d*)" + re + "*\\)|)(?=[^-]|$)", "i"),
            },
            me = /^(?:input|select|textarea|button)$/i,
            ge = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            be = /[+~]/,
            Se = /'|\\/g,
            we = new RegExp("\\\\([\\da-f]{1,6}" + re + "?|(" + re + ")|.)", "ig"),
            Ce = function(e, t, r) {
                var n = "0x" + t - 65536;
                return n !== n || r ? t : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
            },
            _e = function() {
                B();
            };
        try {
            J.apply((K = X.call(F.childNodes)), F.childNodes), K[F.childNodes.length].nodeType;
        } catch (xe) {
            J = {
                apply: K.length ?

                    function(e, t) {
                        Z.apply(e, X.call(t));
                    } : function(e, t) {
                        for (var r = e.length, n = 0;
                            (e[r++] = t[n++]););
                        e.length = r - 1;
                    },
            };
        }
        (w = t.support = {}),
        (x = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName;
        }),
        (B = t.setDocument = function(e) {
            var t,
                r,
                n = e ? e.ownerDocument || e : F;
            return n !== O && 9 === n.nodeType && n.documentElement ?
                ((O = n),
                    (k = n.documentElement),
                    (r = n.defaultView),
                    r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", _e, !1) : r.attachEvent && r.attachEvent("onunload", _e)),
                    (L = !x(n)),
                    (w.attributes = a(function(e) {
                        return (e.className = "i"), !e.getAttribute("className");
                    })),
                    (w.getElementsByTagName = a(function(e) {
                        return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length;
                    })),
                    (w.getElementsByClassName = ve.test(n.getElementsByClassName)),
                    (w.getById = a(function(e) {
                        return (k.appendChild(e).id = M), !n.getElementsByName || !n.getElementsByName(M).length;
                    })),
                    w.getById ?
                    ((C.find.ID = function(e, t) {
                            if ("undefined" != typeof t.getElementById && L) {
                                var r = t.getElementById(e);
                                return r && r.parentNode ? [r] : [];
                            }
                        }),
                        (C.filter.ID = function(e) {
                            var t = e.replace(we, Ce);
                            return function(e) {
                                return e.getAttribute("id") === t;
                            };
                        })) :
                    (delete C.find.ID,
                        (C.filter.ID = function(e) {
                            var t = e.replace(we, Ce);
                            return function(e) {
                                var r = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                return r && r.value === t;
                            };
                        })),
                    (C.find.TAG = w.getElementsByTagName ?

                        function(e, t) {
                            return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0;
                        } :
                        function(e, t) {
                            var r,
                                n = [],
                                a = 0,
                                i = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (;
                                    (r = i[a++]);) 1 === r.nodeType && n.push(r);
                                return n;
                            }
                            return i;
                        }),
                    (C.find.CLASS =
                        w.getElementsByClassName &&
                        function(e, t) {
                            if (L) return t.getElementsByClassName(e);
                        }),
                    (R = []),
                    (T = []),
                    (w.qsa = ve.test(n.querySelectorAll)) &&
                    (a(function(e) {
                            (k.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\f]' msallowcapture=''><option selected=''></option></select>"),
                            e.querySelectorAll("[msallowcapture^='']").length && T.push("[*^$]=" + re + "*(?:''|\"\")"),
                                e.querySelectorAll("[selected]").length || T.push("\\[" + re + "*(?:value|" + te + ")"),
                                e.querySelectorAll("[id~=" + M + "-]").length || T.push("~="),
                                e.querySelectorAll(":checked").length || T.push(":checked"),
                                e.querySelectorAll("a#" + M + "+*").length || T.push(".#.+[+~]");
                        }),
                        a(function(e) {
                            var t = n.createElement("input");
                            t.setAttribute("type", "hidden"),
                                e.appendChild(t).setAttribute("name", "D"),
                                e.querySelectorAll("[name=d]").length && T.push("name" + re + "*[*^$|!~]?="),
                                e.querySelectorAll(":enabled").length || T.push(":enabled", ":disabled"),
                                e.querySelectorAll("*,:x"),
                                T.push(",.*:");
                        })),
                    (w.matchesSelector = ve.test((N = k.matches || k.webkitMatchesSelector || k.mozMatchesSelector || k.oMatchesSelector || k.msMatchesSelector))) &&
                    a(function(e) {
                        (w.disconnectedMatch = N.call(e, "div")), N.call(e, "[s!='']:x"), R.push("!=", oe);
                    }),
                    (T = T.length && new RegExp(T.join("|"))),
                    (R = R.length && new RegExp(R.join("|"))),
                    (t = ve.test(k.compareDocumentPosition)),
                    (q =
                        t || ve.test(k.contains) ?

                        function(e, t) {
                            var r = 9 === e.nodeType ? e.documentElement : e,
                                n = t && t.parentNode;
                            return e === n || !(!n || 1 !== n.nodeType || !(r.contains ? r.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)));
                        } :
                        function(e, t) {
                            if (t)
                                for (;
                                    (t = t.parentNode);)
                                    if (t === e) return !0;
                            return !1;
                        }),
                    (G = t ?

                        function(e, t) {
                            if (e === t) return (E = !0), 0;
                            var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                            return r ?
                                r :
                                ((r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1),
                                    1 & r || (!w.sortDetached && t.compareDocumentPosition(e) === r) ?
                                    e === n || (e.ownerDocument === F && q(F, e)) ?
                                    -1 :
                                    t === n || (t.ownerDocument === F && q(F, t)) ?
                                    1 :
                                    I ?
                                    ee(I, e) - ee(I, t) :
                                    0 :
                                    4 & r ?
                                    -1 :
                                    1);
                        } :
                        function(e, t) {
                            if (e === t) return (E = !0), 0;
                            var r,
                                a = 0,
                                i = e.parentNode,
                                s = t.parentNode,
                                l = [e],
                                d = [t];
                            if (!i || !s) return e === n ? -1 : t === n ? 1 : i ? -1 : s ? 1 : I ? ee(I, e) - ee(I, t) : 0;
                            if (i === s) return o(e, t);
                            for (r = e;
                                (r = r.parentNode);) l.unshift(r);
                            for (r = t;
                                (r = r.parentNode);) d.unshift(r);
                            for (; l[a] === d[a];) a++;
                            return a ? o(l[a], d[a]) : l[a] === F ? -1 : d[a] === F ? 1 : 0;
                        }),
                    n) :
                O;
        }),
        (t.matches = function(e, r) {
            return t(e, null, null, r);
        }),
        (t.matchesSelector = function(e, r) {
            if (((e.ownerDocument || e) !== O && B(e), (r = r.replace(ue, "='$1']")), w.matchesSelector && L && (!R || !R.test(r)) && (!T || !T.test(r))))
                try {
                    var n = N.call(e, r);
                    if (n || w.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return n;
                } catch (a) {}
            return t(r, O, null, [e]).length > 0;
        }),
        (t.contains = function(e, t) {
            return (e.ownerDocument || e) !== O && B(e), q(e, t);
        }),
        (t.attr = function(e, t) {
            (e.ownerDocument || e) !== O && B(e);
            var r = C.attrHandle[t.toLowerCase()],
                n = r && Y.call(C.attrHandle, t.toLowerCase()) ? r(e, t, !L) : void 0;
            return void 0 !== n ? n : w.attributes || !L ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null;
        }),
        (t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }),
        (t.uniqueSort = function(e) {
            var t,
                r = [],
                n = 0,
                a = 0;
            if (((E = !w.detectDuplicates), (I = !w.sortStable && e.slice(0)), e.sort(G), E)) {
                for (;
                    (t = e[a++]);) t === e[a] && (n = r.push(a));
                for (; n--;) e.splice(r[n], 1);
            }
            return (I = null), e;
        }),
        (_ = t.getText = function(e) {
            var t,
                r = "",
                n = 0,
                a = e.nodeType;
            if (a) {
                if (1 === a || 9 === a || 11 === a) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) r += _(e);
                } else if (3 === a || 4 === a) return e.nodeValue;
            } else
                for (;
                    (t = e[n++]);) r += _(t);
            return r;
        }),
        (C = t.selectors = {
            cacheLength: 50,
            createPseudo: n,
            match: fe,
            attrHandle: {},
            find: {},
            relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
            preFilter: {
                ATTR: function(e) {
                    return (e[1] = e[1].replace(we, Ce)), (e[3] = (e[3] || e[4] || e[5] || "").replace(we, Ce)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function(e) {
                    return (
                        (e[1] = e[1].toLowerCase()),
                        "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3]))) : e[3] && t.error(e[0]),
                        e
                    );
                },
                PSEUDO: function(e) {
                    var t,
                        r = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ?
                        null :
                        (e[3] ? (e[2] = e[4] || e[5] || "") : r && pe.test(r) && (t = P(r, !0)) && (t = r.indexOf(")", r.length - t) - r.length) && ((e[0] = e[0].slice(0, t)), (e[2] = r.slice(0, t))), e.slice(0, 3));
                },
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, Ce).toLowerCase();
                    return "*" === e ?

                        function() {
                            return !0;
                        } :
                        function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t;
                        };
                },
                CLASS: function(e) {
                    var t = z[e + " "];
                    return (
                        t ||
                        ((t = new RegExp("(^|" + re + ")" + e + "(" + re + "|$)")) &&
                            z(e, function(e) {
                                return t.test(("string" == typeof e.className && e.className) || ("undefined" != typeof e.getAttribute && e.getAttribute("class")) || "");
                            }))
                    );
                },
                ATTR: function(e, r, n) {
                    return function(a) {
                        var i = t.attr(a, e);
                        return null == i ?
                            "!=" === r :
                            !r ||
                            ((i += ""),
                                "=" === r ?
                                i === n :
                                "!=" === r ?
                                i !== n :
                                "^=" === r ?
                                n && 0 === i.indexOf(n) :
                                "*=" === r ?
                                n && i.indexOf(n) > -1 :
                                "$=" === r ?
                                n && i.slice(-n.length) === n :
                                "~=" === r ?
                                (" " + i.replace(se, " ") + " ").indexOf(n) > -1 :
                                "|=" === r && (i === n || i.slice(0, n.length + 1) === n + "-"));
                    };
                },
                CHILD: function(e, t, r, n, a) {
                    var i = "nth" !== e.slice(0, 3),
                        o = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === n && 0 === a ?

                        function(e) {
                            return !!e.parentNode;
                        } :
                        function(t, r, l) {
                            var d,
                                c,
                                u,
                                p,
                                h,
                                f,
                                m = i !== o ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = s && t.nodeName.toLowerCase(),
                                y = !l && !s;
                            if (g) {
                                if (i) {
                                    for (; m;) {
                                        for (u = t;
                                            (u = u[m]);)
                                            if (s ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                        f = m = "only" === e && !f && "nextSibling";
                                    }
                                    return !0;
                                }
                                if (((f = [o ? g.firstChild : g.lastChild]), o && y)) {
                                    for (c = g[M] || (g[M] = {}), d = c[e] || [], h = d[0] === U && d[1], p = d[0] === U && d[2], u = h && g.childNodes[h];
                                        (u = (++h && u && u[m]) || (p = h = 0) || f.pop());)
                                        if (1 === u.nodeType && ++p && u === t) {
                                            c[e] = [U, h, p];
                                            break;
                                        }
                                } else if (y && (d = (t[M] || (t[M] = {}))[e]) && d[0] === U) p = d[1];
                                else
                                    for (;
                                        (u = (++h && u && u[m]) || (p = h = 0) || f.pop()) && ((s ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++p || (y && ((u[M] || (u[M] = {}))[e] = [U, p]), u !== t)););
                                return (p -= a), p === n || (p % n === 0 && p / n >= 0);
                            }
                        };
                },
                PSEUDO: function(e, r) {
                    var a,
                        i = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return i[M] ?
                        i(r) :
                        i.length > 1 ?
                        ((a = [e, e, "", r]),
                            C.setFilters.hasOwnProperty(e.toLowerCase()) ?
                            n(function(e, t) {
                                for (var n, a = i(e, r), o = a.length; o--;)(n = ee(e, a[o])), (e[n] = !(t[n] = a[o]));
                            }) :
                            function(e) {
                                return i(e, 0, a);
                            }) :
                        i;
                },
            },
            pseudos: {
                not: n(function(e) {
                    var t = [],
                        r = [],
                        a = A(e.replace(le, "$1"));
                    return a[M] ?
                        n(function(e, t, r, n) {
                            for (var i, o = a(e, null, n, []), s = e.length; s--;)(i = o[s]) && (e[s] = !(t[s] = i));
                        }) :
                        function(e, n, i) {
                            return (t[0] = e), a(t, null, i, r), (t[0] = null), !r.pop();
                        };
                }),
                has: n(function(e) {
                    return function(r) {
                        return t(e, r).length > 0;
                    };
                }),
                contains: n(function(e) {
                    return (
                        (e = e.replace(we, Ce)),
                        function(t) {
                            return (t.textContent || t.innerText || _(t)).indexOf(e) > -1;
                        }
                    );
                }),
                lang: n(function(e) {
                    return (
                        he.test(e || "") || t.error("unsupported lang: " + e),
                        (e = e.replace(we, Ce).toLowerCase()),
                        function(t) {
                            var r;
                            do
                                if ((r = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (r = r.toLowerCase()), r === e || 0 === r.indexOf(e + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1;
                        }
                    );
                }),
                target: function(t) {
                    var r = e.location && e.location.hash;
                    return r && r.slice(1) === t.id;
                },
                root: function(e) {
                    return e === k;
                },
                focus: function(e) {
                    return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return e.disabled === !1;
                },
                disabled: function(e) {
                    return e.disabled === !0;
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(e) {
                    return !C.pseudos.empty(e);
                },
                header: function(e) {
                    return ge.test(e.nodeName);
                },
                input: function(e) {
                    return me.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t && "button" === e.type) || "button" === t;
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                },
                first: d(function() {
                    return [0];
                }),
                last: d(function(e, t) {
                    return [t - 1];
                }),
                eq: d(function(e, t, r) {
                    return [r < 0 ? r + t : r];
                }),
                even: d(function(e, t) {
                    for (var r = 0; r < t; r += 2) e.push(r);
                    return e;
                }),
                odd: d(function(e, t) {
                    for (var r = 1; r < t; r += 2) e.push(r);
                    return e;
                }),
                lt: d(function(e, t, r) {
                    for (var n = r < 0 ? r + t : r; --n >= 0;) e.push(n);
                    return e;
                }),
                gt: d(function(e, t, r) {
                    for (var n = r < 0 ? r + t : r; ++n < t;) e.push(n);
                    return e;
                }),
            },
        }),
        (C.pseudos.nth = C.pseudos.eq);
        for (S in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) C.pseudos[S] = s(S);
        for (S in { submit: !0, reset: !0 }) C.pseudos[S] = l(S);
        return (
            (u.prototype = C.filters = C.pseudos),
            (C.setFilters = new u()),
            (P = t.tokenize = function(e, r) {
                var n,
                    a,
                    i,
                    o,
                    s,
                    l,
                    d,
                    c = V[e + " "];
                if (c) return r ? 0 : c.slice(0);
                for (s = e, l = [], d = C.preFilter; s;) {
                    (n && !(a = de.exec(s))) || (a && (s = s.slice(a[0].length) || s), l.push((i = []))), (n = !1), (a = ce.exec(s)) && ((n = a.shift()), i.push({ value: n, type: a[0].replace(le, " ") }), (s = s.slice(n.length)));
                    for (o in C.filter) !(a = fe[o].exec(s)) || (d[o] && !(a = d[o](a))) || ((n = a.shift()), i.push({ value: n, type: o, matches: a }), (s = s.slice(n.length)));
                    if (!n) break;
                }
                return r ? s.length : s ? t.error(e) : V(e, l).slice(0);
            }),
            (A = t.compile = function(e, t) {
                var r,
                    n = [],
                    a = [],
                    i = j[e + " "];
                if (!i) {
                    for (t || (t = P(e)), r = t.length; r--;)(i = y(t[r])), i[M] ? n.push(i) : a.push(i);
                    (i = j(e, b(a, n))), (i.selector = e);
                }
                return i;
            }),
            ($ = t.select = function(e, t, r, n) {
                var a,
                    i,
                    o,
                    s,
                    l,
                    d = "function" == typeof e && e,
                    u = !n && P((e = d.selector || e));
                if (((r = r || []), 1 === u.length)) {
                    if (((i = u[0] = u[0].slice(0)), i.length > 2 && "ID" === (o = i[0]).type && w.getById && 9 === t.nodeType && L && C.relative[i[1].type])) {
                        if (((t = (C.find.ID(o.matches[0].replace(we, Ce), t) || [])[0]), !t)) return r;
                        d && (t = t.parentNode), (e = e.slice(i.shift().value.length));
                    }
                    for (a = fe.needsContext.test(e) ? 0 : i.length; a-- && ((o = i[a]), !C.relative[(s = o.type)]);)
                        if ((l = C.find[s]) && (n = l(o.matches[0].replace(we, Ce), (be.test(i[0].type) && c(t.parentNode)) || t))) {
                            if ((i.splice(a, 1), (e = n.length && p(i)), !e)) return J.apply(r, n), r;
                            break;
                        }
                }
                return (d || A(e, u))(n, t, !L, r, (be.test(e) && c(t.parentNode)) || t), r;
            }),
            (w.sortStable = M.split("").sort(G).join("") === M),
            (w.detectDuplicates = !!E),
            B(),
            (w.sortDetached = a(function(e) {
                return 1 & e.compareDocumentPosition(O.createElement("div"));
            })),
            a(function(e) {
                return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
            }) ||
            i("type|href|height|width", function(e, t, r) {
                if (!r) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
            }),
            (w.attributes &&
                a(function(e) {
                    return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                })) ||
            i("value", function(e, t, r) {
                if (!r && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
            }),
            a(function(e) {
                return null == e.getAttribute("disabled");
            }) ||
            i(te, function(e, t, r) {
                var n;
                if (!r) return e[t] === !0 ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null;
            }),
            t
        );
    })(e);
    (ae.find = de), (ae.expr = de.selectors), (ae.expr[":"] = ae.expr.pseudos), (ae.unique = de.uniqueSort), (ae.text = de.getText), (ae.isXMLDoc = de.isXML), (ae.contains = de.contains);
    var ce = ae.expr.match.needsContext,
        ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        pe = /^.[^:#\[\.,]*$/;
    (ae.filter = function(e, t, r) {
        var n = t[0];
        return (
            r && (e = ":not(" + e + ")"),
            1 === t.length && 1 === n.nodeType ?
            ae.find.matchesSelector(n, e) ? [n] : [] :
            ae.find.matches(
                e,
                ae.grep(t, function(e) {
                    return 1 === e.nodeType;
                })
            )
        );
    }),
    ae.fn.extend({
        find: function(e) {
            var t,
                r = [],
                n = this,
                a = n.length;
            if ("string" != typeof e)
                return this.pushStack(
                    ae(e).filter(function() {
                        for (t = 0; t < a; t++)
                            if (ae.contains(n[t], this)) return !0;
                    })
                );
            for (t = 0; t < a; t++) ae.find(e, n[t], r);
            return (r = this.pushStack(a > 1 ? ae.unique(r) : r)), (r.selector = this.selector ? this.selector + " " + e : e), r;
        },
        filter: function(e) {
            return this.pushStack(n(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(n(this, e || [], !0));
        },
        is: function(e) {
            return !!n(this, "string" == typeof e && ce.test(e) ? ae(e) : e || [], !1).length;
        },
    });
    var he,
        fe = e.document,
        me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ge = (ae.fn.init = function(e, t) {
            var r, n;
            if (!e) return this;
            if ("string" == typeof e) {
                if (((r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : me.exec(e)), !r || (!r[1] && t))) return !t || t.jquery ? (t || he).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (((t = t instanceof ae ? t[0] : t), ae.merge(this, ae.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : fe, !0)), ue.test(r[1]) && ae.isPlainObject(t)))
                        for (r in t) ae.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this;
                }
                if (((n = fe.getElementById(r[2])), n && n.parentNode)) {
                    if (n.id !== r[2]) return he.find(e);
                    (this.length = 1), (this[0] = n);
                }
                return (this.context = fe), (this.selector = e), this;
            }
            return e.nodeType ?
                ((this.context = this[0] = e), (this.length = 1), this) :
                ae.isFunction(e) ?
                "undefined" != typeof he.ready ?
                he.ready(e) :
                e(ae) :
                (void 0 !== e.selector && ((this.selector = e.selector), (this.context = e.context)), ae.makeArray(e, this));
        });
    (ge.prototype = ae.fn), (he = ae(fe));
    var ve = /^(?:parents|prev(?:Until|All))/,
        ye = { children: !0, contents: !0, next: !0, prev: !0 };
    ae.extend({
            dir: function(e, t, r) {
                for (var n = [], a = e[t]; a && 9 !== a.nodeType && (void 0 === r || 1 !== a.nodeType || !ae(a).is(r));) 1 === a.nodeType && n.push(a), (a = a[t]);
                return n;
            },
            sibling: function(e, t) {
                for (var r = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && r.push(e);
                return r;
            },
        }),
        ae.fn.extend({
            has: function(e) {
                var t,
                    r = ae(e, this),
                    n = r.length;
                return this.filter(function() {
                    for (t = 0; t < n; t++)
                        if (ae.contains(this, r[t])) return !0;
                });
            },
            closest: function(e, t) {
                for (var r, n = 0, a = this.length, i = [], o = ce.test(e) || "string" != typeof e ? ae(e, t || this.context) : 0; n < a; n++)
                    for (r = this[n]; r && r !== t; r = r.parentNode)
                        if (r.nodeType < 11 && (o ? o.index(r) > -1 : 1 === r.nodeType && ae.find.matchesSelector(r, e))) {
                            i.push(r);
                            break;
                        }
                return this.pushStack(i.length > 1 ? ae.unique(i) : i);
            },
            index: function(e) {
                return e ? ("string" == typeof e ? ae.inArray(this[0], ae(e)) : ae.inArray(e.jquery ? e[0] : e, this)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function(e, t) {
                return this.pushStack(ae.unique(ae.merge(this.get(), ae(e, t))));
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
        }),
        ae.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null;
                },
                parents: function(e) {
                    return ae.dir(e, "parentNode");
                },
                parentsUntil: function(e, t, r) {
                    return ae.dir(e, "parentNode", r);
                },
                next: function(e) {
                    return a(e, "nextSibling");
                },
                prev: function(e) {
                    return a(e, "previousSibling");
                },
                nextAll: function(e) {
                    return ae.dir(e, "nextSibling");
                },
                prevAll: function(e) {
                    return ae.dir(e, "previousSibling");
                },
                nextUntil: function(e, t, r) {
                    return ae.dir(e, "nextSibling", r);
                },
                prevUntil: function(e, t, r) {
                    return ae.dir(e, "previousSibling", r);
                },
                siblings: function(e) {
                    return ae.sibling((e.parentNode || {}).firstChild, e);
                },
                children: function(e) {
                    return ae.sibling(e.firstChild);
                },
                contents: function(e) {
                    return ae.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ae.merge([], e.childNodes);
                },
            },
            function(e, t) {
                ae.fn[e] = function(r, n) {
                    var a = ae.map(this, t, r);
                    return "Until" !== e.slice(-5) && (n = r), n && "string" == typeof n && (a = ae.filter(n, a)), this.length > 1 && (ye[e] || (a = ae.unique(a)), ve.test(e) && (a = a.reverse())), this.pushStack(a);
                };
            }
        );
    var be = /\S+/g,
        Se = {};
    (ae.Callbacks = function(e) {
        e = "string" == typeof e ? Se[e] || i(e) : ae.extend({}, e);
        var t,
            r,
            n,
            a,
            o,
            s,
            l = [],
            d = !e.once && [],
            c = function(i) {
                for (r = e.memory && i, n = !0, o = s || 0, s = 0, a = l.length, t = !0; l && o < a; o++)
                    if (l[o].apply(i[0], i[1]) === !1 && e.stopOnFalse) {
                        r = !1;
                        break;
                    }
                    (t = !1), l && (d ? d.length && c(d.shift()) : r ? (l = []) : u.disable());
            },
            u = {
                add: function() {
                    if (l) {
                        var n = l.length;
                        !(function i(t) {
                            ae.each(t, function(t, r) {
                                var n = ae.type(r);
                                "function" === n ? (e.unique && u.has(r)) || l.push(r) : r && r.length && "string" !== n && i(r);
                            });
                        })(arguments),
                        t ? (a = l.length) : r && ((s = n), c(r));
                    }
                    return this;
                },
                remove: function() {
                    return (
                        l &&
                        ae.each(arguments, function(e, r) {
                            for (var n;
                                (n = ae.inArray(r, l, n)) > -1;) l.splice(n, 1), t && (n <= a && a--, n <= o && o--);
                        }),
                        this
                    );
                },
                has: function(e) {
                    return e ? ae.inArray(e, l) > -1 : !(!l || !l.length);
                },
                empty: function() {
                    return (l = []), (a = 0), this;
                },
                disable: function() {
                    return (l = d = r = void 0), this;
                },
                disabled: function() {
                    return !l;
                },
                lock: function() {
                    return (d = void 0), r || u.disable(), this;
                },
                locked: function() {
                    return !d;
                },
                fireWith: function(e, r) {
                    return !l || (n && !d) || ((r = r || []), (r = [e, r.slice ? r.slice() : r]), t ? d.push(r) : c(r)), this;
                },
                fire: function() {
                    return u.fireWith(this, arguments), this;
                },
                fired: function() {
                    return !!n;
                },
            };
        return u;
    }),
    ae.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", ae.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ae.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ae.Callbacks("memory")],
                ],
                r = "pending",
                n = {
                    state: function() {
                        return r;
                    },
                    always: function() {
                        return a.done(arguments).fail(arguments), this;
                    },
                    then: function() {
                        var e = arguments;
                        return ae
                            .Deferred(function(r) {
                                ae.each(t, function(t, i) {
                                        var o = ae.isFunction(e[t]) && e[t];
                                        a[i[1]](function() {
                                            var e = o && o.apply(this, arguments);
                                            e && ae.isFunction(e.promise) ? e.promise().done(r.resolve).fail(r.reject).progress(r.notify) : r[i[0] + "With"](this === n ? r.promise() : this, o ? [e] : arguments);
                                        });
                                    }),
                                    (e = null);
                            })
                            .promise();
                    },
                    promise: function(e) {
                        return null != e ? ae.extend(e, n) : n;
                    },
                },
                a = {};
            return (
                (n.pipe = n.then),
                ae.each(t, function(e, i) {
                    var o = i[2],
                        s = i[3];
                    (n[i[1]] = o.add),
                    s &&
                        o.add(
                            function() {
                                r = s;
                            },
                            t[1 ^ e][2].disable,
                            t[2][2].lock
                        ),
                        (a[i[0]] = function() {
                            return a[i[0] + "With"](this === a ? n : this, arguments), this;
                        }),
                        (a[i[0] + "With"] = o.fireWith);
                }),
                n.promise(a),
                e && e.call(a, a),
                a
            );
        },
        when: function(e) {
            var t,
                r,
                n,
                a = 0,
                i = K.call(arguments),
                o = i.length,
                s = 1 !== o || (e && ae.isFunction(e.promise)) ? o : 0,
                l = 1 === s ? e : ae.Deferred(),
                d = function(e, r, n) {
                    return function(a) {
                        (r[e] = this), (n[e] = arguments.length > 1 ? K.call(arguments) : a), n === t ? l.notifyWith(r, n) : --s || l.resolveWith(r, n);
                    };
                };
            if (o > 1)
                for (t = new Array(o), r = new Array(o), n = new Array(o); a < o; a++) i[a] && ae.isFunction(i[a].promise) ? i[a].promise().done(d(a, n, i)).fail(l.reject).progress(d(a, r, t)) : --s;
            return s || l.resolveWith(n, i), l.promise();
        },
    });
    var we;
    (ae.fn.ready = function(e) {
        return ae.ready.promise().done(e), this;
    }),
    ae.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? ae.readyWait++ : ae.ready(!0);
            },
            ready: function(e) {
                if (e === !0 ? !--ae.readyWait : !ae.isReady) {
                    if (!fe.body) return setTimeout(ae.ready);
                    (ae.isReady = !0), (e !== !0 && --ae.readyWait > 0) || (we.resolveWith(fe, [ae]), ae.fn.triggerHandler && (ae(fe).triggerHandler("ready"), ae(fe).off("ready")));
                }
            },
        }),
        (ae.ready.promise = function(t) {
            if (!we)
                if (((we = ae.Deferred()), "complete" === fe.readyState)) setTimeout(ae.ready);
                else if (fe.addEventListener) fe.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1);
            else {
                fe.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
                var r = !1;
                try {
                    r = null == e.frameElement && fe.documentElement;
                } catch (n) {}
                r &&
                    r.doScroll &&
                    !(function a() {
                        if (!ae.isReady) {
                            try {
                                r.doScroll("left");
                            } catch (e) {
                                return setTimeout(a, 50);
                            }
                            o(), ae.ready();
                        }
                    })();
            }
            return we.promise(t);
        });
    var Ce,
        _e = "undefined";
    for (Ce in ae(re)) break;
    (re.ownLast = "0" !== Ce),
    (re.inlineBlockNeedsLayout = !1),
    ae(function() {
            var e, t, r, n;
            (r = fe.getElementsByTagName("body")[0]),
            r &&
                r.style &&
                ((t = fe.createElement("div")),
                    (n = fe.createElement("div")),
                    (n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                    r.appendChild(n).appendChild(t),
                    typeof t.style.zoom !== _e && ((t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"), (re.inlineBlockNeedsLayout = e = 3 === t.offsetWidth), e && (r.style.zoom = 1)),
                    r.removeChild(n));
        }),
        (function() {
            var e = fe.createElement("div");
            if (null == re.deleteExpando) {
                re.deleteExpando = !0;
                try {
                    delete e.test;
                } catch (t) {
                    re.deleteExpando = !1;
                }
            }
            e = null;
        })(),
        (ae.acceptData = function(e) {
            var t = ae.noData[(e.nodeName + " ").toLowerCase()],
                r = +e.nodeType || 1;
            return (1 === r || 9 === r) && (!t || (t !== !0 && e.getAttribute("classid") === t));
        });
    var xe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Pe = /([A-Z])/g;
    ae.extend({
            cache: {},
            noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
            hasData: function(e) {
                return (e = e.nodeType ? ae.cache[e[ae.expando]] : e[ae.expando]), !!e && !d(e);
            },
            data: function(e, t, r) {
                return c(e, t, r);
            },
            removeData: function(e, t) {
                return u(e, t);
            },
            _data: function(e, t, r) {
                return c(e, t, r, !0);
            },
            _removeData: function(e, t) {
                return u(e, t, !0);
            },
        }),
        ae.fn.extend({
            data: function(e, t) {
                var r,
                    n,
                    a,
                    i = this[0],
                    o = i && i.attributes;
                if (void 0 === e) {
                    if (this.length && ((a = ae.data(i)), 1 === i.nodeType && !ae._data(i, "parsedAttrs"))) {
                        for (r = o.length; r--;) o[r] && ((n = o[r].name), 0 === n.indexOf("data-") && ((n = ae.camelCase(n.slice(5))), l(i, n, a[n])));
                        ae._data(i, "parsedAttrs", !0);
                    }
                    return a;
                }
                return "object" == typeof e ?
                    this.each(function() {
                        ae.data(this, e);
                    }) :
                    arguments.length > 1 ?
                    this.each(function() {
                        ae.data(this, e, t);
                    }) :
                    i ?
                    l(i, e, ae.data(i, e)) :
                    void 0;
            },
            removeData: function(e) {
                return this.each(function() {
                    ae.removeData(this, e);
                });
            },
        }),
        ae.extend({
            queue: function(e, t, r) {
                var n;
                if (e) return (t = (t || "fx") + "queue"), (n = ae._data(e, t)), r && (!n || ae.isArray(r) ? (n = ae._data(e, t, ae.makeArray(r))) : n.push(r)), n || [];
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var r = ae.queue(e, t),
                    n = r.length,
                    a = r.shift(),
                    i = ae._queueHooks(e, t),
                    o = function() {
                        ae.dequeue(e, t);
                    };
                "inprogress" === a && ((a = r.shift()), n--), a && ("fx" === t && r.unshift("inprogress"), delete i.stop, a.call(e, o, i)), !n && i && i.empty.fire();
            },
            _queueHooks: function(e, t) {
                var r = t + "queueHooks";
                return (
                    ae._data(e, r) ||
                    ae._data(e, r, {
                        empty: ae.Callbacks("once memory").add(function() {
                            ae._removeData(e, t + "queue"), ae._removeData(e, r);
                        }),
                    })
                );
            },
        }),
        ae.fn.extend({
            queue: function(e, t) {
                var r = 2;
                return (
                    "string" != typeof e && ((t = e), (e = "fx"), r--),
                    arguments.length < r ?
                    ae.queue(this[0], e) :
                    void 0 === t ?
                    this :
                    this.each(function() {
                        var r = ae.queue(this, e, t);
                        ae._queueHooks(this, e), "fx" === e && "inprogress" !== r[0] && ae.dequeue(this, e);
                    })
                );
            },
            dequeue: function(e) {
                return this.each(function() {
                    ae.dequeue(this, e);
                });
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", []);
            },
            promise: function(e, t) {
                var r,
                    n = 1,
                    a = ae.Deferred(),
                    i = this,
                    o = this.length,
                    s = function() {
                        --n || a.resolveWith(i, [i]);
                    };
                for ("string" != typeof e && ((t = e), (e = void 0)), e = e || "fx"; o--;)(r = ae._data(i[o], e + "queueHooks")), r && r.empty && (n++, r.empty.add(s));
                return s(), a.promise(t);
            },
        });
    var Ae = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        $e = ["Top", "Right", "Bottom", "Left"],
        De = function(e, t) {
            return (e = t || e), "none" === ae.css(e, "display") || !ae.contains(e.ownerDocument, e);
        },
        Ie = (ae.access = function(e, t, r, n, a, i, o) {
            var s = 0,
                l = e.length,
                d = null == r;
            if ("object" === ae.type(r)) {
                a = !0;
                for (s in r) ae.access(e, t, s, r[s], !0, i, o);
            } else if (
                void 0 !== n &&
                ((a = !0),
                    ae.isFunction(n) || (o = !0),
                    d &&
                    (o ?
                        (t.call(e, n), (t = null)) :
                        ((d = t),
                            (t = function(e, t, r) {
                                return d.call(ae(e), r);
                            }))),
                    t)
            )
                for (; s < l; s++) t(e[s], r, o ? n : n.call(e[s], s, t(e[s], r)));
            return a ? e : d ? t.call(e) : l ? t(e[0], r) : i;
        }),
        Ee = /^(?:checkbox|radio)$/i;
    !(function() {
        var e = fe.createElement("input"),
            t = fe.createElement("div"),
            r = fe.createDocumentFragment();
        if (
            ((t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (re.leadingWhitespace = 3 === t.firstChild.nodeType),
                (re.tbody = !t.getElementsByTagName("tbody").length),
                (re.htmlSerialize = !!t.getElementsByTagName("link").length),
                (re.html5Clone = "<:nav></:nav>" !== fe.createElement("nav").cloneNode(!0).outerHTML),
                (e.type = "checkbox"),
                (e.checked = !0),
                r.appendChild(e),
                (re.appendChecked = e.checked),
                (t.innerHTML = "<textarea>x</textarea>"),
                (re.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue),
                r.appendChild(t),
                (t.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
                (re.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked),
                (re.noCloneEvent = !0),
                t.attachEvent &&
                (t.attachEvent("onclick", function() {
                        re.noCloneEvent = !1;
                    }),
                    t.cloneNode(!0).click()),
                null == re.deleteExpando)
        ) {
            re.deleteExpando = !0;
            try {
                delete t.test;
            } catch (n) {
                re.deleteExpando = !1;
            }
        }
    })(),
    (function() {
        var t,
            r,
            n = fe.createElement("div");
        for (t in { submit: !0, change: !0, focusin: !0 })(r = "on" + t), (re[t + "Bubbles"] = r in e) || (n.setAttribute(r, "t"), (re[t + "Bubbles"] = n.attributes[r].expando === !1));
        n = null;
    })();
    var Be = /^(?:input|select|textarea)$/i,
        Oe = /^key/,
        ke = /^(?:mouse|pointer|contextmenu)|click/,
        Le = /^(?:focusinfocus|focusoutblur)$/,
        Te = /^([^.]*)(?:\.(.+)|)$/;
    (ae.event = {
        global: {},
        add: function(e, t, r, n, a) {
            var i,
                o,
                s,
                l,
                d,
                c,
                u,
                p,
                h,
                f,
                m,
                g = ae._data(e);
            if (g) {
                for (
                    r.handler && ((l = r), (r = l.handler), (a = l.selector)),
                    r.guid || (r.guid = ae.guid++),
                    (o = g.events) || (o = g.events = {}),
                    (c = g.handle) ||
                    ((c = g.handle = function(e) {
                            return typeof ae === _e || (e && ae.event.triggered === e.type) ? void 0 : ae.event.dispatch.apply(c.elem, arguments);
                        }),
                        (c.elem = e)),
                    t = (t || "").match(be) || [""],
                    s = t.length; s--;

                )
                    (i = Te.exec(t[s]) || []),
                    (h = m = i[1]),
                    (f = (i[2] || "").split(".").sort()),
                    h &&
                    ((d = ae.event.special[h] || {}),
                        (h = (a ? d.delegateType : d.bindType) || h),
                        (d = ae.event.special[h] || {}),
                        (u = ae.extend({ type: h, origType: m, data: n, handler: r, guid: r.guid, selector: a, needsContext: a && ae.expr.match.needsContext.test(a), namespace: f.join(".") }, l)),
                        (p = o[h]) || ((p = o[h] = []), (p.delegateCount = 0), (d.setup && d.setup.call(e, n, f, c) !== !1) || (e.addEventListener ? e.addEventListener(h, c, !1) : e.attachEvent && e.attachEvent("on" + h, c))),
                        d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = r.guid)),
                        a ? p.splice(p.delegateCount++, 0, u) : p.push(u),
                        (ae.event.global[h] = !0));
                e = null;
            }
        },
        remove: function(e, t, r, n, a) {
            var i,
                o,
                s,
                l,
                d,
                c,
                u,
                p,
                h,
                f,
                m,
                g = ae.hasData(e) && ae._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(be) || [""], d = t.length; d--;)
                    if (((s = Te.exec(t[d]) || []), (h = m = s[1]), (f = (s[2] || "").split(".").sort()), h)) {
                        for (u = ae.event.special[h] || {}, h = (n ? u.delegateType : u.bindType) || h, p = c[h] || [], s = s[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = i = p.length; i--;)
                            (o = p[i]),
                            (!a && m !== o.origType) ||
                            (r && r.guid !== o.guid) ||
                            (s && !s.test(o.namespace)) ||
                            (n && n !== o.selector && ("**" !== n || !o.selector)) ||
                            (p.splice(i, 1), o.selector && p.delegateCount--, u.remove && u.remove.call(e, o));
                        l && !p.length && ((u.teardown && u.teardown.call(e, f, g.handle) !== !1) || ae.removeEvent(e, h, g.handle), delete c[h]);
                    } else
                        for (h in c) ae.event.remove(e, h + t[d], r, n, !0);
                ae.isEmptyObject(c) && (delete g.handle, ae._removeData(e, "events"));
            }
        },
        trigger: function(t, r, n, a) {
            var i,
                o,
                s,
                l,
                d,
                c,
                u,
                p = [n || fe],
                h = te.call(t, "type") ? t.type : t,
                f = te.call(t, "namespace") ? t.namespace.split(".") : [];
            if (
                ((s = c = n = n || fe),
                    3 !== n.nodeType &&
                    8 !== n.nodeType &&
                    !Le.test(h + ae.event.triggered) &&
                    (h.indexOf(".") >= 0 && ((f = h.split(".")), (h = f.shift()), f.sort()),
                        (o = h.indexOf(":") < 0 && "on" + h),
                        (t = t[ae.expando] ? t : new ae.Event(h, "object" == typeof t && t)),
                        (t.isTrigger = a ? 2 : 3),
                        (t.namespace = f.join(".")),
                        (t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                        (t.result = void 0),
                        t.target || (t.target = n),
                        (r = null == r ? [t] : ae.makeArray(r, [t])),
                        (d = ae.event.special[h] || {}),
                        a || !d.trigger || d.trigger.apply(n, r) !== !1))
            ) {
                if (!a && !d.noBubble && !ae.isWindow(n)) {
                    for (l = d.delegateType || h, Le.test(l + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), (c = s);
                    c === (n.ownerDocument || fe) && p.push(c.defaultView || c.parentWindow || e);
                }
                for (u = 0;
                    (s = p[u++]) && !t.isPropagationStopped();)
                    (t.type = u > 1 ? l : d.bindType || h),
                    (i = (ae._data(s, "events") || {})[t.type] && ae._data(s, "handle")),
                    i && i.apply(s, r),
                    (i = o && s[o]),
                    i && i.apply && ae.acceptData(s) && ((t.result = i.apply(s, r)), t.result === !1 && t.preventDefault());
                if (((t.type = h), !a && !t.isDefaultPrevented() && (!d._default || d._default.apply(p.pop(), r) === !1) && ae.acceptData(n) && o && n[h] && !ae.isWindow(n))) {
                    (c = n[o]), c && (n[o] = null), (ae.event.triggered = h);
                    try {
                        n[h]();
                    } catch (m) {}
                    (ae.event.triggered = void 0), c && (n[o] = c);
                }
                return t.result;
            }
        },
        dispatch: function(e) {
            e = ae.event.fix(e);
            var t,
                r,
                n,
                a,
                i,
                o = [],
                s = K.call(arguments),
                l = (ae._data(this, "events") || {})[e.type] || [],
                d = ae.event.special[e.type] || {};
            if (((s[0] = e), (e.delegateTarget = this), !d.preDispatch || d.preDispatch.call(this, e) !== !1)) {
                for (o = ae.event.handlers.call(this, e, l), t = 0;
                    (a = o[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = a.elem, i = 0;
                        (n = a.handlers[i++]) && !e.isImmediatePropagationStopped();)
                        (e.namespace_re && !e.namespace_re.test(n.namespace)) ||
                        ((e.handleObj = n), (e.data = n.data), (r = ((ae.event.special[n.origType] || {}).handle || n.handler).apply(a.elem, s)), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                return d.postDispatch && d.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function(e, t) {
            var r,
                n,
                a,
                i,
                o = [],
                s = t.delegateCount,
                l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                        for (a = [], i = 0; i < s; i++)(n = t[i]), (r = n.selector + " "), void 0 === a[r] && (a[r] = n.needsContext ? ae(r, this).index(l) >= 0 : ae.find(r, this, null, [l]).length), a[r] && a.push(n);
                        a.length && o.push({ elem: l, handlers: a });
                    }
            return s < t.length && o.push({ elem: this, handlers: t.slice(s) }), o;
        },
        fix: function(e) {
            if (e[ae.expando]) return e;
            var t,
                r,
                n,
                a = e.type,
                i = e,
                o = this.fixHooks[a];
            for (o || (this.fixHooks[a] = o = ke.test(a) ? this.mouseHooks : Oe.test(a) ? this.keyHooks : {}), n = o.props ? this.props.concat(o.props) : this.props, e = new ae.Event(i), t = n.length; t--;)(r = n[t]), (e[r] = i[r]);
            return e.target || (e.target = i.srcElement || fe), 3 === e.target.nodeType && (e.target = e.target.parentNode), (e.metaKey = !!e.metaKey), o.filter ? o.filter(e, i) : e;
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var r,
                    n,
                    a,
                    i = t.button,
                    o = t.fromElement;
                return (
                    null == e.pageX &&
                    null != t.clientX &&
                    ((n = e.target.ownerDocument || fe),
                        (a = n.documentElement),
                        (r = n.body),
                        (e.pageX = t.clientX + ((a && a.scrollLeft) || (r && r.scrollLeft) || 0) - ((a && a.clientLeft) || (r && r.clientLeft) || 0)),
                        (e.pageY = t.clientY + ((a && a.scrollTop) || (r && r.scrollTop) || 0) - ((a && a.clientTop) || (r && r.clientTop) || 0))), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o),
                    e.which || void 0 === i || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0),
                    e
                );
            },
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function() {
                    if (this !== f() && this.focus)
                        try {
                            return this.focus(), !1;
                        } catch (e) {}
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function() {
                    if (this === f() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function() {
                    if (ae.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1;
                },
                _default: function(e) {
                    return ae.nodeName(e.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                },
            },
        },
        simulate: function(e, t, r, n) {
            var a = ae.extend(new ae.Event(), r, { type: e, isSimulated: !0, originalEvent: {} });
            n ? ae.event.trigger(a, null, t) : ae.event.dispatch.call(t, a), a.isDefaultPrevented() && r.preventDefault();
        },
    }),
    (ae.removeEvent = fe.removeEventListener ?

        function(e, t, r) {
            e.removeEventListener && e.removeEventListener(t, r, !1);
        } :
        function(e, t, r) {
            var n = "on" + t;
            e.detachEvent && (typeof e[n] === _e && (e[n] = null), e.detachEvent(n, r));
        }),
    (ae.Event = function(e, t) {
        return this instanceof ae.Event ?
            (e && e.type ? ((this.originalEvent = e), (this.type = e.type), (this.isDefaultPrevented = e.defaultPrevented || (void 0 === e.defaultPrevented && e.returnValue === !1) ? p : h)) : (this.type = e),
                t && ae.extend(this, t),
                (this.timeStamp = (e && e.timeStamp) || ae.now()),
                void(this[ae.expando] = !0)) :
            new ae.Event(e, t);
    }),
    (ae.Event.prototype = {
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function() {
            var e = this.originalEvent;
            (this.isDefaultPrevented = p), e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            (this.isPropagationStopped = p), e && (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            (this.isImmediatePropagationStopped = p), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation();
        },
    }),
    ae.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(e, t) {
            ae.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var r,
                        n = this,
                        a = e.relatedTarget,
                        i = e.handleObj;
                    return (a && (a === n || ae.contains(n, a))) || ((e.type = i.origType), (r = i.handler.apply(this, arguments)), (e.type = t)), r;
                },
            };
        }),
        re.submitBubbles ||
        (ae.event.special.submit = {
            setup: function() {
                return (!ae.nodeName(this, "form") &&
                    void ae.event.add(this, "click._submit keypress._submit", function(e) {
                        var t = e.target,
                            r = ae.nodeName(t, "input") || ae.nodeName(t, "button") ? t.form : void 0;
                        r &&
                            !ae._data(r, "submitBubbles") &&
                            (ae.event.add(r, "submit._submit", function(e) {
                                    e._submit_bubble = !0;
                                }),
                                ae._data(r, "submitBubbles", !0));
                    })
                );
            },
            postDispatch: function(e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ae.event.simulate("submit", this.parentNode, e, !0));
            },
            teardown: function() {
                return !ae.nodeName(this, "form") && void ae.event.remove(this, "._submit");
            },
        }),
        re.changeBubbles ||
        (ae.event.special.change = {
            setup: function() {
                return Be.test(this.nodeName) ?
                    (("checkbox" !== this.type && "radio" !== this.type) ||
                        (ae.event.add(this, "propertychange._change", function(e) {
                                "checked" === e.originalEvent.propertyName && (this._just_changed = !0);
                            }),
                            ae.event.add(this, "click._change", function(e) {
                                this._just_changed && !e.isTrigger && (this._just_changed = !1), ae.event.simulate("change", this, e, !0);
                            })), !1) :
                    void ae.event.add(this, "beforeactivate._change", function(e) {
                        var t = e.target;
                        Be.test(t.nodeName) &&
                            !ae._data(t, "changeBubbles") &&
                            (ae.event.add(t, "change._change", function(e) {
                                    !this.parentNode || e.isSimulated || e.isTrigger || ae.event.simulate("change", this.parentNode, e, !0);
                                }),
                                ae._data(t, "changeBubbles", !0));
                    });
            },
            handle: function(e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || ("radio" !== t.type && "checkbox" !== t.type)) return e.handleObj.handler.apply(this, arguments);
            },
            teardown: function() {
                return ae.event.remove(this, "._change"), !Be.test(this.nodeName);
            },
        }),
        re.focusinBubbles ||
        ae.each({ focus: "focusin", blur: "focusout" }, function(e, t) {
            var r = function(e) {
                ae.event.simulate(t, e.target, ae.event.fix(e), !0);
            };
            ae.event.special[t] = {
                setup: function() {
                    var n = this.ownerDocument || this,
                        a = ae._data(n, t);
                    a || n.addEventListener(e, r, !0), ae._data(n, t, (a || 0) + 1);
                },
                teardown: function() {
                    var n = this.ownerDocument || this,
                        a = ae._data(n, t) - 1;
                    a ? ae._data(n, t, a) : (n.removeEventListener(e, r, !0), ae._removeData(n, t));
                },
            };
        }),
        ae.fn.extend({
            on: function(e, t, r, n, a) {
                var i, o;
                if ("object" == typeof e) {
                    "string" != typeof t && ((r = r || t), (t = void 0));
                    for (i in e) this.on(i, t, r, e[i], a);
                    return this;
                }
                if ((null == r && null == n ? ((n = t), (r = t = void 0)) : null == n && ("string" == typeof t ? ((n = r), (r = void 0)) : ((n = r), (r = t), (t = void 0))), n === !1)) n = h;
                else if (!n) return this;
                return (
                    1 === a &&
                    ((o = n),
                        (n = function(e) {
                            return ae().off(e), o.apply(this, arguments);
                        }),
                        (n.guid = o.guid || (o.guid = ae.guid++))),
                    this.each(function() {
                        ae.event.add(this, e, n, r, t);
                    })
                );
            },
            one: function(e, t, r, n) {
                return this.on(e, t, r, n, 1);
            },
            off: function(e, t, r) {
                var n, a;
                if (e && e.preventDefault && e.handleObj) return (n = e.handleObj), ae(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                if ("object" == typeof e) {
                    for (a in e) this.off(a, t, e[a]);
                    return this;
                }
                return (
                    (t !== !1 && "function" != typeof t) || ((r = t), (t = void 0)),
                    r === !1 && (r = h),
                    this.each(function() {
                        ae.event.remove(this, e, r, t);
                    })
                );
            },
            trigger: function(e, t) {
                return this.each(function() {
                    ae.event.trigger(e, t, this);
                });
            },
            triggerHandler: function(e, t) {
                var r = this[0];
                if (r) return ae.event.trigger(e, t, r, !0);
            },
        });
    var Re = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ne = / jQuery\d+="(?:null|\d+)"/g,
        qe = new RegExp("<(?:" + Re + ")[\\s/>]", "i"),
        Me = /^\s+/,
        Fe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ue = /<([\w:]+)/,
        He = /<tbody/i,
        ze = /<|&#?\w+;/,
        Ve = /<(?:script|style|link)/i,
        je = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ge = /^$|\/(?:java|ecma)script/i,
        We = /^true\/(.*)/,
        Ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ke = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: re.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
        },
        Qe = m(fe),
        Ze = Qe.appendChild(fe.createElement("div"));
    (Ke.optgroup = Ke.option),
    (Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead),
    (Ke.th = Ke.td),
    ae.extend({
            clone: function(e, t, r) {
                var n,
                    a,
                    i,
                    o,
                    s,
                    l = ae.contains(e.ownerDocument, e);
                if (
                    (re.html5Clone || ae.isXMLDoc(e) || !qe.test("<" + e.nodeName + ">") ? (i = e.cloneNode(!0)) : ((Ze.innerHTML = e.outerHTML), Ze.removeChild((i = Ze.firstChild))), !((re.noCloneEvent && re.noCloneChecked) || (1 !== e.nodeType && 11 !== e.nodeType) || ae.isXMLDoc(e)))
                )
                    for (n = g(i), s = g(e), o = 0; null != (a = s[o]); ++o) n[o] && _(a, n[o]);
                if (t)
                    if (r)
                        for (s = s || g(e), n = n || g(i), o = 0; null != (a = s[o]); o++) C(a, n[o]);
                    else C(e, i);
                return (n = g(i, "script")), n.length > 0 && w(n, !l && g(e, "script")), (n = s = a = null), i;
            },
            buildFragment: function(e, t, r, n) {
                for (var a, i, o, s, l, d, c, u = e.length, p = m(t), h = [], f = 0; f < u; f++)
                    if (((i = e[f]), i || 0 === i))
                        if ("object" === ae.type(i)) ae.merge(h, i.nodeType ? [i] : i);
                        else if (ze.test(i)) {
                    for (s = s || p.appendChild(t.createElement("div")), l = (Ue.exec(i) || ["", ""])[1].toLowerCase(), c = Ke[l] || Ke._default, s.innerHTML = c[1] + i.replace(Fe, "<$1></$2>") + c[2], a = c[0]; a--;)
                        s = s.lastChild;
                    if ((!re.leadingWhitespace && Me.test(i) && h.push(t.createTextNode(Me.exec(i)[0])), !re.tbody))
                        for (i = "table" !== l || He.test(i) ? ("<table>" !== c[1] || He.test(i) ? 0 : s) : s.firstChild, a = i && i.childNodes.length; a--;)
                            ae.nodeName((d = i.childNodes[a]), "tbody") && !d.childNodes.length && i.removeChild(d);
                    for (ae.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                    s = p.lastChild;
                } else h.push(t.createTextNode(i));
                for (s && p.removeChild(s), re.appendChecked || ae.grep(g(h, "input"), v), f = 0;
                    (i = h[f++]);)
                    if ((!n || ae.inArray(i, n) === -1) && ((o = ae.contains(i.ownerDocument, i)), (s = g(p.appendChild(i), "script")), o && w(s), r))
                        for (a = 0;
                            (i = s[a++]);) Ge.test(i.type || "") && r.push(i);
                return (s = null), p;
            },
            cleanData: function(e, t) {
                for (var r, n, a, i, o = 0, s = ae.expando, l = ae.cache, d = re.deleteExpando, c = ae.event.special; null != (r = e[o]); o++)
                    if ((t || ae.acceptData(r)) && ((a = r[s]), (i = a && l[a]))) {
                        if (i.events)
                            for (n in i.events) c[n] ? ae.event.remove(r, n) : ae.removeEvent(r, n, i.handle);
                        l[a] && (delete l[a], d ? delete r[s] : typeof r.removeAttribute !== _e ? r.removeAttribute(s) : (r[s] = null), Y.push(a));
                    }
            },
        }),
        ae.fn.extend({
            text: function(e) {
                return Ie(
                    this,
                    function(e) {
                        return void 0 === e ? ae.text(this) : this.empty().append(((this[0] && this[0].ownerDocument) || fe).createTextNode(e));
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = y(this, e);
                        t.appendChild(e);
                    }
                });
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = y(this, e);
                        t.insertBefore(e, t.firstChild);
                    }
                });
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this);
                });
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                });
            },
            remove: function(e, t) {
                for (var r, n = e ? ae.filter(e, this) : this, a = 0; null != (r = n[a]); a++)
                    t || 1 !== r.nodeType || ae.cleanData(g(r)), r.parentNode && (t && ae.contains(r.ownerDocument, r) && w(g(r, "script")), r.parentNode.removeChild(r));
                return this;
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && ae.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                    e.options && ae.nodeName(e, "select") && (e.options.length = 0);
                }
                return this;
            },
            clone: function(e, t) {
                return (
                    (e = null != e && e),
                    (t = null == t ? e : t),
                    this.map(function() {
                        return ae.clone(this, e, t);
                    })
                );
            },
            html: function(e) {
                return Ie(
                    this,
                    function(e) {
                        var t = this[0] || {},
                            r = 0,
                            n = this.length;
                        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ne, "") : void 0;
                        if ("string" == typeof e && !Ve.test(e) && (re.htmlSerialize || !qe.test(e)) && (re.leadingWhitespace || !Me.test(e)) && !Ke[(Ue.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = e.replace(Fe, "<$1></$2>");
                            try {
                                for (; r < n; r++)(t = this[r] || {}), 1 === t.nodeType && (ae.cleanData(g(t, !1)), (t.innerHTML = e));
                                t = 0;
                            } catch (a) {}
                        }
                        t && this.empty().append(e);
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            replaceWith: function() {
                var e = arguments[0];
                return (
                    this.domManip(arguments, function(t) {
                        (e = this.parentNode), ae.cleanData(g(this)), e && e.replaceChild(t, this);
                    }),
                    e && (e.length || e.nodeType) ? this : this.remove()
                );
            },
            detach: function(e) {
                return this.remove(e, !0);
            },
            domManip: function(e, t) {
                e = Q.apply([], e);
                var r,
                    n,
                    a,
                    i,
                    o,
                    s,
                    l = 0,
                    d = this.length,
                    c = this,
                    u = d - 1,
                    p = e[0],
                    h = ae.isFunction(p);
                if (h || (d > 1 && "string" == typeof p && !re.checkClone && je.test(p)))
                    return this.each(function(r) {
                        var n = c.eq(r);
                        h && (e[0] = p.call(this, r, n.html())), n.domManip(e, t);
                    });
                if (d && ((s = ae.buildFragment(e, this[0].ownerDocument, !1, this)), (r = s.firstChild), 1 === s.childNodes.length && (s = r), r)) {
                    for (i = ae.map(g(s, "script"), b), a = i.length; l < d; l++)(n = s), l !== u && ((n = ae.clone(n, !0, !0)), a && ae.merge(i, g(n, "script"))), t.call(this[l], n, l);
                    if (a)
                        for (o = i[i.length - 1].ownerDocument, ae.map(i, S), l = 0; l < a; l++)
                            (n = i[l]), Ge.test(n.type || "") && !ae._data(n, "globalEval") && ae.contains(o, n) && (n.src ? ae._evalUrl && ae._evalUrl(n.src) : ae.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Ye, "")));
                    s = r = null;
                }
                return this;
            },
        }),
        ae.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e, t) {
            ae.fn[e] = function(e) {
                for (var r, n = 0, a = [], i = ae(e), o = i.length - 1; n <= o; n++)(r = n === o ? this : this.clone(!0)), ae(i[n])[t](r), Z.apply(a, r.get());
                return this.pushStack(a);
            };
        });
    var Je,
        Xe = {};
    !(function() {
        var e;
        re.shrinkWrapBlocks = function() {
            if (null != e) return e;
            e = !1;
            var t, r, n;
            return (
                (r = fe.getElementsByTagName("body")[0]),
                r && r.style ?
                ((t = fe.createElement("div")),
                    (n = fe.createElement("div")),
                    (n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                    r.appendChild(n).appendChild(t),
                    typeof t.style.zoom !== _e &&
                    ((t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                        (t.appendChild(fe.createElement("div")).style.width = "5px"),
                        (e = 3 !== t.offsetWidth)),
                    r.removeChild(n),
                    e) :
                void 0
            );
        };
    })();
    var et,
        tt,
        rt = /^margin/,
        nt = new RegExp("^(" + Ae + ")(?!px)[a-z%]+$", "i"),
        at = /^(top|right|bottom|left)$/;
    e.getComputedStyle ?
        ((et = function(t) {
                return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null);
            }),
            (tt = function(e, t, r) {
                var n,
                    a,
                    i,
                    o,
                    s = e.style;
                return (
                    (r = r || et(e)),
                    (o = r ? r.getPropertyValue(t) || r[t] : void 0),
                    r &&
                    ("" !== o || ae.contains(e.ownerDocument, e) || (o = ae.style(e, t)),
                        nt.test(o) && rt.test(t) && ((n = s.width), (a = s.minWidth), (i = s.maxWidth), (s.minWidth = s.maxWidth = s.width = o), (o = r.width), (s.width = n), (s.minWidth = a), (s.maxWidth = i))),
                    void 0 === o ? o : o + ""
                );
            })) :
        fe.documentElement.currentStyle &&
        ((et = function(e) {
                return e.currentStyle;
            }),
            (tt = function(e, t, r) {
                var n,
                    a,
                    i,
                    o,
                    s = e.style;
                return (
                    (r = r || et(e)),
                    (o = r ? r[t] : void 0),
                    null == o && s && s[t] && (o = s[t]),
                    nt.test(o) && !at.test(t) && ((n = s.left), (a = e.runtimeStyle), (i = a && a.left), i && (a.left = e.currentStyle.left), (s.left = "fontSize" === t ? "1em" : o), (o = s.pixelLeft + "px"), (s.left = n), i && (a.left = i)),
                    void 0 === o ? o : o + "" || "auto"
                );
            })),
        (function() {
            function t() {
                var t, r, n, a;
                (r = fe.getElementsByTagName("body")[0]),
                r &&
                    r.style &&
                    ((t = fe.createElement("div")),
                        (n = fe.createElement("div")),
                        (n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                        r.appendChild(n).appendChild(t),
                        (t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
                        (i = o = !1),
                        (l = !0),
                        e.getComputedStyle &&
                        ((i = "1%" !== (e.getComputedStyle(t, null) || {}).top),
                            (o = "4px" === (e.getComputedStyle(t, null) || { width: "4px" }).width),
                            (a = t.appendChild(fe.createElement("div"))),
                            (a.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                            (a.style.marginRight = a.style.width = "0"),
                            (t.style.width = "1px"),
                            (l = !parseFloat((e.getComputedStyle(a, null) || {}).marginRight)),
                            t.removeChild(a)),
                        (t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                        (a = t.getElementsByTagName("td")),
                        (a[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
                        (s = 0 === a[0].offsetHeight),
                        s && ((a[0].style.display = ""), (a[1].style.display = "none"), (s = 0 === a[0].offsetHeight)),
                        r.removeChild(n));
            }
            var r, n, a, i, o, s, l;
            (r = fe.createElement("div")),
            (r.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (a = r.getElementsByTagName("a")[0]),
            (n = a && a.style),
            n &&
                ((n.cssText = "float:left;opacity:.5"),
                    (re.opacity = "0.5" === n.opacity),
                    (re.cssFloat = !!n.cssFloat),
                    (r.style.backgroundClip = "content-box"),
                    (r.cloneNode(!0).style.backgroundClip = ""),
                    (re.clearCloneStyle = "content-box" === r.style.backgroundClip),
                    (re.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing),
                    ae.extend(re, {
                        reliableHiddenOffsets: function() {
                            return null == s && t(), s;
                        },
                        boxSizingReliable: function() {
                            return null == o && t(), o;
                        },
                        pixelPosition: function() {
                            return null == i && t(), i;
                        },
                        reliableMarginRight: function() {
                            return null == l && t(), l;
                        },
                    }));
        })(),
        (ae.swap = function(e, t, r, n) {
            var a,
                i,
                o = {};
            for (i in t)(o[i] = e.style[i]), (e.style[i] = t[i]);
            a = r.apply(e, n || []);
            for (i in t) e.style[i] = o[i];
            return a;
        });
    var it = /alpha\([^)]*\)/i,
        ot = /opacity\s*=\s*([^)]*)/,
        st = /^(none|table(?!-c[ea]).+)/,
        lt = new RegExp("^(" + Ae + ")(.*)$", "i"),
        dt = new RegExp("^([+-])=(" + Ae + ")", "i"),
        ct = { position: "absolute", visibility: "hidden", display: "block" },
        ut = { letterSpacing: "0", fontWeight: "400" },
        pt = ["Webkit", "O", "Moz", "ms"];
    ae.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var r = tt(e, "opacity");
                            return "" === r ? "1" : r;
                        }
                    },
                },
            },
            cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: { float: re.cssFloat ? "cssFloat" : "styleFloat" },
            style: function(e, t, r, n) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var a,
                        i,
                        o,
                        s = ae.camelCase(t),
                        l = e.style;
                    if (((t = ae.cssProps[s] || (ae.cssProps[s] = $(l, s))), (o = ae.cssHooks[t] || ae.cssHooks[s]), void 0 === r)) return o && "get" in o && void 0 !== (a = o.get(e, !1, n)) ? a : l[t];
                    if (
                        ((i = typeof r),
                            "string" === i && (a = dt.exec(r)) && ((r = (a[1] + 1) * a[2] + parseFloat(ae.css(e, t))), (i = "number")),
                            null != r && r === r && ("number" !== i || ae.cssNumber[s] || (r += "px"), re.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(o && "set" in o && void 0 === (r = o.set(e, r, n)))))
                    )
                        try {
                            l[t] = r;
                        } catch (d) {}
                }
            },
            css: function(e, t, r, n) {
                var a,
                    i,
                    o,
                    s = ae.camelCase(t);
                return (
                    (t = ae.cssProps[s] || (ae.cssProps[s] = $(e.style, s))),
                    (o = ae.cssHooks[t] || ae.cssHooks[s]),
                    o && "get" in o && (i = o.get(e, !0, r)),
                    void 0 === i && (i = tt(e, t, n)),
                    "normal" === i && t in ut && (i = ut[t]),
                    "" === r || r ? ((a = parseFloat(i)), r === !0 || ae.isNumeric(a) ? a || 0 : i) : i
                );
            },
        }),
        ae.each(["height", "width"], function(e, t) {
            ae.cssHooks[t] = {
                get: function(e, r, n) {
                    if (r)
                        return st.test(ae.css(e, "display")) && 0 === e.offsetWidth ?
                            ae.swap(e, ct, function() {
                                return B(e, t, n);
                            }) :
                            B(e, t, n);
                },
                set: function(e, r, n) {
                    var a = n && et(e);
                    return I(e, r, n ? E(e, t, n, re.boxSizing && "border-box" === ae.css(e, "boxSizing", !1, a), a) : 0);
                },
            };
        }),
        re.opacity ||
        (ae.cssHooks.opacity = {
            get: function(e, t) {
                return ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
            },
            set: function(e, t) {
                var r = e.style,
                    n = e.currentStyle,
                    a = ae.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                    i = (n && n.filter) || r.filter || "";
                (r.zoom = 1), ((t >= 1 || "" === t) && "" === ae.trim(i.replace(it, "")) && r.removeAttribute && (r.removeAttribute("filter"), "" === t || (n && !n.filter))) || (r.filter = it.test(i) ? i.replace(it, a) : i + " " + a);
            },
        }),
        (ae.cssHooks.marginRight = A(re.reliableMarginRight, function(e, t) {
            if (t) return ae.swap(e, { display: "inline-block" }, tt, [e, "marginRight"]);
        })),
        ae.each({ margin: "", padding: "", border: "Width" }, function(e, t) {
            (ae.cssHooks[e + t] = {
                expand: function(r) {
                    for (var n = 0, a = {}, i = "string" == typeof r ? r.split(" ") : [r]; n < 4; n++) a[e + $e[n] + t] = i[n] || i[n - 2] || i[0];
                    return a;
                },
            }),
            rt.test(e) || (ae.cssHooks[e + t].set = I);
        }),
        ae.fn.extend({
            css: function(e, t) {
                return Ie(
                    this,
                    function(e, t, r) {
                        var n,
                            a,
                            i = {},
                            o = 0;
                        if (ae.isArray(t)) {
                            for (n = et(e), a = t.length; o < a; o++) i[t[o]] = ae.css(e, t[o], !1, n);
                            return i;
                        }
                        return void 0 !== r ? ae.style(e, t, r) : ae.css(e, t);
                    },
                    e,
                    t,
                    arguments.length > 1
                );
            },
            show: function() {
                return D(this, !0);
            },
            hide: function() {
                return D(this);
            },
            toggle: function(e) {
                return "boolean" == typeof e ?
                    e ?
                    this.show() :
                    this.hide() :
                    this.each(function() {
                        De(this) ? ae(this).show() : ae(this).hide();
                    });
            },
        }),
        (ae.Tween = O),
        (O.prototype = {
            constructor: O,
            init: function(e, t, r, n, a, i) {
                (this.elem = e), (this.prop = r), (this.easing = a || "swing"), (this.options = t), (this.start = this.now = this.cur()), (this.end = n), (this.unit = i || (ae.cssNumber[r] ? "" : "px"));
            },
            cur: function() {
                var e = O.propHooks[this.prop];
                return e && e.get ? e.get(this) : O.propHooks._default.get(this);
            },
            run: function(e) {
                var t,
                    r = O.propHooks[this.prop];
                return (
                    this.options.duration ? (this.pos = t = ae.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)) : (this.pos = t = e),
                    (this.now = (this.end - this.start) * t + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    r && r.set ? r.set(this) : O.propHooks._default.set(this),
                    this
                );
            },
        }),
        (O.prototype.init.prototype = O.prototype),
        (O.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || (e.elem.style && null != e.elem.style[e.prop]) ? ((t = ae.css(e.elem, e.prop, "")), t && "auto" !== t ? t : 0) : e.elem[e.prop];
                },
                set: function(e) {
                    ae.fx.step[e.prop] ? ae.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ae.cssProps[e.prop]] || ae.cssHooks[e.prop]) ? ae.style(e.elem, e.prop, e.now + e.unit) : (e.elem[e.prop] = e.now);
                },
            },
        }),
        (O.propHooks.scrollTop = O.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
            },
        }),
        (ae.easing = {
            linear: function(e) {
                return e;
            },
            swing: function(e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
            },
        }),
        (ae.fx = O.prototype.init),
        (ae.fx.step = {});
    var ht,
        ft,
        mt = /^(?:toggle|show|hide)$/,
        gt = new RegExp("^(?:([+-])=|)(" + Ae + ")([a-z%]*)$", "i"),
        vt = /queueHooks$/,
        yt = [R],
        bt = {
            "*": [
                function(e, t) {
                    var r = this.createTween(e, t),
                        n = r.cur(),
                        a = gt.exec(t),
                        i = (a && a[3]) || (ae.cssNumber[e] ? "" : "px"),
                        o = (ae.cssNumber[e] || ("px" !== i && +n)) && gt.exec(ae.css(r.elem, e)),
                        s = 1,
                        l = 20;
                    if (o && o[3] !== i) {
                        (i = i || o[3]), (a = a || []), (o = +n || 1);
                        do(s = s || ".5"), (o /= s), ae.style(r.elem, e, o + i);
                        while (s !== (s = r.cur() / n) && 1 !== s && --l);
                    }
                    return a && ((o = r.start = +o || +n || 0), (r.unit = i), (r.end = a[1] ? o + (a[1] + 1) * a[2] : +a[2])), r;
                },
            ],
        };
    (ae.Animation = ae.extend(q, {
        tweener: function(e, t) {
            ae.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.split(" "));
            for (var r, n = 0, a = e.length; n < a; n++)(r = e[n]), (bt[r] = bt[r] || []), bt[r].unshift(t);
        },
        prefilter: function(e, t) {
            t ? yt.unshift(e) : yt.push(e);
        },
    })),
    (ae.speed = function(e, t, r) {
        var n = e && "object" == typeof e ? ae.extend({}, e) : { complete: r || (!r && t) || (ae.isFunction(e) && e), duration: e, easing: (r && t) || (t && !ae.isFunction(t) && t) };
        return (
            (n.duration = ae.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ae.fx.speeds ? ae.fx.speeds[n.duration] : ae.fx.speeds._default),
            (null != n.queue && n.queue !== !0) || (n.queue = "fx"),
            (n.old = n.complete),
            (n.complete = function() {
                ae.isFunction(n.old) && n.old.call(this), n.queue && ae.dequeue(this, n.queue);
            }),
            n
        );
    }),
    ae.fn.extend({
            fadeTo: function(e, t, r, n) {
                return this.filter(De).css("opacity", 0).show().end().animate({ opacity: t }, e, r, n);
            },
            animate: function(e, t, r, n) {
                var a = ae.isEmptyObject(e),
                    i = ae.speed(t, r, n),
                    o = function() {
                        var t = q(this, ae.extend({}, e), i);
                        (a || ae._data(this, "finish")) && t.stop(!0);
                    };
                return (o.finish = o), a || i.queue === !1 ? this.each(o) : this.queue(i.queue, o);
            },
            stop: function(e, t, r) {
                var n = function(e) {
                    var t = e.stop;
                    delete e.stop, t(r);
                };
                return (
                    "string" != typeof e && ((r = t), (t = e), (e = void 0)),
                    t && e !== !1 && this.queue(e || "fx", []),
                    this.each(function() {
                        var t = !0,
                            a = null != e && e + "queueHooks",
                            i = ae.timers,
                            o = ae._data(this);
                        if (a) o[a] && o[a].stop && n(o[a]);
                        else
                            for (a in o) o[a] && o[a].stop && vt.test(a) && n(o[a]);
                        for (a = i.length; a--;) i[a].elem !== this || (null != e && i[a].queue !== e) || (i[a].anim.stop(r), (t = !1), i.splice(a, 1));
                        (!t && r) || ae.dequeue(this, e);
                    })
                );
            },
            finish: function(e) {
                return (
                    e !== !1 && (e = e || "fx"),
                    this.each(function() {
                        var t,
                            r = ae._data(this),
                            n = r[e + "queue"],
                            a = r[e + "queueHooks"],
                            i = ae.timers,
                            o = n ? n.length : 0;
                        for (r.finish = !0, ae.queue(this, e, []), a && a.stop && a.stop.call(this, !0), t = i.length; t--;) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
                        for (t = 0; t < o; t++) n[t] && n[t].finish && n[t].finish.call(this);
                        delete r.finish;
                    })
                );
            },
        }),
        ae.each(["toggle", "show", "hide"], function(e, t) {
            var r = ae.fn[t];
            ae.fn[t] = function(e, n, a) {
                return null == e || "boolean" == typeof e ? r.apply(this, arguments) : this.animate(L(t, !0), e, n, a);
            };
        }),
        ae.each({ slideDown: L("show"), slideUp: L("hide"), slideToggle: L("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(e, t) {
            ae.fn[e] = function(e, r, n) {
                return this.animate(t, e, r, n);
            };
        }),
        (ae.timers = []),
        (ae.fx.tick = function() {
            var e,
                t = ae.timers,
                r = 0;
            for (ht = ae.now(); r < t.length; r++)(e = t[r]), e() || t[r] !== e || t.splice(r--, 1);
            t.length || ae.fx.stop(), (ht = void 0);
        }),
        (ae.fx.timer = function(e) {
            ae.timers.push(e), e() ? ae.fx.start() : ae.timers.pop();
        }),
        (ae.fx.interval = 13),
        (ae.fx.start = function() {
            ft || (ft = setInterval(ae.fx.tick, ae.fx.interval));
        }),
        (ae.fx.stop = function() {
            clearInterval(ft), (ft = null);
        }),
        (ae.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (ae.fn.delay = function(e, t) {
            return (
                (e = ae.fx ? ae.fx.speeds[e] || e : e),
                (t = t || "fx"),
                this.queue(t, function(t, r) {
                    var n = setTimeout(t, e);
                    r.stop = function() {
                        clearTimeout(n);
                    };
                })
            );
        }),
        (function() {
            var e, t, r, n, a;
            (t = fe.createElement("div")),
            t.setAttribute("className", "t"),
                (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (n = t.getElementsByTagName("a")[0]),
                (r = fe.createElement("select")),
                (a = r.appendChild(fe.createElement("option"))),
                (e = t.getElementsByTagName("input")[0]),
                (n.style.cssText = "top:1px"),
                (re.getSetAttribute = "t" !== t.className),
                (re.style = /top/.test(n.getAttribute("style"))),
                (re.hrefNormalized = "/a" === n.getAttribute("href")),
                (re.checkOn = !!e.value),
                (re.optSelected = a.selected),
                (re.enctype = !!fe.createElement("form").enctype),
                (r.disabled = !0),
                (re.optDisabled = !a.disabled),
                (e = fe.createElement("input")),
                e.setAttribute("value", ""),
                (re.input = "" === e.getAttribute("value")),
                (e.value = "t"),
                e.setAttribute("type", "radio"),
                (re.radioValue = "t" === e.value);
        })();
    var St = /\r/g;
    ae.fn.extend({
            val: function(e) {
                var t,
                    r,
                    n,
                    a = this[0]; {
                    if (arguments.length)
                        return (
                            (n = ae.isFunction(e)),
                            this.each(function(r) {
                                var a;
                                1 === this.nodeType &&
                                    ((a = n ? e.call(this, r, ae(this).val()) : e),
                                        null == a ?
                                        (a = "") :
                                        "number" == typeof a ?
                                        (a += "") :
                                        ae.isArray(a) &&
                                        (a = ae.map(a, function(e) {
                                            return null == e ? "" : e + "";
                                        })),
                                        (t = ae.valHooks[this.type] || ae.valHooks[this.nodeName.toLowerCase()]),
                                        (t && "set" in t && void 0 !== t.set(this, a, "value")) || (this.value = a));
                            })
                        );
                    if (a) return (t = ae.valHooks[a.type] || ae.valHooks[a.nodeName.toLowerCase()]), t && "get" in t && void 0 !== (r = t.get(a, "value")) ? r : ((r = a.value), "string" == typeof r ? r.replace(St, "") : null == r ? "" : r);
                }
            },
        }),
        ae.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = ae.find.attr(e, "value");
                        return null != t ? t : ae.trim(ae.text(e));
                    },
                },
                select: {
                    get: function(e) {
                        for (var t, r, n = e.options, a = e.selectedIndex, i = "select-one" === e.type || a < 0, o = i ? null : [], s = i ? a + 1 : n.length, l = a < 0 ? s : i ? a : 0; l < s; l++)
                            if (((r = n[l]), (r.selected || l === a) && (re.optDisabled ? !r.disabled : null === r.getAttribute("disabled")) && (!r.parentNode.disabled || !ae.nodeName(r.parentNode, "optgroup")))) {
                                if (((t = ae(r).val()), i)) return t;
                                o.push(t);
                            }
                        return o;
                    },
                    set: function(e, t) {
                        for (var r, n, a = e.options, i = ae.makeArray(t), o = a.length; o--;)
                            if (((n = a[o]), ae.inArray(ae.valHooks.option.get(n), i) >= 0))
                                try {
                                    n.selected = r = !0;
                                } catch (s) {
                                    n.scrollHeight;
                                }
                            else n.selected = !1;
                        return r || (e.selectedIndex = -1), a;
                    },
                },
            },
        }),
        ae.each(["radio", "checkbox"], function() {
            (ae.valHooks[this] = {
                set: function(e, t) {
                    if (ae.isArray(t)) return (e.checked = ae.inArray(ae(e).val(), t) >= 0);
                },
            }),
            re.checkOn ||
                (ae.valHooks[this].get = function(e) {
                    return null === e.getAttribute("value") ? "on" : e.value;
                });
        });
    var wt,
        Ct,
        _t = ae.expr.attrHandle,
        xt = /^(?:checked|selected)$/i,
        Pt = re.getSetAttribute,
        At = re.input;
    ae.fn.extend({
            attr: function(e, t) {
                return Ie(this, ae.attr, e, t, arguments.length > 1);
            },
            removeAttr: function(e) {
                return this.each(function() {
                    ae.removeAttr(this, e);
                });
            },
        }),
        ae.extend({
            attr: function(e, t, r) {
                var n,
                    a,
                    i = e.nodeType;
                if (e && 3 !== i && 8 !== i && 2 !== i)
                    return typeof e.getAttribute === _e ?
                        ae.prop(e, t, r) :
                        ((1 === i && ae.isXMLDoc(e)) || ((t = t.toLowerCase()), (n = ae.attrHooks[t] || (ae.expr.match.bool.test(t) ? Ct : wt))),
                            void 0 === r ?
                            n && "get" in n && null !== (a = n.get(e, t)) ?
                            a :
                            ((a = ae.find.attr(e, t)), null == a ? void 0 : a) :
                            null !== r ?
                            n && "set" in n && void 0 !== (a = n.set(e, r, t)) ?
                            a :
                            (e.setAttribute(t, r + ""), r) :
                            void ae.removeAttr(e, t));
            },
            removeAttr: function(e, t) {
                var r,
                    n,
                    a = 0,
                    i = t && t.match(be);
                if (i && 1 === e.nodeType)
                    for (;
                        (r = i[a++]);)(n = ae.propFix[r] || r), ae.expr.match.bool.test(r) ? ((At && Pt) || !xt.test(r) ? (e[n] = !1) : (e[ae.camelCase("default-" + r)] = e[n] = !1)) : ae.attr(e, r, ""), e.removeAttribute(Pt ? r : n);
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!re.radioValue && "radio" === t && ae.nodeName(e, "input")) {
                            var r = e.value;
                            return e.setAttribute("type", t), r && (e.value = r), t;
                        }
                    },
                },
            },
        }),
        (Ct = {
            set: function(e, t, r) {
                return t === !1 ? ae.removeAttr(e, r) : (At && Pt) || !xt.test(r) ? e.setAttribute((!Pt && ae.propFix[r]) || r, r) : (e[ae.camelCase("default-" + r)] = e[r] = !0), r;
            },
        }),
        ae.each(ae.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var r = _t[t] || ae.find.attr;
            _t[t] =
                (At && Pt) || !xt.test(t) ?

                function(e, t, n) {
                    var a, i;
                    return n || ((i = _t[t]), (_t[t] = a), (a = null != r(e, t, n) ? t.toLowerCase() : null), (_t[t] = i)), a;
                } :
                function(e, t, r) {
                    if (!r) return e[ae.camelCase("default-" + t)] ? t.toLowerCase() : null;
                };
        }),
        (At && Pt) ||
        (ae.attrHooks.value = {
            set: function(e, t, r) {
                return ae.nodeName(e, "input") ? void(e.defaultValue = t) : wt && wt.set(e, t, r);
            },
        }),
        Pt ||
        ((wt = {
                set: function(e, t, r) {
                    var n = e.getAttributeNode(r);
                    if ((n || e.setAttributeNode((n = e.ownerDocument.createAttribute(r))), (n.value = t += ""), "value" === r || t === e.getAttribute(r))) return t;
                },
            }),
            (_t.id = _t.name = _t.coords = function(e, t, r) {
                var n;
                if (!r) return (n = e.getAttributeNode(t)) && "" !== n.value ? n.value : null;
            }),
            (ae.valHooks.button = {
                get: function(e, t) {
                    var r = e.getAttributeNode(t);
                    if (r && r.specified) return r.value;
                },
                set: wt.set,
            }),
            (ae.attrHooks.contenteditable = {
                set: function(e, t, r) {
                    wt.set(e, "" !== t && t, r);
                },
            }),
            ae.each(["width", "height"], function(e, t) {
                ae.attrHooks[t] = {
                    set: function(e, r) {
                        if ("" === r) return e.setAttribute(t, "auto"), r;
                    },
                };
            })),
        re.style ||
        (ae.attrHooks.style = {
            get: function(e) {
                return e.style.cssText || void 0;
            },
            set: function(e, t) {
                return (e.style.cssText = t + "");
            },
        });
    var $t = /^(?:input|select|textarea|button|object)$/i,
        Dt = /^(?:a|area)$/i;
    ae.fn.extend({
            prop: function(e, t) {
                return Ie(this, ae.prop, e, t, arguments.length > 1);
            },
            removeProp: function(e) {
                return (
                    (e = ae.propFix[e] || e),
                    this.each(function() {
                        try {
                            (this[e] = void 0), delete this[e];
                        } catch (t) {}
                    })
                );
            },
        }),
        ae.extend({
            propFix: { for: "htmlFor", class: "className" },
            prop: function(e, t, r) {
                var n,
                    a,
                    i,
                    o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o)
                    return (
                        (i = 1 !== o || !ae.isXMLDoc(e)),
                        i && ((t = ae.propFix[t] || t), (a = ae.propHooks[t])),
                        void 0 !== r ? (a && "set" in a && void 0 !== (n = a.set(e, r, t)) ? n : (e[t] = r)) : a && "get" in a && null !== (n = a.get(e, t)) ? n : e[t]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = ae.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : $t.test(e.nodeName) || (Dt.test(e.nodeName) && e.href) ? 0 : -1;
                    },
                },
            },
        }),
        re.hrefNormalized ||
        ae.each(["href", "src"], function(e, t) {
            ae.propHooks[t] = {
                get: function(e) {
                    return e.getAttribute(t, 4);
                },
            };
        }),
        re.optSelected ||
        (ae.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
            },
        }),
        ae.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ae.propFix[this.toLowerCase()] = this;
        }),
        re.enctype || (ae.propFix.enctype = "encoding");
    var It = /[\t\r\n\f]/g;
    ae.fn.extend({
            addClass: function(e) {
                var t,
                    r,
                    n,
                    a,
                    i,
                    o,
                    s = 0,
                    l = this.length,
                    d = "string" == typeof e && e;
                if (ae.isFunction(e))
                    return this.each(function(t) {
                        ae(this).addClass(e.call(this, t, this.className));
                    });
                if (d)
                    for (t = (e || "").match(be) || []; s < l; s++)
                        if (((r = this[s]), (n = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(It, " ") : " ")))) {
                            for (i = 0;
                                (a = t[i++]);) n.indexOf(" " + a + " ") < 0 && (n += a + " ");
                            (o = ae.trim(n)), r.className !== o && (r.className = o);
                        }
                return this;
            },
            removeClass: function(e) {
                var t,
                    r,
                    n,
                    a,
                    i,
                    o,
                    s = 0,
                    l = this.length,
                    d = 0 === arguments.length || ("string" == typeof e && e);
                if (ae.isFunction(e))
                    return this.each(function(t) {
                        ae(this).removeClass(e.call(this, t, this.className));
                    });
                if (d)
                    for (t = (e || "").match(be) || []; s < l; s++)
                        if (((r = this[s]), (n = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(It, " ") : "")))) {
                            for (i = 0;
                                (a = t[i++]);)
                                for (; n.indexOf(" " + a + " ") >= 0;) n = n.replace(" " + a + " ", " ");
                            (o = e ? ae.trim(n) : ""), r.className !== o && (r.className = o);
                        }
                return this;
            },
            toggleClass: function(e, t) {
                var r = typeof e;
                return "boolean" == typeof t && "string" === r ?
                    t ?
                    this.addClass(e) :
                    this.removeClass(e) :
                    ae.isFunction(e) ?
                    this.each(function(r) {
                        ae(this).toggleClass(e.call(this, r, this.className, t), t);
                    }) :
                    this.each(function() {
                        if ("string" === r)
                            for (var t, n = 0, a = ae(this), i = e.match(be) || [];
                                (t = i[n++]);) a.hasClass(t) ? a.removeClass(t) : a.addClass(t);
                        else(r !== _e && "boolean" !== r) || (this.className && ae._data(this, "__className__", this.className), (this.className = this.className || e === !1 ? "" : ae._data(this, "__className__") || ""));
                    });
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", r = 0, n = this.length; r < n; r++)
                    if (1 === this[r].nodeType && (" " + this[r].className + " ").replace(It, " ").indexOf(t) >= 0) return !0;
                return !1;
            },
        }),
        ae.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(
            e,
            t
        ) {
            ae.fn[t] = function(e, r) {
                return arguments.length > 0 ? this.on(t, null, e, r) : this.trigger(t);
            };
        }),
        ae.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e);
            },
            bind: function(e, t, r) {
                return this.on(e, null, t, r);
            },
            unbind: function(e, t) {
                return this.off(e, null, t);
            },
            delegate: function(e, t, r, n) {
                return this.on(t, e, r, n);
            },
            undelegate: function(e, t, r) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", r);
            },
        });
    var Et = ae.now(),
        Bt = /\?/,
        Ot = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    (ae.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var r,
            n = null,
            a = ae.trim(t + "");
        return a &&
            !ae.trim(
                a.replace(Ot, function(e, t, a, i) {
                    return r && t && (n = 0), 0 === n ? e : ((r = a || t), (n += !i - !a), "");
                })
            ) ?
            Function("return " + a)() :
            ae.error("Invalid JSON: " + t);
    }),
    (ae.parseXML = function(t) {
        var r, n;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? ((n = new DOMParser()), (r = n.parseFromString(t, "text/xml"))) : ((r = new ActiveXObject("Microsoft.XMLDOM")), (r.async = "false"), r.loadXML(t));
        } catch (a) {
            r = void 0;
        }
        return (r && r.documentElement && !r.getElementsByTagName("parsererror").length) || ae.error("Invalid XML: " + t), r;
    });
    var kt,
        Lt,
        Tt = /#.*$/,
        Rt = /([?&])_=[^&]*/,
        Nt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        qt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Mt = /^(?:GET|HEAD)$/,
        Ft = /^\/\//,
        Ut = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Ht = {},
        zt = {},
        Vt = "*/".concat("*");
    try {
        Lt = location.href;
    } catch (jt) {
        (Lt = fe.createElement("a")), (Lt.href = ""), (Lt = Lt.href);
    }
    (kt = Ut.exec(Lt.toLowerCase()) || []),
    ae.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Lt,
                type: "GET",
                isLocal: qt.test(kt[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": Vt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /xml/, html: /html/, json: /json/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": ae.parseJSON, "text xml": ae.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function(e, t) {
                return t ? U(U(e, ae.ajaxSettings), t) : U(ae.ajaxSettings, e);
            },
            ajaxPrefilter: M(Ht),
            ajaxTransport: M(zt),
            ajax: function(e, t) {
                function r(e, t, r, n) {
                    var a,
                        c,
                        v,
                        y,
                        S,
                        C = t;
                    2 !== b &&
                        ((b = 2),
                            s && clearTimeout(s),
                            (d = void 0),
                            (o = n || ""),
                            (w.readyState = e > 0 ? 4 : 0),
                            (a = (e >= 200 && e < 300) || 304 === e),
                            r && (y = H(u, w, r)),
                            (y = z(u, y, w, a)),
                            a ?
                            (u.ifModified && ((S = w.getResponseHeader("Last-Modified")), S && (ae.lastModified[i] = S), (S = w.getResponseHeader("etag")), S && (ae.etag[i] = S)),
                                204 === e || "HEAD" === u.type ? (C = "nocontent") : 304 === e ? (C = "notmodified") : ((C = y.state), (c = y.data), (v = y.error), (a = !v))) :
                            ((v = C), (!e && C) || ((C = "error"), e < 0 && (e = 0))),
                            (w.status = e),
                            (w.statusText = (t || C) + ""),
                            a ? f.resolveWith(p, [c, C, w]) : f.rejectWith(p, [w, C, v]),
                            w.statusCode(g),
                            (g = void 0),
                            l && h.trigger(a ? "ajaxSuccess" : "ajaxError", [w, u, a ? c : v]),
                            m.fireWith(p, [w, C]),
                            l && (h.trigger("ajaxComplete", [w, u]), --ae.active || ae.event.trigger("ajaxStop")));
                }
                "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
                var n,
                    a,
                    i,
                    o,
                    s,
                    l,
                    d,
                    c,
                    u = ae.ajaxSetup({}, t),
                    p = u.context || u,
                    h = u.context && (p.nodeType || p.jquery) ? ae(p) : ae.event,
                    f = ae.Deferred(),
                    m = ae.Callbacks("once memory"),
                    g = u.statusCode || {},
                    v = {},
                    y = {},
                    b = 0,
                    S = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === b) {
                                if (!c)
                                    for (c = {};
                                        (t = Nt.exec(o));) c[t[1].toLowerCase()] = t[2];
                                t = c[e.toLowerCase()];
                            }
                            return null == t ? null : t;
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? o : null;
                        },
                        setRequestHeader: function(e, t) {
                            var r = e.toLowerCase();
                            return b || ((e = y[r] = y[r] || e), (v[e] = t)), this;
                        },
                        overrideMimeType: function(e) {
                            return b || (u.mimeType = e), this;
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (b < 2)
                                    for (t in e) g[t] = [g[t], e[t]];
                                else w.always(e[w.status]);
                            return this;
                        },
                        abort: function(e) {
                            var t = e || S;
                            return d && d.abort(t), r(0, t), this;
                        },
                    };
                if (
                    ((f.promise(w).complete = m.add),
                        (w.success = w.done),
                        (w.error = w.fail),
                        (u.url = ((e || u.url || Lt) + "").replace(Tt, "").replace(Ft, kt[1] + "//")),
                        (u.type = t.method || t.type || u.method || u.type),
                        (u.dataTypes = ae
                            .trim(u.dataType || "*")
                            .toLowerCase()
                            .match(be) || [""]),
                        null == u.crossDomain &&
                        ((n = Ut.exec(u.url.toLowerCase())), (u.crossDomain = !(!n || (n[1] === kt[1] && n[2] === kt[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (kt[3] || ("http:" === kt[1] ? "80" : "443")))))),
                        u.data && u.processData && "string" != typeof u.data && (u.data = ae.param(u.data, u.traditional)),
                        F(Ht, u, t, w),
                        2 === b)
                )
                    return w;
                (l = ae.event && u.global),
                l && 0 === ae.active++ && ae.event.trigger("ajaxStart"),
                    (u.type = u.type.toUpperCase()),
                    (u.hasContent = !Mt.test(u.type)),
                    (i = u.url),
                    u.hasContent || (u.data && ((i = u.url += (Bt.test(i) ? "&" : "?") + u.data), delete u.data), u.cache === !1 && (u.url = Rt.test(i) ? i.replace(Rt, "$1_=" + Et++) : i + (Bt.test(i) ? "&" : "?") + "_=" + Et++)),
                    u.ifModified && (ae.lastModified[i] && w.setRequestHeader("If-Modified-Since", ae.lastModified[i]), ae.etag[i] && w.setRequestHeader("If-None-Match", ae.etag[i])),
                    ((u.data && u.hasContent && u.contentType !== !1) || t.contentType) && w.setRequestHeader("Content-Type", u.contentType),
                    w.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + Vt + "; q=0.01" : "") : u.accepts["*"]);
                for (a in u.headers) w.setRequestHeader(a, u.headers[a]);
                if (u.beforeSend && (u.beforeSend.call(p, w, u) === !1 || 2 === b)) return w.abort();
                S = "abort";
                for (a in { success: 1, error: 1, complete: 1 }) w[a](u[a]);
                if ((d = F(zt, u, t, w))) {
                    (w.readyState = 1),
                    l && h.trigger("ajaxSend", [w, u]),
                        u.async &&
                        u.timeout > 0 &&
                        (s = setTimeout(function() {
                            w.abort("timeout");
                        }, u.timeout));
                    try {
                        (b = 1), d.send(v, r);
                    } catch (C) {
                        if (!(b < 2)) throw C;
                        r(-1, C);
                    }
                } else r(-1, "No Transport");
                return w;
            },
            getJSON: function(e, t, r) {
                return ae.get(e, t, r, "json");
            },
            getScript: function(e, t) {
                return ae.get(e, void 0, t, "script");
            },
        }),
        ae.each(["get", "post"], function(e, t) {
            ae[t] = function(e, r, n, a) {
                return ae.isFunction(r) && ((a = a || n), (n = r), (r = void 0)), ae.ajax({ url: e, type: t, dataType: a, data: r, success: n });
            };
        }),
        (ae._evalUrl = function(e) {
            return ae.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
        }),
        ae.fn.extend({
            wrapAll: function(e) {
                if (ae.isFunction(e))
                    return this.each(function(t) {
                        ae(this).wrapAll(e.call(this, t));
                    });
                if (this[0]) {
                    var t = ae(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]),
                        t
                        .map(function() {
                            for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                            return e;
                        })
                        .append(this);
                }
                return this;
            },
            wrapInner: function(e) {
                return ae.isFunction(e) ?
                    this.each(function(t) {
                        ae(this).wrapInner(e.call(this, t));
                    }) :
                    this.each(function() {
                        var t = ae(this),
                            r = t.contents();
                        r.length ? r.wrapAll(e) : t.append(e);
                    });
            },
            wrap: function(e) {
                var t = ae.isFunction(e);
                return this.each(function(r) {
                    ae(this).wrapAll(t ? e.call(this, r) : e);
                });
            },
            unwrap: function() {
                return this.parent()
                    .each(function() {
                        ae.nodeName(this, "body") || ae(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        }),
        (ae.expr.filters.hidden = function(e) {
            return (e.offsetWidth <= 0 && e.offsetHeight <= 0) || (!re.reliableHiddenOffsets() && "none" === ((e.style && e.style.display) || ae.css(e, "display")));
        }),
        (ae.expr.filters.visible = function(e) {
            return !ae.expr.filters.hidden(e);
        });
    var Gt = /%20/g,
        Wt = /\[\]$/,
        Yt = /\r?\n/g,
        Kt = /^(?:submit|button|image|reset|file)$/i,
        Qt = /^(?:input|select|textarea|keygen)/i;
    (ae.param = function(e, t) {
        var r,
            n = [],
            a = function(e, t) {
                (t = ae.isFunction(t) ? t() : null == t ? "" : t), (n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
            };
        if ((void 0 === t && (t = ae.ajaxSettings && ae.ajaxSettings.traditional), ae.isArray(e) || (e.jquery && !ae.isPlainObject(e))))
            ae.each(e, function() {
                a(this.name, this.value);
            });
        else
            for (r in e) V(r, e[r], t, a);
        return n.join("&").replace(Gt, "+");
    }),
    ae.fn.extend({
            serialize: function() {
                return ae.param(this.serializeArray());
            },
            serializeArray: function() {
                return this.map(function() {
                        var e = ae.prop(this, "elements");
                        return e ? ae.makeArray(e) : this;
                    })
                    .filter(function() {
                        var e = this.type;
                        return this.name && !ae(this).is(":disabled") && Qt.test(this.nodeName) && !Kt.test(e) && (this.checked || !Ee.test(e));
                    })
                    .map(function(e, t) {
                        var r = ae(this).val();
                        return null == r ?
                            null :
                            ae.isArray(r) ?
                            ae.map(r, function(e) {
                                return { name: t.name, value: e.replace(Yt, "\r\n") };
                            }) : { name: t.name, value: r.replace(Yt, "\r\n") };
                    })
                    .get();
            },
        }),
        (ae.ajaxSettings.xhr =
            void 0 !== e.ActiveXObject ?

            function() {
                return (!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && j()) || G();
            } :
            j);
    var Zt = 0,
        Jt = {},
        Xt = ae.ajaxSettings.xhr();
    e.attachEvent &&
        e.attachEvent("onunload", function() {
            for (var e in Jt) Jt[e](void 0, !0);
        }),
        (re.cors = !!Xt && "withCredentials" in Xt),
        (Xt = re.ajax = !!Xt),
        Xt &&
        ae.ajaxTransport(function(e) {
            if (!e.crossDomain || re.cors) {
                var t;
                return {
                    send: function(r, n) {
                        var a,
                            i = e.xhr(),
                            o = ++Zt;
                        if ((i.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields))
                            for (a in e.xhrFields) i[a] = e.xhrFields[a];
                        e.mimeType && i.overrideMimeType && i.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                        for (a in r) void 0 !== r[a] && i.setRequestHeader(a, r[a] + "");
                        i.send((e.hasContent && e.data) || null),
                            (t = function(r, a) {
                                var s, l, d;
                                if (t && (a || 4 === i.readyState))
                                    if ((delete Jt[o], (t = void 0), (i.onreadystatechange = ae.noop), a)) 4 !== i.readyState && i.abort();
                                    else {
                                        (d = {}), (s = i.status), "string" == typeof i.responseText && (d.text = i.responseText);
                                        try {
                                            l = i.statusText;
                                        } catch (c) {
                                            l = "";
                                        }
                                        s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : (s = d.text ? 200 : 404);
                                    }
                                d && n(s, l, d, i.getAllResponseHeaders());
                            }),
                            e.async ? (4 === i.readyState ? setTimeout(t) : (i.onreadystatechange = Jt[o] = t)) : t();
                    },
                    abort: function() {
                        t && t(void 0, !0);
                    },
                };
            }
        }),
        ae.ajaxSetup({
            accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
            contents: { script: /(?:java|ecma)script/ },
            converters: {
                "text script": function(e) {
                    return ae.globalEval(e), e;
                },
            },
        }),
        ae.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && ((e.type = "GET"), (e.global = !1));
        }),
        ae.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t,
                    r = fe.head || ae("head")[0] || fe.documentElement;
                return {
                    send: function(n, a) {
                        (t = fe.createElement("script")),
                        (t.async = !0),
                        e.scriptCharset && (t.charset = e.scriptCharset),
                            (t.src = e.url),
                            (t.onload = t.onreadystatechange = function(e, r) {
                                (r || !t.readyState || /loaded|complete/.test(t.readyState)) && ((t.onload = t.onreadystatechange = null), t.parentNode && t.parentNode.removeChild(t), (t = null), r || a(200, "success"));
                            }),
                            r.insertBefore(t, r.firstChild);
                    },
                    abort: function() {
                        t && t.onload(void 0, !0);
                    },
                };
            }
        });
    var er = [],
        tr = /(=)\?(?=&|$)|\?\?/;
    ae.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = er.pop() || ae.expando + "_" + Et++;
                return (this[e] = !0), e;
            },
        }),
        ae.ajaxPrefilter("json jsonp", function(t, r, n) {
            var a,
                i,
                o,
                s = t.jsonp !== !1 && (tr.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tr.test(t.data) && "data");
            if (s || "jsonp" === t.dataTypes[0])
                return (
                    (a = t.jsonpCallback = ae.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                    s ? (t[s] = t[s].replace(tr, "$1" + a)) : t.jsonp !== !1 && (t.url += (Bt.test(t.url) ? "&" : "?") + t.jsonp + "=" + a),
                    (t.converters["script json"] = function() {
                        return o || ae.error(a + " was not called"), o[0];
                    }),
                    (t.dataTypes[0] = "json"),
                    (i = e[a]),
                    (e[a] = function() {
                        o = arguments;
                    }),
                    n.always(function() {
                        (e[a] = i), t[a] && ((t.jsonpCallback = r.jsonpCallback), er.push(a)), o && ae.isFunction(i) && i(o[0]), (o = i = void 0);
                    }),
                    "script"
                );
        }),
        (ae.parseHTML = function(e, t, r) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && ((r = t), (t = !1)), (t = t || fe);
            var n = ue.exec(e),
                a = !r && [];
            return n ? [t.createElement(n[1])] : ((n = ae.buildFragment([e], t, a)), a && a.length && ae(a).remove(), ae.merge([], n.childNodes));
        });
    var rr = ae.fn.load;
    (ae.fn.load = function(e, t, r) {
        if ("string" != typeof e && rr) return rr.apply(this, arguments);
        var n,
            a,
            i,
            o = this,
            s = e.indexOf(" ");
        return (
            s >= 0 && ((n = ae.trim(e.slice(s, e.length))), (e = e.slice(0, s))),
            ae.isFunction(t) ? ((r = t), (t = void 0)) : t && "object" == typeof t && (i = "POST"),
            o.length > 0 &&
            ae
            .ajax({ url: e, type: i, dataType: "html", data: t })
            .done(function(e) {
                (a = arguments), o.html(n ? ae("<div>").append(ae.parseHTML(e)).find(n) : e);
            })
            .complete(
                r &&
                function(e, t) {
                    o.each(r, a || [e.responseText, t, e]);
                }
            ),
            this
        );
    }),
    ae.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            ae.fn[t] = function(e) {
                return this.on(t, e);
            };
        }),
        (ae.expr.filters.animated = function(e) {
            return ae.grep(ae.timers, function(t) {
                return e === t.elem;
            }).length;
        });
    var nr = e.document.documentElement;
    (ae.offset = {
        setOffset: function(e, t, r) {
            var n,
                a,
                i,
                o,
                s,
                l,
                d,
                c = ae.css(e, "position"),
                u = ae(e),
                p = {};
            "static" === c && (e.style.position = "relative"),
                (s = u.offset()),
                (i = ae.css(e, "top")),
                (l = ae.css(e, "left")),
                (d = ("absolute" === c || "fixed" === c) && ae.inArray("auto", [i, l]) > -1),
                d ? ((n = u.position()), (o = n.top), (a = n.left)) : ((o = parseFloat(i) || 0), (a = parseFloat(l) || 0)),
                ae.isFunction(t) && (t = t.call(e, r, s)),
                null != t.top && (p.top = t.top - s.top + o),
                null != t.left && (p.left = t.left - s.left + a),
                "using" in t ? t.using.call(e, p) : u.css(p);
        },
    }),
    ae.fn.extend({
            offset: function(e) {
                if (arguments.length)
                    return void 0 === e ?
                        this :
                        this.each(function(t) {
                            ae.offset.setOffset(this, e, t);
                        });
                var t,
                    r,
                    n = { top: 0, left: 0 },
                    a = this[0],
                    i = a && a.ownerDocument;
                if (i)
                    return (
                        (t = i.documentElement),
                        ae.contains(t, a) ?
                        (typeof a.getBoundingClientRect !== _e && (n = a.getBoundingClientRect()),
                            (r = W(i)), { top: n.top + (r.pageYOffset || t.scrollTop) - (t.clientTop || 0), left: n.left + (r.pageXOffset || t.scrollLeft) - (t.clientLeft || 0) }) :
                        n
                    );
            },
            position: function() {
                if (this[0]) {
                    var e,
                        t,
                        r = { top: 0, left: 0 },
                        n = this[0];
                    return (
                        "fixed" === ae.css(n, "position") ?
                        (t = n.getBoundingClientRect()) :
                        ((e = this.offsetParent()), (t = this.offset()), ae.nodeName(e[0], "html") || (r = e.offset()), (r.top += ae.css(e[0], "borderTopWidth", !0)), (r.left += ae.css(e[0], "borderLeftWidth", !0))), { top: t.top - r.top - ae.css(n, "marginTop", !0), left: t.left - r.left - ae.css(n, "marginLeft", !0) }
                    );
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || nr; e && !ae.nodeName(e, "html") && "static" === ae.css(e, "position");) e = e.offsetParent;
                    return e || nr;
                });
            },
        }),
        ae.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(e, t) {
            var r = /Y/.test(t);
            ae.fn[e] = function(n) {
                return Ie(
                    this,
                    function(e, n, a) {
                        var i = W(e);
                        return void 0 === a ? (i ? (t in i ? i[t] : i.document.documentElement[n]) : e[n]) : void(i ? i.scrollTo(r ? ae(i).scrollLeft() : a, r ? a : ae(i).scrollTop()) : (e[n] = a));
                    },
                    e,
                    n,
                    arguments.length,
                    null
                );
            };
        }),
        ae.each(["top", "left"], function(e, t) {
            ae.cssHooks[t] = A(re.pixelPosition, function(e, r) {
                if (r) return (r = tt(e, t)), nt.test(r) ? ae(e).position()[t] + "px" : r;
            });
        }),
        ae.each({ Height: "height", Width: "width" }, function(e, t) {
            ae.each({ padding: "inner" + e, content: t, "": "outer" + e }, function(r, n) {
                ae.fn[n] = function(n, a) {
                    var i = arguments.length && (r || "boolean" != typeof n),
                        o = r || (n === !0 || a === !0 ? "margin" : "border");
                    return Ie(
                        this,
                        function(t, r, n) {
                            var a;
                            return ae.isWindow(t) ?
                                t.document.documentElement["client" + e] :
                                9 === t.nodeType ?
                                ((a = t.documentElement), Math.max(t.body["scroll" + e], a["scroll" + e], t.body["offset" + e], a["offset" + e], a["client" + e])) :
                                void 0 === n ?
                                ae.css(t, r, o) :
                                ae.style(t, r, n, o);
                        },
                        t,
                        i ? n : void 0,
                        i,
                        null
                    );
                };
            });
        }),
        (ae.fn.size = function() {
            return this.length;
        }),
        (ae.fn.andSelf = ae.fn.addBack),
        "function" == typeof define &&
        define.amd &&
        define("jquery", [], function() {
            return ae;
        });
    var ar = e.jQuery,
        ir = e.$;
    return (
        (ae.noConflict = function(t) {
            return e.$ === ae && (e.$ = ir), t && e.jQuery === ae && (e.jQuery = ar), ae;
        }),
        typeof t === _e && (e.jQuery = e.$ = ae),
        ae
    );
}),
(function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (module.exports = t()) : (e.Handlebars = t());
})(this, function() {
    var e = (function() {
            "use strict";

            function e(e) {
                return l[e];
            }

            function t(e) {
                for (var t = 1; t < arguments.length; t++)
                    for (var r in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], r) && (e[r] = arguments[t][r]);
                return e;
            }

            function r(e, t) {
                for (var r = 0, n = e.length; r < n; r++)
                    if (e[r] === t) return r;
                return -1;
            }

            function n(t) {
                return t && t.toHTML ? t.toHTML() : null == t ? "" : t ? ((t = "" + t), c.test(t) ? t.replace(d, e) : t) : t + "";
            }

            function a(e) {
                return (!e && 0 !== e) || !(!h(e) || 0 !== e.length);
            }

            function i(e, t) {
                return (e.path = t), e;
            }

            function o(e, t) {
                return (e ? e + "." : "") + t;
            }
            var s = {},
                l = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
                d = /[&<>"'`]/g,
                c = /[&<>"'`]/;
            s.extend = t;
            var u = Object.prototype.toString;
            s.toString = u;
            var p = function(e) {
                return "function" == typeof e;
            };
            p(/x/) &&
                (p = function(e) {
                    return "function" == typeof e && "[object Function]" === u.call(e);
                });
            var p;
            s.isFunction = p;
            var h =
                Array.isArray ||
                function(e) {
                    return !(!e || "object" != typeof e) && "[object Array]" === u.call(e);
                };
            return (s.isArray = h), (s.indexOf = r), (s.escapeExpression = n), (s.isEmpty = a), (s.blockParams = i), (s.appendContextPath = o), s;
        })(),
        t = (function() {
            "use strict";

            function e(e, t) {
                var n,
                    a,
                    i = t && t.loc;
                i && ((n = i.start.line), (a = i.start.column), (e += " - " + n + ":" + a));
                for (var o = Error.prototype.constructor.call(this, e), s = 0; s < r.length; s++) this[r[s]] = o[r[s]];
                i && ((this.lineNumber = n), (this.column = a));
            }
            var t,
                r = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
            return (e.prototype = new Error()), (t = e);
        })(),
        r = (function(e, t) {
            "use strict";

            function r(e, t) {
                (this.helpers = e || {}), (this.partials = t || {}), n(this);
            }

            function n(e) {
                e.registerHelper("helperMissing", function() {
                        if (1 !== arguments.length) throw new o("Missing helper: '" + arguments[arguments.length - 1].name + "'");
                    }),
                    e.registerHelper("blockHelperMissing", function(t, r) {
                        var n = r.inverse,
                            a = r.fn;
                        if (t === !0) return a(this);
                        if (t === !1 || null == t) return n(this);
                        if (c(t)) return t.length > 0 ? (r.ids && (r.ids = [r.name]), e.helpers.each(t, r)) : n(this);
                        if (r.data && r.ids) {
                            var o = g(r.data);
                            (o.contextPath = i.appendContextPath(r.data.contextPath, r.name)), (r = { data: o });
                        }
                        return a(t, r);
                    }),
                    e.registerHelper("each", function(e, t) {
                        function r(t, r, o) {
                            n && ((n.key = t), (n.index = r), (n.first = 0 === r), (n.last = !!o), a && (n.contextPath = a + t)), (p += s(e[t], { data: n, blockParams: i.blockParams([e[t], t], [a + t, null]) }));
                        }
                        if (!t) throw new o("Must pass iterator to #each");
                        var n,
                            a,
                            s = t.fn,
                            l = t.inverse,
                            d = 0,
                            p = "";
                        if ((t.data && t.ids && (a = i.appendContextPath(t.data.contextPath, t.ids[0]) + "."), u(e) && (e = e.call(this)), t.data && (n = g(t.data)), e && "object" == typeof e))
                            if (c(e))
                                for (var h = e.length; d < h; d++) r(d, d, d === e.length - 1);
                            else {
                                var f;
                                for (var m in e) e.hasOwnProperty(m) && (f && r(f, d - 1), (f = m), d++);
                                f && r(f, d - 1, !0);
                            }
                        return 0 === d && (p = l(this)), p;
                    }),
                    e.registerHelper("if", function(e, t) {
                        return u(e) && (e = e.call(this)), (!t.hash.includeZero && !e) || i.isEmpty(e) ? t.inverse(this) : t.fn(this);
                    }),
                    e.registerHelper("unless", function(t, r) {
                        return e.helpers["if"].call(this, t, { fn: r.inverse, inverse: r.fn, hash: r.hash });
                    }),
                    e.registerHelper("with", function(e, t) {
                        u(e) && (e = e.call(this));
                        var r = t.fn;
                        if (i.isEmpty(e)) return t.inverse(this);
                        if (t.data && t.ids) {
                            var n = g(t.data);
                            (n.contextPath = i.appendContextPath(t.data.contextPath, t.ids[0])), (t = { data: n });
                        }
                        return r(e, t);
                    }),
                    e.registerHelper("log", function(t, r) {
                        var n = r.data && null != r.data.level ? parseInt(r.data.level, 10) : 1;
                        e.log(n, t);
                    }),
                    e.registerHelper("lookup", function(e, t) {
                        return e && e[t];
                    });
            }
            var a = {},
                i = e,
                o = t,
                s = "3.0.0";
            a.VERSION = s;
            var l = 6;
            a.COMPILER_REVISION = l;
            var d = { 1: "<= 1.0.rc.2", 2: "== 1.0.0-rc.3", 3: "== 1.0.0-rc.4", 4: "== 1.x.x", 5: "== 2.0.0-alpha.x", 6: ">= 2.0.0-beta.1" };
            a.REVISION_CHANGES = d;
            var c = i.isArray,
                u = i.isFunction,
                p = i.toString,
                h = "[object Object]";
            (a.HandlebarsEnvironment = r),
            (r.prototype = {
                constructor: r,
                logger: f,
                log: m,
                registerHelper: function(e, t) {
                    if (p.call(e) === h) {
                        if (t) throw new o("Arg not supported with multiple helpers");
                        i.extend(this.helpers, e);
                    } else this.helpers[e] = t;
                },
                unregisterHelper: function(e) {
                    delete this.helpers[e];
                },
                registerPartial: function(e, t) {
                    if (p.call(e) === h) i.extend(this.partials, e);
                    else {
                        if ("undefined" == typeof t) throw new o("Attempting to register a partial as undefined");
                        this.partials[e] = t;
                    }
                },
                unregisterPartial: function(e) {
                    delete this.partials[e];
                },
            });
            var f = {
                methodMap: { 0: "debug", 1: "info", 2: "warn", 3: "error" },
                DEBUG: 0,
                INFO: 1,
                WARN: 2,
                ERROR: 3,
                level: 1,
                log: function(e, t) {
                    if ("undefined" != typeof console && f.level <= e) {
                        var r = f.methodMap[e];
                        (console[r] || console.log).call(console, t);
                    }
                },
            };
            a.logger = f;
            var m = f.log;
            a.log = m;
            var g = function(e) {
                var t = i.extend({}, e);
                return (t._parent = e), t;
            };
            return (a.createFrame = g), a;
        })(e, t),
        n = (function() {
            "use strict";

            function e(e) {
                this.string = e;
            }
            var t;
            return (
                (e.prototype.toString = e.prototype.toHTML = function() {
                    return "" + this.string;
                }),
                (t = e)
            );
        })(),
        a = (function(e, t, r) {
            "use strict";

            function n(e) {
                var t = (e && e[0]) || 1,
                    r = h;
                if (t !== r) {
                    if (t < r) {
                        var n = f[r],
                            a = f[t];
                        throw new p(
                            "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
                            n +
                            ") or downgrade your runtime to an older version (" +
                            a +
                            ")."
                        );
                    }
                    throw new p("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").");
                }
            }

            function a(e, t) {
                if (!t) throw new p("No environment passed to template");
                if (!e || !e.main) throw new p("Unknown template object: " + typeof e);
                t.VM.checkRevision(e.compiler);
                var r = function(r, n, a) {
                        a.hash && (n = u.extend({}, n, a.hash)), (r = t.VM.resolvePartial.call(this, r, n, a));
                        var i = t.VM.invokePartial.call(this, r, n, a);
                        if ((null == i && t.compile && ((a.partials[a.name] = t.compile(r, e.compilerOptions, t)), (i = a.partials[a.name](n, a))), null != i)) {
                            if (a.indent) {
                                for (var o = i.split("\n"), s = 0, l = o.length; s < l && (o[s] || s + 1 !== l); s++) o[s] = a.indent + o[s];
                                i = o.join("\n");
                            }
                            return i;
                        }
                        throw new p("The partial " + a.name + " could not be compiled when running in runtime-only mode");
                    },
                    n = {
                        strict: function(e, t) {
                            if (!(t in e)) throw new p('"' + t + '" not defined in ' + e);
                            return e[t];
                        },
                        lookup: function(e, t) {
                            for (var r = e.length, n = 0; n < r; n++)
                                if (e[n] && null != e[n][t]) return e[n][t];
                        },
                        lambda: function(e, t) {
                            return "function" == typeof e ? e.call(t) : e;
                        },
                        escapeExpression: u.escapeExpression,
                        invokePartial: r,
                        fn: function(t) {
                            return e[t];
                        },
                        programs: [],
                        program: function(e, t, r, n, a) {
                            var o = this.programs[e],
                                s = this.fn(e);
                            return t || a || n || r ? (o = i(this, e, s, t, r, n, a)) : o || (o = this.programs[e] = i(this, e, s)), o;
                        },
                        data: function(e, t) {
                            for (; e && t--;) e = e._parent;
                            return e;
                        },
                        merge: function(e, t) {
                            var r = e || t;
                            return e && t && e !== t && (r = u.extend({}, t, e)), r;
                        },
                        noop: t.VM.noop,
                        compilerInfo: e.compiler,
                    },
                    a = function(t, r) {
                        r = r || {};
                        var i = r.data;
                        a._setup(r), !r.partial && e.useData && (i = d(t, i));
                        var o,
                            s = e.useBlockParams ? [] : void 0;
                        return e.useDepths && (o = r.depths ? [t].concat(r.depths) : [t]), e.main.call(n, t, n.helpers, n.partials, i, s, o);
                    };
                return (
                    (a.isTop = !0),
                    (a._setup = function(r) {
                        r.partial ? ((n.helpers = r.helpers), (n.partials = r.partials)) : ((n.helpers = n.merge(r.helpers, t.helpers)), e.usePartial && (n.partials = n.merge(r.partials, t.partials)));
                    }),
                    (a._child = function(t, r, a, o) {
                        if (e.useBlockParams && !a) throw new p("must pass block params");
                        if (e.useDepths && !o) throw new p("must pass parent depths");
                        return i(n, t, e[t], r, 0, a, o);
                    }),
                    a
                );
            }

            function i(e, t, r, n, a, i, o) {
                var s = function(t, a) {
                    return (a = a || {}), r.call(e, t, e.helpers, e.partials, a.data || n, i && [a.blockParams].concat(i), o && [t].concat(o));
                };
                return (s.program = t), (s.depth = o ? o.length : 0), (s.blockParams = a || 0), s;
            }

            function o(e, t, r) {
                return e ? e.call || r.name || ((r.name = e), (e = r.partials[e])) : (e = r.partials[r.name]), e;
            }

            function s(e, t, r) {
                if (((r.partial = !0), void 0 === e)) throw new p("The partial " + r.name + " could not be found");
                if (e instanceof Function) return e(t, r);
            }

            function l() {
                return "";
            }

            function d(e, t) {
                return (t && "root" in t) || ((t = t ? m(t) : {}), (t.root = e)), t;
            }
            var c = {},
                u = e,
                p = t,
                h = r.COMPILER_REVISION,
                f = r.REVISION_CHANGES,
                m = r.createFrame;
            return (c.checkRevision = n), (c.template = a), (c.program = i), (c.resolvePartial = o), (c.invokePartial = s), (c.noop = l), c;
        })(e, t, r),
        i = (function(e, t, r, n, a) {
            "use strict";
            var i,
                o = e,
                s = t,
                l = r,
                d = n,
                c = a,
                u = function() {
                    var e = new o.HandlebarsEnvironment();
                    return (
                        d.extend(e, o),
                        (e.SafeString = s),
                        (e.Exception = l),
                        (e.Utils = d),
                        (e.escapeExpression = d.escapeExpression),
                        (e.VM = c),
                        (e.template = function(t) {
                            return c.template(t, e);
                        }),
                        e
                    );
                },
                p = u();
            p.create = u;
            var h = "undefined" != typeof global ? global : window,
                f = h.Handlebars;
            return (
                (p.noConflict = function() {
                    h.Handlebars === p && (h.Handlebars = f);
                }),
                (p["default"] = p),
                (i = p)
            );
        })(r, n, t, e, a),
        o = (function() {
            "use strict";
            var e,
                t = {
                    Program: function(e, t, r, n) {
                        (this.loc = n), (this.type = "Program"), (this.body = e), (this.blockParams = t), (this.strip = r);
                    },
                    MustacheStatement: function(e, t, r, n, a, i) {
                        (this.loc = i), (this.type = "MustacheStatement"), (this.path = e), (this.params = t || []), (this.hash = r), (this.escaped = n), (this.strip = a);
                    },
                    BlockStatement: function(e, t, r, n, a, i, o, s, l) {
                        (this.loc = l),
                        (this.type = "BlockStatement"),
                        (this.path = e),
                        (this.params = t || []),
                        (this.hash = r),
                        (this.program = n),
                        (this.inverse = a),
                        (this.openStrip = i),
                        (this.inverseStrip = o),
                        (this.closeStrip = s);
                    },
                    PartialStatement: function(e, t, r, n, a) {
                        (this.loc = a), (this.type = "PartialStatement"), (this.name = e), (this.params = t || []), (this.hash = r), (this.indent = ""), (this.strip = n);
                    },
                    ContentStatement: function(e, t) {
                        (this.loc = t), (this.type = "ContentStatement"), (this.original = this.value = e);
                    },
                    CommentStatement: function(e, t, r) {
                        (this.loc = r), (this.type = "CommentStatement"), (this.value = e), (this.strip = t);
                    },
                    SubExpression: function(e, t, r, n) {
                        (this.loc = n), (this.type = "SubExpression"), (this.path = e), (this.params = t || []), (this.hash = r);
                    },
                    PathExpression: function(e, t, r, n, a) {
                        (this.loc = a), (this.type = "PathExpression"), (this.data = e), (this.original = n), (this.parts = r), (this.depth = t);
                    },
                    StringLiteral: function(e, t) {
                        (this.loc = t), (this.type = "StringLiteral"), (this.original = this.value = e);
                    },
                    NumberLiteral: function(e, t) {
                        (this.loc = t), (this.type = "NumberLiteral"), (this.original = this.value = Number(e));
                    },
                    BooleanLiteral: function(e, t) {
                        (this.loc = t), (this.type = "BooleanLiteral"), (this.original = this.value = "true" === e);
                    },
                    Hash: function(e, t) {
                        (this.loc = t), (this.type = "Hash"), (this.pairs = e);
                    },
                    HashPair: function(e, t, r) {
                        (this.loc = r), (this.type = "HashPair"), (this.key = e), (this.value = t);
                    },
                    helpers: {
                        helperExpression: function(e) {
                            return !("SubExpression" !== e.type && !e.params.length && !e.hash);
                        },
                        scopedId: function(e) {
                            return /^\.|this\b/.test(e.original);
                        },
                        simpleId: function(e) {
                            return 1 === e.parts.length && !t.helpers.scopedId(e) && !e.depth;
                        },
                    },
                };
            return (e = t);
        })(),
        s = (function() {
            "use strict";
            var e,
                t = (function() {
                    function e() {
                        this.yy = {};
                    }
                    var t = {
                            trace: function() {},
                            yy: {},
                            symbols_: {
                                error: 2,
                                root: 3,
                                program: 4,
                                EOF: 5,
                                program_repetition0: 6,
                                statement: 7,
                                mustache: 8,
                                block: 9,
                                rawBlock: 10,
                                partial: 11,
                                content: 12,
                                COMMENT: 13,
                                CONTENT: 14,
                                openRawBlock: 15,
                                END_RAW_BLOCK: 16,
                                OPEN_RAW_BLOCK: 17,
                                helperName: 18,
                                openRawBlock_repetition0: 19,
                                openRawBlock_option0: 20,
                                CLOSE_RAW_BLOCK: 21,
                                openBlock: 22,
                                block_option0: 23,
                                closeBlock: 24,
                                openInverse: 25,
                                block_option1: 26,
                                OPEN_BLOCK: 27,
                                openBlock_repetition0: 28,
                                openBlock_option0: 29,
                                openBlock_option1: 30,
                                CLOSE: 31,
                                OPEN_INVERSE: 32,
                                openInverse_repetition0: 33,
                                openInverse_option0: 34,
                                openInverse_option1: 35,
                                openInverseChain: 36,
                                OPEN_INVERSE_CHAIN: 37,
                                openInverseChain_repetition0: 38,
                                openInverseChain_option0: 39,
                                openInverseChain_option1: 40,
                                inverseAndProgram: 41,
                                INVERSE: 42,
                                inverseChain: 43,
                                inverseChain_option0: 44,
                                OPEN_ENDBLOCK: 45,
                                OPEN: 46,
                                mustache_repetition0: 47,
                                mustache_option0: 48,
                                OPEN_UNESCAPED: 49,
                                mustache_repetition1: 50,
                                mustache_option1: 51,
                                CLOSE_UNESCAPED: 52,
                                OPEN_PARTIAL: 53,
                                partialName: 54,
                                partial_repetition0: 55,
                                partial_option0: 56,
                                param: 57,
                                sexpr: 58,
                                OPEN_SEXPR: 59,
                                sexpr_repetition0: 60,
                                sexpr_option0: 61,
                                CLOSE_SEXPR: 62,
                                hash: 63,
                                hash_repetition_plus0: 64,
                                hashSegment: 65,
                                ID: 66,
                                EQUALS: 67,
                                blockParams: 68,
                                OPEN_BLOCK_PARAMS: 69,
                                blockParams_repetition_plus0: 70,
                                CLOSE_BLOCK_PARAMS: 71,
                                path: 72,
                                dataName: 73,
                                STRING: 74,
                                NUMBER: 75,
                                BOOLEAN: 76,
                                DATA: 77,
                                pathSegments: 78,
                                SEP: 79,
                                $accept: 0,
                                $end: 1,
                            },
                            terminals_: {
                                2: "error",
                                5: "EOF",
                                13: "COMMENT",
                                14: "CONTENT",
                                16: "END_RAW_BLOCK",
                                17: "OPEN_RAW_BLOCK",
                                21: "CLOSE_RAW_BLOCK",
                                27: "OPEN_BLOCK",
                                31: "CLOSE",
                                32: "OPEN_INVERSE",
                                37: "OPEN_INVERSE_CHAIN",
                                42: "INVERSE",
                                45: "OPEN_ENDBLOCK",
                                46: "OPEN",
                                49: "OPEN_UNESCAPED",
                                52: "CLOSE_UNESCAPED",
                                53: "OPEN_PARTIAL",
                                59: "OPEN_SEXPR",
                                62: "CLOSE_SEXPR",
                                66: "ID",
                                67: "EQUALS",
                                69: "OPEN_BLOCK_PARAMS",
                                71: "CLOSE_BLOCK_PARAMS",
                                74: "STRING",
                                75: "NUMBER",
                                76: "BOOLEAN",
                                77: "DATA",
                                79: "SEP",
                            },
                            productions_: [
                                0, [3, 2],
                                [4, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [7, 1],
                                [12, 1],
                                [10, 3],
                                [15, 5],
                                [9, 4],
                                [9, 4],
                                [22, 6],
                                [25, 6],
                                [36, 6],
                                [41, 2],
                                [43, 3],
                                [43, 1],
                                [24, 3],
                                [8, 5],
                                [8, 5],
                                [11, 5],
                                [57, 1],
                                [57, 1],
                                [58, 5],
                                [63, 1],
                                [65, 3],
                                [68, 3],
                                [18, 1],
                                [18, 1],
                                [18, 1],
                                [18, 1],
                                [18, 1],
                                [54, 1],
                                [54, 1],
                                [73, 2],
                                [72, 1],
                                [78, 3],
                                [78, 1],
                                [6, 0],
                                [6, 2],
                                [19, 0],
                                [19, 2],
                                [20, 0],
                                [20, 1],
                                [23, 0],
                                [23, 1],
                                [26, 0],
                                [26, 1],
                                [28, 0],
                                [28, 2],
                                [29, 0],
                                [29, 1],
                                [30, 0],
                                [30, 1],
                                [33, 0],
                                [33, 2],
                                [34, 0],
                                [34, 1],
                                [35, 0],
                                [35, 1],
                                [38, 0],
                                [38, 2],
                                [39, 0],
                                [39, 1],
                                [40, 0],
                                [40, 1],
                                [44, 0],
                                [44, 1],
                                [47, 0],
                                [47, 2],
                                [48, 0],
                                [48, 1],
                                [50, 0],
                                [50, 2],
                                [51, 0],
                                [51, 1],
                                [55, 0],
                                [55, 2],
                                [56, 0],
                                [56, 1],
                                [60, 0],
                                [60, 2],
                                [61, 0],
                                [61, 1],
                                [64, 1],
                                [64, 2],
                                [70, 1],
                                [70, 2],
                            ],
                            performAction: function(e, t, r, n, a, i, o) {
                                var s = i.length - 1;
                                switch (a) {
                                    case 1:
                                        return i[s - 1];
                                    case 2:
                                        this.$ = new n.Program(i[s], null, {}, n.locInfo(this._$));
                                        break;
                                    case 3:
                                        this.$ = i[s];
                                        break;
                                    case 4:
                                        this.$ = i[s];
                                        break;
                                    case 5:
                                        this.$ = i[s];
                                        break;
                                    case 6:
                                        this.$ = i[s];
                                        break;
                                    case 7:
                                        this.$ = i[s];
                                        break;
                                    case 8:
                                        this.$ = new n.CommentStatement(n.stripComment(i[s]), n.stripFlags(i[s], i[s]), n.locInfo(this._$));
                                        break;
                                    case 9:
                                        this.$ = new n.ContentStatement(i[s], n.locInfo(this._$));
                                        break;
                                    case 10:
                                        this.$ = n.prepareRawBlock(i[s - 2], i[s - 1], i[s], this._$);
                                        break;
                                    case 11:
                                        this.$ = { path: i[s - 3], params: i[s - 2], hash: i[s - 1] };
                                        break;
                                    case 12:
                                        this.$ = n.prepareBlock(i[s - 3], i[s - 2], i[s - 1], i[s], !1, this._$);
                                        break;
                                    case 13:
                                        this.$ = n.prepareBlock(i[s - 3], i[s - 2], i[s - 1], i[s], !0, this._$);
                                        break;
                                    case 14:
                                        this.$ = { path: i[s - 4], params: i[s - 3], hash: i[s - 2], blockParams: i[s - 1], strip: n.stripFlags(i[s - 5], i[s]) };
                                        break;
                                    case 15:
                                        this.$ = { path: i[s - 4], params: i[s - 3], hash: i[s - 2], blockParams: i[s - 1], strip: n.stripFlags(i[s - 5], i[s]) };
                                        break;
                                    case 16:
                                        this.$ = { path: i[s - 4], params: i[s - 3], hash: i[s - 2], blockParams: i[s - 1], strip: n.stripFlags(i[s - 5], i[s]) };
                                        break;
                                    case 17:
                                        this.$ = { strip: n.stripFlags(i[s - 1], i[s - 1]), program: i[s] };
                                        break;
                                    case 18:
                                        var l = n.prepareBlock(i[s - 2], i[s - 1], i[s], i[s], !1, this._$),
                                            d = new n.Program([l], null, {}, n.locInfo(this._$));
                                        (d.chained = !0), (this.$ = { strip: i[s - 2].strip, program: d, chain: !0 });
                                        break;
                                    case 19:
                                        this.$ = i[s];
                                        break;
                                    case 20:
                                        this.$ = { path: i[s - 1], strip: n.stripFlags(i[s - 2], i[s]) };
                                        break;
                                    case 21:
                                        this.$ = n.prepareMustache(i[s - 3], i[s - 2], i[s - 1], i[s - 4], n.stripFlags(i[s - 4], i[s]), this._$);
                                        break;
                                    case 22:
                                        this.$ = n.prepareMustache(i[s - 3], i[s - 2], i[s - 1], i[s - 4], n.stripFlags(i[s - 4], i[s]), this._$);
                                        break;
                                    case 23:
                                        this.$ = new n.PartialStatement(i[s - 3], i[s - 2], i[s - 1], n.stripFlags(i[s - 4], i[s]), n.locInfo(this._$));
                                        break;
                                    case 24:
                                        this.$ = i[s];
                                        break;
                                    case 25:
                                        this.$ = i[s];
                                        break;
                                    case 26:
                                        this.$ = new n.SubExpression(i[s - 3], i[s - 2], i[s - 1], n.locInfo(this._$));
                                        break;
                                    case 27:
                                        this.$ = new n.Hash(i[s], n.locInfo(this._$));
                                        break;
                                    case 28:
                                        this.$ = new n.HashPair(i[s - 2], i[s], n.locInfo(this._$));
                                        break;
                                    case 29:
                                        this.$ = i[s - 1];
                                        break;
                                    case 30:
                                        this.$ = i[s];
                                        break;
                                    case 31:
                                        this.$ = i[s];
                                        break;
                                    case 32:
                                        this.$ = new n.StringLiteral(i[s], n.locInfo(this._$));
                                        break;
                                    case 33:
                                        this.$ = new n.NumberLiteral(i[s], n.locInfo(this._$));
                                        break;
                                    case 34:
                                        this.$ = new n.BooleanLiteral(i[s], n.locInfo(this._$));
                                        break;
                                    case 35:
                                        this.$ = i[s];
                                        break;
                                    case 36:
                                        this.$ = i[s];
                                        break;
                                    case 37:
                                        this.$ = n.preparePath(!0, i[s], this._$);
                                        break;
                                    case 38:
                                        this.$ = n.preparePath(!1, i[s], this._$);
                                        break;
                                    case 39:
                                        i[s - 2].push({ part: i[s], separator: i[s - 1] }), (this.$ = i[s - 2]);
                                        break;
                                    case 40:
                                        this.$ = [{ part: i[s] }];
                                        break;
                                    case 41:
                                        this.$ = [];
                                        break;
                                    case 42:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 43:
                                        this.$ = [];
                                        break;
                                    case 44:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 51:
                                        this.$ = [];
                                        break;
                                    case 52:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 57:
                                        this.$ = [];
                                        break;
                                    case 58:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 63:
                                        this.$ = [];
                                        break;
                                    case 64:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 71:
                                        this.$ = [];
                                        break;
                                    case 72:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 75:
                                        this.$ = [];
                                        break;
                                    case 76:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 79:
                                        this.$ = [];
                                        break;
                                    case 80:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 83:
                                        this.$ = [];
                                        break;
                                    case 84:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 87:
                                        this.$ = [i[s]];
                                        break;
                                    case 88:
                                        i[s - 1].push(i[s]);
                                        break;
                                    case 89:
                                        this.$ = [i[s]];
                                        break;
                                    case 90:
                                        i[s - 1].push(i[s]);
                                }
                            },
                            table: [
                                { 3: 1, 4: 2, 5: [2, 41], 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] },
                                { 1: [3] },
                                { 5: [1, 4] },
                                {
                                    5: [2, 2],
                                    7: 5,
                                    8: 6,
                                    9: 7,
                                    10: 8,
                                    11: 9,
                                    12: 10,
                                    13: [1, 11],
                                    14: [1, 18],
                                    15: 16,
                                    17: [1, 21],
                                    22: 14,
                                    25: 15,
                                    27: [1, 19],
                                    32: [1, 20],
                                    37: [2, 2],
                                    42: [2, 2],
                                    45: [2, 2],
                                    46: [1, 12],
                                    49: [1, 13],
                                    53: [1, 17],
                                },
                                { 1: [2, 1] },
                                { 5: [2, 42], 13: [2, 42], 14: [2, 42], 17: [2, 42], 27: [2, 42], 32: [2, 42], 37: [2, 42], 42: [2, 42], 45: [2, 42], 46: [2, 42], 49: [2, 42], 53: [2, 42] },
                                { 5: [2, 3], 13: [2, 3], 14: [2, 3], 17: [2, 3], 27: [2, 3], 32: [2, 3], 37: [2, 3], 42: [2, 3], 45: [2, 3], 46: [2, 3], 49: [2, 3], 53: [2, 3] },
                                { 5: [2, 4], 13: [2, 4], 14: [2, 4], 17: [2, 4], 27: [2, 4], 32: [2, 4], 37: [2, 4], 42: [2, 4], 45: [2, 4], 46: [2, 4], 49: [2, 4], 53: [2, 4] },
                                { 5: [2, 5], 13: [2, 5], 14: [2, 5], 17: [2, 5], 27: [2, 5], 32: [2, 5], 37: [2, 5], 42: [2, 5], 45: [2, 5], 46: [2, 5], 49: [2, 5], 53: [2, 5] },
                                { 5: [2, 6], 13: [2, 6], 14: [2, 6], 17: [2, 6], 27: [2, 6], 32: [2, 6], 37: [2, 6], 42: [2, 6], 45: [2, 6], 46: [2, 6], 49: [2, 6], 53: [2, 6] },
                                { 5: [2, 7], 13: [2, 7], 14: [2, 7], 17: [2, 7], 27: [2, 7], 32: [2, 7], 37: [2, 7], 42: [2, 7], 45: [2, 7], 46: [2, 7], 49: [2, 7], 53: [2, 7] },
                                { 5: [2, 8], 13: [2, 8], 14: [2, 8], 17: [2, 8], 27: [2, 8], 32: [2, 8], 37: [2, 8], 42: [2, 8], 45: [2, 8], 46: [2, 8], 49: [2, 8], 53: [2, 8] },
                                { 18: 22, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 18: 31, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 4: 32, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 37: [2, 41], 42: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] },
                                { 4: 33, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 42: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] },
                                { 12: 34, 14: [1, 18] },
                                { 18: 36, 54: 35, 58: 37, 59: [1, 38], 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 5: [2, 9], 13: [2, 9], 14: [2, 9], 16: [2, 9], 17: [2, 9], 27: [2, 9], 32: [2, 9], 37: [2, 9], 42: [2, 9], 45: [2, 9], 46: [2, 9], 49: [2, 9], 53: [2, 9] },
                                { 18: 39, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 18: 40, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 18: 41, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 31: [2, 71], 47: 42, 59: [2, 71], 66: [2, 71], 74: [2, 71], 75: [2, 71], 76: [2, 71], 77: [2, 71] },
                                { 21: [2, 30], 31: [2, 30], 52: [2, 30], 59: [2, 30], 62: [2, 30], 66: [2, 30], 69: [2, 30], 74: [2, 30], 75: [2, 30], 76: [2, 30], 77: [2, 30] },
                                { 21: [2, 31], 31: [2, 31], 52: [2, 31], 59: [2, 31], 62: [2, 31], 66: [2, 31], 69: [2, 31], 74: [2, 31], 75: [2, 31], 76: [2, 31], 77: [2, 31] },
                                { 21: [2, 32], 31: [2, 32], 52: [2, 32], 59: [2, 32], 62: [2, 32], 66: [2, 32], 69: [2, 32], 74: [2, 32], 75: [2, 32], 76: [2, 32], 77: [2, 32] },
                                { 21: [2, 33], 31: [2, 33], 52: [2, 33], 59: [2, 33], 62: [2, 33], 66: [2, 33], 69: [2, 33], 74: [2, 33], 75: [2, 33], 76: [2, 33], 77: [2, 33] },
                                { 21: [2, 34], 31: [2, 34], 52: [2, 34], 59: [2, 34], 62: [2, 34], 66: [2, 34], 69: [2, 34], 74: [2, 34], 75: [2, 34], 76: [2, 34], 77: [2, 34] },
                                { 21: [2, 38], 31: [2, 38], 52: [2, 38], 59: [2, 38], 62: [2, 38], 66: [2, 38], 69: [2, 38], 74: [2, 38], 75: [2, 38], 76: [2, 38], 77: [2, 38], 79: [1, 43] },
                                { 66: [1, 30], 78: 44 },
                                { 21: [2, 40], 31: [2, 40], 52: [2, 40], 59: [2, 40], 62: [2, 40], 66: [2, 40], 69: [2, 40], 74: [2, 40], 75: [2, 40], 76: [2, 40], 77: [2, 40], 79: [2, 40] },
                                { 50: 45, 52: [2, 75], 59: [2, 75], 66: [2, 75], 74: [2, 75], 75: [2, 75], 76: [2, 75], 77: [2, 75] },
                                { 23: 46, 36: 48, 37: [1, 50], 41: 49, 42: [1, 51], 43: 47, 45: [2, 47] },
                                { 26: 52, 41: 53, 42: [1, 51], 45: [2, 49] },
                                { 16: [1, 54] },
                                { 31: [2, 79], 55: 55, 59: [2, 79], 66: [2, 79], 74: [2, 79], 75: [2, 79], 76: [2, 79], 77: [2, 79] },
                                { 31: [2, 35], 59: [2, 35], 66: [2, 35], 74: [2, 35], 75: [2, 35], 76: [2, 35], 77: [2, 35] },
                                { 31: [2, 36], 59: [2, 36], 66: [2, 36], 74: [2, 36], 75: [2, 36], 76: [2, 36], 77: [2, 36] },
                                { 18: 56, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 28: 57, 31: [2, 51], 59: [2, 51], 66: [2, 51], 69: [2, 51], 74: [2, 51], 75: [2, 51], 76: [2, 51], 77: [2, 51] },
                                { 31: [2, 57], 33: 58, 59: [2, 57], 66: [2, 57], 69: [2, 57], 74: [2, 57], 75: [2, 57], 76: [2, 57], 77: [2, 57] },
                                { 19: 59, 21: [2, 43], 59: [2, 43], 66: [2, 43], 74: [2, 43], 75: [2, 43], 76: [2, 43], 77: [2, 43] },
                                { 18: 63, 31: [2, 73], 48: 60, 57: 61, 58: 64, 59: [1, 38], 63: 62, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 66: [1, 68] },
                                { 21: [2, 37], 31: [2, 37], 52: [2, 37], 59: [2, 37], 62: [2, 37], 66: [2, 37], 69: [2, 37], 74: [2, 37], 75: [2, 37], 76: [2, 37], 77: [2, 37], 79: [1, 43] },
                                { 18: 63, 51: 69, 52: [2, 77], 57: 70, 58: 64, 59: [1, 38], 63: 71, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 24: 72, 45: [1, 73] },
                                { 45: [2, 48] },
                                { 4: 74, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 37: [2, 41], 42: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] },
                                { 45: [2, 19] },
                                { 18: 75, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 4: 76, 6: 3, 13: [2, 41], 14: [2, 41], 17: [2, 41], 27: [2, 41], 32: [2, 41], 45: [2, 41], 46: [2, 41], 49: [2, 41], 53: [2, 41] },
                                { 24: 77, 45: [1, 73] },
                                { 45: [2, 50] },
                                { 5: [2, 10], 13: [2, 10], 14: [2, 10], 17: [2, 10], 27: [2, 10], 32: [2, 10], 37: [2, 10], 42: [2, 10], 45: [2, 10], 46: [2, 10], 49: [2, 10], 53: [2, 10] },
                                { 18: 63, 31: [2, 81], 56: 78, 57: 79, 58: 64, 59: [1, 38], 63: 80, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 59: [2, 83], 60: 81, 62: [2, 83], 66: [2, 83], 74: [2, 83], 75: [2, 83], 76: [2, 83], 77: [2, 83] },
                                { 18: 63, 29: 82, 31: [2, 53], 57: 83, 58: 64, 59: [1, 38], 63: 84, 64: 65, 65: 66, 66: [1, 67], 69: [2, 53], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 18: 63, 31: [2, 59], 34: 85, 57: 86, 58: 64, 59: [1, 38], 63: 87, 64: 65, 65: 66, 66: [1, 67], 69: [2, 59], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 18: 63, 20: 88, 21: [2, 45], 57: 89, 58: 64, 59: [1, 38], 63: 90, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 31: [1, 91] },
                                { 31: [2, 72], 59: [2, 72], 66: [2, 72], 74: [2, 72], 75: [2, 72], 76: [2, 72], 77: [2, 72] },
                                { 31: [2, 74] },
                                { 21: [2, 24], 31: [2, 24], 52: [2, 24], 59: [2, 24], 62: [2, 24], 66: [2, 24], 69: [2, 24], 74: [2, 24], 75: [2, 24], 76: [2, 24], 77: [2, 24] },
                                { 21: [2, 25], 31: [2, 25], 52: [2, 25], 59: [2, 25], 62: [2, 25], 66: [2, 25], 69: [2, 25], 74: [2, 25], 75: [2, 25], 76: [2, 25], 77: [2, 25] },
                                { 21: [2, 27], 31: [2, 27], 52: [2, 27], 62: [2, 27], 65: 92, 66: [1, 93], 69: [2, 27] },
                                { 21: [2, 87], 31: [2, 87], 52: [2, 87], 62: [2, 87], 66: [2, 87], 69: [2, 87] },
                                { 21: [2, 40], 31: [2, 40], 52: [2, 40], 59: [2, 40], 62: [2, 40], 66: [2, 40], 67: [1, 94], 69: [2, 40], 74: [2, 40], 75: [2, 40], 76: [2, 40], 77: [2, 40], 79: [2, 40] },
                                { 21: [2, 39], 31: [2, 39], 52: [2, 39], 59: [2, 39], 62: [2, 39], 66: [2, 39], 69: [2, 39], 74: [2, 39], 75: [2, 39], 76: [2, 39], 77: [2, 39], 79: [2, 39] },
                                { 52: [1, 95] },
                                { 52: [2, 76], 59: [2, 76], 66: [2, 76], 74: [2, 76], 75: [2, 76], 76: [2, 76], 77: [2, 76] },
                                { 52: [2, 78] },
                                { 5: [2, 12], 13: [2, 12], 14: [2, 12], 17: [2, 12], 27: [2, 12], 32: [2, 12], 37: [2, 12], 42: [2, 12], 45: [2, 12], 46: [2, 12], 49: [2, 12], 53: [2, 12] },
                                { 18: 96, 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 36: 48, 37: [1, 50], 41: 49, 42: [1, 51], 43: 98, 44: 97, 45: [2, 69] },
                                { 31: [2, 63], 38: 99, 59: [2, 63], 66: [2, 63], 69: [2, 63], 74: [2, 63], 75: [2, 63], 76: [2, 63], 77: [2, 63] },
                                { 45: [2, 17] },
                                { 5: [2, 13], 13: [2, 13], 14: [2, 13], 17: [2, 13], 27: [2, 13], 32: [2, 13], 37: [2, 13], 42: [2, 13], 45: [2, 13], 46: [2, 13], 49: [2, 13], 53: [2, 13] },
                                { 31: [1, 100] },
                                { 31: [2, 80], 59: [2, 80], 66: [2, 80], 74: [2, 80], 75: [2, 80], 76: [2, 80], 77: [2, 80] },
                                { 31: [2, 82] },
                                { 18: 63, 57: 102, 58: 64, 59: [1, 38], 61: 101, 62: [2, 85], 63: 103, 64: 65, 65: 66, 66: [1, 67], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 30: 104, 31: [2, 55], 68: 105, 69: [1, 106] },
                                { 31: [2, 52], 59: [2, 52], 66: [2, 52], 69: [2, 52], 74: [2, 52], 75: [2, 52], 76: [2, 52], 77: [2, 52] },
                                { 31: [2, 54], 69: [2, 54] },
                                { 31: [2, 61], 35: 107, 68: 108, 69: [1, 106] },
                                { 31: [2, 58], 59: [2, 58], 66: [2, 58], 69: [2, 58], 74: [2, 58], 75: [2, 58], 76: [2, 58], 77: [2, 58] },
                                { 31: [2, 60], 69: [2, 60] },
                                { 21: [1, 109] },
                                { 21: [2, 44], 59: [2, 44], 66: [2, 44], 74: [2, 44], 75: [2, 44], 76: [2, 44], 77: [2, 44] },
                                { 21: [2, 46] },
                                { 5: [2, 21], 13: [2, 21], 14: [2, 21], 17: [2, 21], 27: [2, 21], 32: [2, 21], 37: [2, 21], 42: [2, 21], 45: [2, 21], 46: [2, 21], 49: [2, 21], 53: [2, 21] },
                                { 21: [2, 88], 31: [2, 88], 52: [2, 88], 62: [2, 88], 66: [2, 88], 69: [2, 88] },
                                { 67: [1, 94] },
                                { 18: 63, 57: 110, 58: 64, 59: [1, 38], 66: [1, 30], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 5: [2, 22], 13: [2, 22], 14: [2, 22], 17: [2, 22], 27: [2, 22], 32: [2, 22], 37: [2, 22], 42: [2, 22], 45: [2, 22], 46: [2, 22], 49: [2, 22], 53: [2, 22] },
                                { 31: [1, 111] },
                                { 45: [2, 18] },
                                { 45: [2, 70] },
                                { 18: 63, 31: [2, 65], 39: 112, 57: 113, 58: 64, 59: [1, 38], 63: 114, 64: 65, 65: 66, 66: [1, 67], 69: [2, 65], 72: 23, 73: 24, 74: [1, 25], 75: [1, 26], 76: [1, 27], 77: [1, 29], 78: 28 },
                                { 5: [2, 23], 13: [2, 23], 14: [2, 23], 17: [2, 23], 27: [2, 23], 32: [2, 23], 37: [2, 23], 42: [2, 23], 45: [2, 23], 46: [2, 23], 49: [2, 23], 53: [2, 23] },
                                { 62: [1, 115] },
                                { 59: [2, 84], 62: [2, 84], 66: [2, 84], 74: [2, 84], 75: [2, 84], 76: [2, 84], 77: [2, 84] },
                                { 62: [2, 86] },
                                { 31: [1, 116] },
                                { 31: [2, 56] },
                                { 66: [1, 118], 70: 117 },
                                { 31: [1, 119] },
                                { 31: [2, 62] },
                                { 14: [2, 11] },
                                { 21: [2, 28], 31: [2, 28], 52: [2, 28], 62: [2, 28], 66: [2, 28], 69: [2, 28] },
                                { 5: [2, 20], 13: [2, 20], 14: [2, 20], 17: [2, 20], 27: [2, 20], 32: [2, 20], 37: [2, 20], 42: [2, 20], 45: [2, 20], 46: [2, 20], 49: [2, 20], 53: [2, 20] },
                                { 31: [2, 67], 40: 120, 68: 121, 69: [1, 106] },
                                { 31: [2, 64], 59: [2, 64], 66: [2, 64], 69: [2, 64], 74: [2, 64], 75: [2, 64], 76: [2, 64], 77: [2, 64] },
                                { 31: [2, 66], 69: [2, 66] },
                                { 21: [2, 26], 31: [2, 26], 52: [2, 26], 59: [2, 26], 62: [2, 26], 66: [2, 26], 69: [2, 26], 74: [2, 26], 75: [2, 26], 76: [2, 26], 77: [2, 26] },
                                { 13: [2, 14], 14: [2, 14], 17: [2, 14], 27: [2, 14], 32: [2, 14], 37: [2, 14], 42: [2, 14], 45: [2, 14], 46: [2, 14], 49: [2, 14], 53: [2, 14] },
                                { 66: [1, 123], 71: [1, 122] },
                                { 66: [2, 89], 71: [2, 89] },
                                { 13: [2, 15], 14: [2, 15], 17: [2, 15], 27: [2, 15], 32: [2, 15], 42: [2, 15], 45: [2, 15], 46: [2, 15], 49: [2, 15], 53: [2, 15] },
                                { 31: [1, 124] },
                                { 31: [2, 68] },
                                { 31: [2, 29] },
                                { 66: [2, 90], 71: [2, 90] },
                                { 13: [2, 16], 14: [2, 16], 17: [2, 16], 27: [2, 16], 32: [2, 16], 37: [2, 16], 42: [2, 16], 45: [2, 16], 46: [2, 16], 49: [2, 16], 53: [2, 16] },
                            ],
                            defaultActions: {
                                4: [2, 1],
                                47: [2, 48],
                                49: [2, 19],
                                53: [2, 50],
                                62: [2, 74],
                                71: [2, 78],
                                76: [2, 17],
                                80: [2, 82],
                                90: [2, 46],
                                97: [2, 18],
                                98: [2, 70],
                                103: [2, 86],
                                105: [2, 56],
                                108: [2, 62],
                                109: [2, 11],
                                121: [2, 68],
                                122: [2, 29],
                            },
                            parseError: function(e, t) {
                                throw new Error(e);
                            },
                            parse: function(e) {
                                function t() {
                                    var e;
                                    return (e = r.lexer.lex() || 1), "number" != typeof e && (e = r.symbols_[e] || e), e;
                                }
                                var r = this,
                                    n = [0],
                                    a = [null],
                                    i = [],
                                    o = this.table,
                                    s = "",
                                    l = 0,
                                    d = 0,
                                    c = 0;
                                this.lexer.setInput(e), (this.lexer.yy = this.yy), (this.yy.lexer = this.lexer), (this.yy.parser = this), "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                                var u = this.lexer.yylloc;
                                i.push(u);
                                var p = this.lexer.options && this.lexer.options.ranges;
                                "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                                for (var h, f, m, g, v, y, b, S, w, C = {};;) {
                                    if (
                                        ((m = n[n.length - 1]),
                                            this.defaultActions[m] ? (g = this.defaultActions[m]) : ((null !== h && "undefined" != typeof h) || (h = t()), (g = o[m] && o[m][h])),
                                            "undefined" == typeof g || !g.length || !g[0])
                                    ) {
                                        var _ = "";
                                        if (!c) {
                                            w = [];
                                            for (y in o[m]) this.terminals_[y] && y > 2 && w.push("'" + this.terminals_[y] + "'");
                                            (_ = this.lexer.showPosition ?
                                                "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + w.join(", ") + ", got '" + (this.terminals_[h] || h) + "'" :
                                                "Parse error on line " + (l + 1) + ": Unexpected " + (1 == h ? "end of input" : "'" + (this.terminals_[h] || h) + "'")),
                                            this.parseError(_, { text: this.lexer.match, token: this.terminals_[h] || h, line: this.lexer.yylineno, loc: u, expected: w });
                                        }
                                    }
                                    if (g[0] instanceof Array && g.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + h);
                                    switch (g[0]) {
                                        case 1:
                                            n.push(h),
                                                a.push(this.lexer.yytext),
                                                i.push(this.lexer.yylloc),
                                                n.push(g[1]),
                                                (h = null),
                                                f ? ((h = f), (f = null)) : ((d = this.lexer.yyleng), (s = this.lexer.yytext), (l = this.lexer.yylineno), (u = this.lexer.yylloc), c > 0 && c--);
                                            break;
                                        case 2:
                                            if (
                                                ((b = this.productions_[g[1]][1]),
                                                    (C.$ = a[a.length - b]),
                                                    (C._$ = {
                                                        first_line: i[i.length - (b || 1)].first_line,
                                                        last_line: i[i.length - 1].last_line,
                                                        first_column: i[i.length - (b || 1)].first_column,
                                                        last_column: i[i.length - 1].last_column,
                                                    }),
                                                    p && (C._$.range = [i[i.length - (b || 1)].range[0], i[i.length - 1].range[1]]),
                                                    (v = this.performAction.call(C, s, d, l, this.yy, g[1], a, i)),
                                                    "undefined" != typeof v)
                                            )
                                                return v;
                                            b && ((n = n.slice(0, -1 * b * 2)), (a = a.slice(0, -1 * b)), (i = i.slice(0, -1 * b))),
                                                n.push(this.productions_[g[1]][0]),
                                                a.push(C.$),
                                                i.push(C._$),
                                                (S = o[n[n.length - 2]][n[n.length - 1]]),
                                                n.push(S);
                                            break;
                                        case 3:
                                            return !0;
                                    }
                                }
                                return !0;
                            },
                        },
                        r = (function() {
                            var e = {
                                EOF: 1,
                                parseError: function(e, t) {
                                    if (!this.yy.parser) throw new Error(e);
                                    this.yy.parser.parseError(e, t);
                                },
                                setInput: function(e) {
                                    return (
                                        (this._input = e),
                                        (this._more = this._less = this.done = !1),
                                        (this.yylineno = this.yyleng = 0),
                                        (this.yytext = this.matched = this.match = ""),
                                        (this.conditionStack = ["INITIAL"]),
                                        (this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }),
                                        this.options.ranges && (this.yylloc.range = [0, 0]),
                                        (this.offset = 0),
                                        this
                                    );
                                },
                                input: function() {
                                    var e = this._input[0];
                                    (this.yytext += e), this.yyleng++, this.offset++, (this.match += e), (this.matched += e);
                                    var t = e.match(/(?:\r\n?|\n).*/g);
                                    return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, (this._input = this._input.slice(1)), e;
                                },
                                unput: function(e) {
                                    var t = e.length,
                                        r = e.split(/(?:\r\n?|\n)/g);
                                    (this._input = e + this._input), (this.yytext = this.yytext.substr(0, this.yytext.length - t - 1)), (this.offset -= t);
                                    var n = this.match.split(/(?:\r\n?|\n)/g);
                                    (this.match = this.match.substr(0, this.match.length - 1)), (this.matched = this.matched.substr(0, this.matched.length - 1)), r.length - 1 && (this.yylineno -= r.length - 1);
                                    var a = this.yylloc.range;
                                    return (
                                        (this.yylloc = {
                                            first_line: this.yylloc.first_line,
                                            last_line: this.yylineno + 1,
                                            first_column: this.yylloc.first_column,
                                            last_column: r ? (r.length === n.length ? this.yylloc.first_column : 0) + n[n.length - r.length].length - r[0].length : this.yylloc.first_column - t,
                                        }),
                                        this.options.ranges && (this.yylloc.range = [a[0], a[0] + this.yyleng - t]),
                                        this
                                    );
                                },
                                more: function() {
                                    return (this._more = !0), this;
                                },
                                less: function(e) {
                                    this.unput(this.match.slice(e));
                                },
                                pastInput: function() {
                                    var e = this.matched.substr(0, this.matched.length - this.match.length);
                                    return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "");
                                },
                                upcomingInput: function() {
                                    var e = this.match;
                                    return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "");
                                },
                                showPosition: function() {
                                    var e = this.pastInput(),
                                        t = new Array(e.length + 1).join("-");
                                    return e + this.upcomingInput() + "\n" + t + "^";
                                },
                                next: function() {
                                    if (this.done) return this.EOF;
                                    this._input || (this.done = !0);
                                    var e, t, r, n, a;
                                    this._more || ((this.yytext = ""), (this.match = ""));
                                    for (var i = this._currentRules(), o = 0; o < i.length && ((r = this._input.match(this.rules[i[o]])), !r || (t && !(r[0].length > t[0].length)) || ((t = r), (n = o), this.options.flex)); o++);
                                    return t ?
                                        ((a = t[0].match(/(?:\r\n?|\n).*/g)),
                                            a && (this.yylineno += a.length),
                                            (this.yylloc = {
                                                first_line: this.yylloc.last_line,
                                                last_line: this.yylineno + 1,
                                                first_column: this.yylloc.last_column,
                                                last_column: a ? a[a.length - 1].length - a[a.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length,
                                            }),
                                            (this.yytext += t[0]),
                                            (this.match += t[0]),
                                            (this.matches = t),
                                            (this.yyleng = this.yytext.length),
                                            this.options.ranges && (this.yylloc.range = [this.offset, (this.offset += this.yyleng)]),
                                            (this._more = !1),
                                            (this._input = this._input.slice(t[0].length)),
                                            (this.matched += t[0]),
                                            (e = this.performAction.call(this, this.yy, this, i[n], this.conditionStack[this.conditionStack.length - 1])),
                                            this.done && this._input && (this.done = !1),
                                            e ? e : void 0) :
                                        "" === this._input ?
                                        this.EOF :
                                        this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
                                },
                                lex: function() {
                                    var e = this.next();
                                    return "undefined" != typeof e ? e : this.lex();
                                },
                                begin: function(e) {
                                    this.conditionStack.push(e);
                                },
                                popState: function() {
                                    return this.conditionStack.pop();
                                },
                                _currentRules: function() {
                                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                                },
                                topState: function() {
                                    return this.conditionStack[this.conditionStack.length - 2];
                                },
                                pushState: function(e) {
                                    this.begin(e);
                                },
                            };
                            return (
                                (e.options = {}),
                                (e.performAction = function(e, t, r, n) {
                                    function a(e, r) {
                                        return (t.yytext = t.yytext.substr(e, t.yyleng - r));
                                    }
                                    switch (r) {
                                        case 0:
                                            if (("\\\\" === t.yytext.slice(-2) ? (a(0, 1), this.begin("mu")) : "\\" === t.yytext.slice(-1) ? (a(0, 1), this.begin("emu")) : this.begin("mu"), t.yytext)) return 14;
                                            break;
                                        case 1:
                                            return 14;
                                        case 2:
                                            return this.popState(), 14;
                                        case 3:
                                            return (t.yytext = t.yytext.substr(5, t.yyleng - 9)), this.popState(), 16;
                                        case 4:
                                            return 14;
                                        case 5:
                                            return this.popState(), 13;
                                        case 6:
                                            return 59;
                                        case 7:
                                            return 62;
                                        case 8:
                                            return 17;
                                        case 9:
                                            return this.popState(), this.begin("raw"), 21;
                                        case 10:
                                            return 53;
                                        case 11:
                                            return 27;
                                        case 12:
                                            return 45;
                                        case 13:
                                            return this.popState(), 42;
                                        case 14:
                                            return this.popState(), 42;
                                        case 15:
                                            return 32;
                                        case 16:
                                            return 37;
                                        case 17:
                                            return 49;
                                        case 18:
                                            return 46;
                                        case 19:
                                            this.unput(t.yytext), this.popState(), this.begin("com");
                                            break;
                                        case 20:
                                            return this.popState(), 13;
                                        case 21:
                                            return 46;
                                        case 22:
                                            return 67;
                                        case 23:
                                            return 66;
                                        case 24:
                                            return 66;
                                        case 25:
                                            return 79;
                                        case 26:
                                            break;
                                        case 27:
                                            return this.popState(), 52;
                                        case 28:
                                            return this.popState(), 31;
                                        case 29:
                                            return (t.yytext = a(1, 2).replace(/\\"/g, '"')), 74;
                                        case 30:
                                            return (t.yytext = a(1, 2).replace(/\\'/g, "'")), 74;
                                        case 31:
                                            return 77;
                                        case 32:
                                            return 76;
                                        case 33:
                                            return 76;
                                        case 34:
                                            return 75;
                                        case 35:
                                            return 69;
                                        case 36:
                                            return 71;
                                        case 37:
                                            return 66;
                                        case 38:
                                            return (t.yytext = a(1, 2)), 66;
                                        case 39:
                                            return "INVALID";
                                        case 40:
                                            return 5;
                                    }
                                }),
                                (e.rules = [
                                    /^(?:[^\x00]*?(?=(\{\{)))/,
                                    /^(?:[^\x00]+)/,
                                    /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,
                                    /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,
                                    /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,
                                    /^(?:[\s\S]*?--(~)?\}\})/,
                                    /^(?:\()/,
                                    /^(?:\))/,
                                    /^(?:\{\{\{\{)/,
                                    /^(?:\}\}\}\})/,
                                    /^(?:\{\{(~)?>)/,
                                    /^(?:\{\{(~)?#)/,
                                    /^(?:\{\{(~)?\/)/,
                                    /^(?:\{\{(~)?\^\s*(~)?\}\})/,
                                    /^(?:\{\{(~)?\s*else\s*(~)?\}\})/,
                                    /^(?:\{\{(~)?\^)/,
                                    /^(?:\{\{(~)?\s*else\b)/,
                                    /^(?:\{\{(~)?\{)/,
                                    /^(?:\{\{(~)?&)/,
                                    /^(?:\{\{(~)?!--)/,
                                    /^(?:\{\{(~)?![\s\S]*?\}\})/,
                                    /^(?:\{\{(~)?)/,
                                    /^(?:=)/,
                                    /^(?:\.\.)/,
                                    /^(?:\.(?=([=~}\s\/.)|])))/,
                                    /^(?:[\/.])/,
                                    /^(?:\s+)/,
                                    /^(?:\}(~)?\}\})/,
                                    /^(?:(~)?\}\})/,
                                    /^(?:"(\\["]|[^"])*")/,
                                    /^(?:'(\\[']|[^'])*')/,
                                    /^(?:@)/,
                                    /^(?:true(?=([~}\s)])))/,
                                    /^(?:false(?=([~}\s)])))/,
                                    /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,
                                    /^(?:as\s+\|)/,
                                    /^(?:\|)/,
                                    /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,
                                    /^(?:\[[^\]]*\])/,
                                    /^(?:.)/,
                                    /^(?:$)/,
                                ]),
                                (e.conditions = {
                                    mu: { rules: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], inclusive: !1 },
                                    emu: { rules: [2], inclusive: !1 },
                                    com: { rules: [5], inclusive: !1 },
                                    raw: { rules: [3, 4], inclusive: !1 },
                                    INITIAL: { rules: [0, 1, 40], inclusive: !0 },
                                }),
                                e
                            );
                        })();
                    return (t.lexer = r), (e.prototype = t), (t.Parser = e), new e();
                })();
            return (e = t);
        })(),
        l = (function(e, t) {
            "use strict";

            function r() {
                this.parents = [];
            }
            var n,
                a = e,
                i = t;
            return (
                (r.prototype = {
                    constructor: r,
                    mutating: !1,
                    acceptKey: function(e, t) {
                        var r = this.accept(e[t]);
                        if (this.mutating) {
                            if (r && (!r.type || !i[r.type])) throw new a('Unexpected node type "' + r.type + '" found when accepting ' + t + " on " + e.type);
                            e[t] = r;
                        }
                    },
                    acceptRequired: function(e, t) {
                        if ((this.acceptKey(e, t), !e[t])) throw new a(e.type + " requires " + t);
                    },
                    acceptArray: function(e) {
                        for (var t = 0, r = e.length; t < r; t++) this.acceptKey(e, t), e[t] || (e.splice(t, 1), t--, r--);
                    },
                    accept: function(e) {
                        if (e) {
                            this.current && this.parents.unshift(this.current), (this.current = e);
                            var t = this[e.type](e);
                            return (this.current = this.parents.shift()), !this.mutating || t ? t : t !== !1 ? e : void 0;
                        }
                    },
                    Program: function(e) {
                        this.acceptArray(e.body);
                    },
                    MustacheStatement: function(e) {
                        this.acceptRequired(e, "path"), this.acceptArray(e.params), this.acceptKey(e, "hash");
                    },
                    BlockStatement: function(e) {
                        this.acceptRequired(e, "path"), this.acceptArray(e.params), this.acceptKey(e, "hash"), this.acceptKey(e, "program"), this.acceptKey(e, "inverse");
                    },
                    PartialStatement: function(e) {
                        this.acceptRequired(e, "name"), this.acceptArray(e.params), this.acceptKey(e, "hash");
                    },
                    ContentStatement: function() {},
                    CommentStatement: function() {},
                    SubExpression: function(e) {
                        this.acceptRequired(e, "path"), this.acceptArray(e.params), this.acceptKey(e, "hash");
                    },
                    PartialExpression: function(e) {
                        this.acceptRequired(e, "name"), this.acceptArray(e.params), this.acceptKey(e, "hash");
                    },
                    PathExpression: function() {},
                    StringLiteral: function() {},
                    NumberLiteral: function() {},
                    BooleanLiteral: function() {},
                    Hash: function(e) {
                        this.acceptArray(e.pairs);
                    },
                    HashPair: function(e) {
                        this.acceptRequired(e, "value");
                    },
                }),
                (n = r)
            );
        })(t, o),
        d = (function(e) {
            "use strict";

            function t() {}

            function r(e, t, r) {
                void 0 === t && (t = e.length);
                var n = e[t - 1],
                    a = e[t - 2];
                return n ? ("ContentStatement" === n.type ? (a || !r ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(n.original) : void 0) : r;
            }

            function n(e, t, r) {
                void 0 === t && (t = -1);
                var n = e[t + 1],
                    a = e[t + 2];
                return n ? ("ContentStatement" === n.type ? (a || !r ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(n.original) : void 0) : r;
            }

            function a(e, t, r) {
                var n = e[null == t ? 0 : t + 1];
                if (n && "ContentStatement" === n.type && (r || !n.rightStripped)) {
                    var a = n.value;
                    (n.value = n.value.replace(r ? /^\s+/ : /^[ \t]*\r?\n?/, "")), (n.rightStripped = n.value !== a);
                }
            }

            function i(e, t, r) {
                var n = e[null == t ? e.length - 1 : t - 1];
                if (n && "ContentStatement" === n.type && (r || !n.leftStripped)) {
                    var a = n.value;
                    return (n.value = n.value.replace(r ? /\s+$/ : /[ \t]+$/, "")), (n.leftStripped = n.value !== a), n.leftStripped;
                }
            }
            var o,
                s = e;
            return (
                (t.prototype = new s()),
                (t.prototype.Program = function(e) {
                    var t = !this.isRootSeen;
                    this.isRootSeen = !0;
                    for (var o = e.body, s = 0, l = o.length; s < l; s++) {
                        var d = o[s],
                            c = this.accept(d);
                        if (c) {
                            var u = r(o, s, t),
                                p = n(o, s, t),
                                h = c.openStandalone && u,
                                f = c.closeStandalone && p,
                                m = c.inlineStandalone && u && p;
                            c.close && a(o, s, !0),
                                c.open && i(o, s, !0),
                                m && (a(o, s), i(o, s) && "PartialStatement" === d.type && (d.indent = /([ \t]+$)/.exec(o[s - 1].original)[1])),
                                h && (a((d.program || d.inverse).body), i(o, s)),
                                f && (a(o, s), i((d.inverse || d.program).body));
                        }
                    }
                    return e;
                }),
                (t.prototype.BlockStatement = function(e) {
                    this.accept(e.program), this.accept(e.inverse);
                    var t = e.program || e.inverse,
                        o = e.program && e.inverse,
                        s = o,
                        l = o;
                    if (o && o.chained)
                        for (s = o.body[0].program; l.chained;) l = l.body[l.body.length - 1].program;
                    var d = { open: e.openStrip.open, close: e.closeStrip.close, openStandalone: n(t.body), closeStandalone: r((s || t).body) };
                    if ((e.openStrip.close && a(t.body, null, !0), o)) {
                        var c = e.inverseStrip;
                        c.open && i(t.body, null, !0), c.close && a(s.body, null, !0), e.closeStrip.open && i(l.body, null, !0), r(t.body) && n(s.body) && (i(t.body), a(s.body));
                    } else e.closeStrip.open && i(t.body, null, !0);
                    return d;
                }),
                (t.prototype.MustacheStatement = function(e) {
                    return e.strip;
                }),
                (t.prototype.PartialStatement = t.prototype.CommentStatement = function(e) {
                    var t = e.strip || {};
                    return { inlineStandalone: !0, open: t.open, close: t.close };
                }),
                (o = t)
            );
        })(l),
        c = (function(e) {
            "use strict";

            function t(e, t) {
                (this.source = e), (this.start = { line: t.first_line, column: t.first_column }), (this.end = { line: t.last_line, column: t.last_column });
            }

            function r(e, t) {
                return { open: "~" === e.charAt(2), close: "~" === t.charAt(t.length - 3) };
            }

            function n(e) {
                return e.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "");
            }

            function a(e, t, r) {
                r = this.locInfo(r);
                for (var n = e ? "@" : "", a = [], i = 0, o = "", s = 0, l = t.length; s < l; s++) {
                    var c = t[s].part;
                    if (((n += (t[s].separator || "") + c), ".." === c || "." === c || "this" === c)) {
                        if (a.length > 0) throw new d("Invalid path: " + n, { loc: r });
                        ".." === c && (i++, (o += "../"));
                    } else a.push(c);
                }
                return new this.PathExpression(e, i, a, n, r);
            }

            function i(e, t, r, n, a, i) {
                var o = n.charAt(3) || n.charAt(2),
                    s = "{" !== o && "&" !== o;
                return new this.MustacheStatement(e, t, r, s, a, this.locInfo(i));
            }

            function o(e, t, r, n) {
                if (e.path.original !== r) {
                    var a = { loc: e.path.loc };
                    throw new d(e.path.original + " doesn't match " + r, a);
                }
                n = this.locInfo(n);
                var i = new this.Program([t], null, {}, n);
                return new this.BlockStatement(e.path, e.params, e.hash, i, void 0, {}, {}, {}, n);
            }

            function s(e, t, r, n, a, i) {
                if (n && n.path && e.path.original !== n.path.original) {
                    var o = { loc: e.path.loc };
                    throw new d(e.path.original + " doesn't match " + n.path.original, o);
                }
                t.blockParams = e.blockParams;
                var s, l;
                return (
                    r && (r.chain && (r.program.body[0].closeStrip = n.strip), (l = r.strip), (s = r.program)),
                    a && ((a = s), (s = t), (t = a)),
                    new this.BlockStatement(e.path, e.params, e.hash, t, s, e.strip, l, n && n.strip, this.locInfo(i))
                );
            }
            var l = {},
                d = e;
            return (l.SourceLocation = t), (l.stripFlags = r), (l.stripComment = n), (l.preparePath = a), (l.prepareMustache = i), (l.prepareRawBlock = o), (l.prepareBlock = s), l;
        })(t),
        u = (function(e, t, r, n, a) {
            "use strict";

            function i(e, t) {
                if ("Program" === e.type) return e;
                (s.yy = p),
                (p.locInfo = function(e) {
                    return new p.SourceLocation(t && t.srcName, e);
                });
                var r = new d();
                return r.accept(s.parse(e));
            }
            var o = {},
                s = e,
                l = t,
                d = r,
                c = n,
                u = a.extend;
            o.parser = s;
            var p = {};
            return u(p, c, l), (o.parse = i), o;
        })(s, o, d, c, e),
        p = (function(e, t, r) {
            "use strict";

            function n() {}

            function a(e, t, r) {
                if (null == e || ("string" != typeof e && "Program" !== e.type)) throw new d("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + e);
                (t = t || {}), "data" in t || (t.data = !0), t.compat && (t.useDepths = !0);
                var n = r.parse(e, t),
                    a = new r.Compiler().compile(n, t);
                return new r.JavaScriptCompiler().compile(a, t);
            }

            function i(e, t, r) {
                function n() {
                    var n = r.parse(e, t),
                        a = new r.Compiler().compile(n, t),
                        i = new r.JavaScriptCompiler().compile(a, t, void 0, !0);
                    return r.template(i);
                }
                if (null == e || ("string" != typeof e && "Program" !== e.type)) throw new d("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + e);
                (t = t || {}), "data" in t || (t.data = !0), t.compat && (t.useDepths = !0);
                var a,
                    i = function(e, t) {
                        return a || (a = n()), a.call(this, e, t);
                    };
                return (
                    (i._setup = function(e) {
                        return a || (a = n()), a._setup(e);
                    }),
                    (i._child = function(e, t, r, i) {
                        return a || (a = n()), a._child(e, t, r, i);
                    }),
                    i
                );
            }

            function o(e, t) {
                if (e === t) return !0;
                if (c(e) && c(t) && e.length === t.length) {
                    for (var r = 0; r < e.length; r++)
                        if (!o(e[r], t[r])) return !1;
                    return !0;
                }
            }

            function s(e) {
                if (!e.path.parts) {
                    var t = e.path;
                    e.path = new p.PathExpression(!1, 0, [t.original + ""], t.original + "", t.log);
                }
            }
            var l = {},
                d = e,
                c = t.isArray,
                u = t.indexOf,
                p = r,
                h = [].slice;
            return (
                (l.Compiler = n),
                (n.prototype = {
                    compiler: n,
                    equals: function(e) {
                        var t = this.opcodes.length;
                        if (e.opcodes.length !== t) return !1;
                        for (var r = 0; r < t; r++) {
                            var n = this.opcodes[r],
                                a = e.opcodes[r];
                            if (n.opcode !== a.opcode || !o(n.args, a.args)) return !1;
                        }
                        for (t = this.children.length, r = 0; r < t; r++)
                            if (!this.children[r].equals(e.children[r])) return !1;
                        return !0;
                    },
                    guid: 0,
                    compile: function(e, t) {
                        (this.sourceNode = []), (this.opcodes = []), (this.children = []), (this.options = t), (this.stringParams = t.stringParams), (this.trackIds = t.trackIds), (t.blockParams = t.blockParams || []);
                        var r = t.knownHelpers;
                        if (((t.knownHelpers = { helperMissing: !0, blockHelperMissing: !0, each: !0, if: !0, unless: !0, with: !0, log: !0, lookup: !0 }), r))
                            for (var n in r) t.knownHelpers[n] = r[n];
                        return this.accept(e);
                    },
                    compileProgram: function(e) {
                        var t = new this.compiler().compile(e, this.options),
                            r = this.guid++;
                        return (this.usePartial = this.usePartial || t.usePartial), (this.children[r] = t), (this.useDepths = this.useDepths || t.useDepths), r;
                    },
                    accept: function(e) {
                        this.sourceNode.unshift(e);
                        var t = this[e.type](e);
                        return this.sourceNode.shift(), t;
                    },
                    Program: function(e) {
                        this.options.blockParams.unshift(e.blockParams);
                        for (var t = e.body, r = 0, n = t.length; r < n; r++) this.accept(t[r]);
                        return this.options.blockParams.shift(), (this.isSimple = 1 === n), (this.blockParams = e.blockParams ? e.blockParams.length : 0), this;
                    },
                    BlockStatement: function(e) {
                        s(e);
                        var t = e.program,
                            r = e.inverse;
                        (t = t && this.compileProgram(t)), (r = r && this.compileProgram(r));
                        var n = this.classifySexpr(e);
                        "helper" === n
                            ?
                            this.helperSexpr(e, t, r) :
                            "simple" === n ?
                            (this.simpleSexpr(e), this.opcode("pushProgram", t), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("blockValue", e.path.original)) :
                            (this.ambiguousSexpr(e, t, r), this.opcode("pushProgram", t), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")),
                            this.opcode("append");
                    },
                    PartialStatement: function(e) {
                        this.usePartial = !0;
                        var t = e.params;
                        if (t.length > 1) throw new d("Unsupported number of partial arguments: " + t.length, e);
                        t.length || t.push({ type: "PathExpression", parts: [], depth: 0 });
                        var r = e.name.original,
                            n = "SubExpression" === e.name.type;
                        n && this.accept(e.name), this.setupFullMustacheParams(e, void 0, void 0, !0);
                        var a = e.indent || "";
                        this.options.preventIndent && a && (this.opcode("appendContent", a), (a = "")), this.opcode("invokePartial", n, r, a), this.opcode("append");
                    },
                    MustacheStatement: function(e) {
                        this.SubExpression(e), e.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append");
                    },
                    ContentStatement: function(e) {
                        e.value && this.opcode("appendContent", e.value);
                    },
                    CommentStatement: function() {},
                    SubExpression: function(e) {
                        s(e);
                        var t = this.classifySexpr(e);
                        "simple" === t ? this.simpleSexpr(e) : "helper" === t ? this.helperSexpr(e) : this.ambiguousSexpr(e);
                    },
                    ambiguousSexpr: function(e, t, r) {
                        var n = e.path,
                            a = n.parts[0],
                            i = null != t || null != r;
                        this.opcode("getContext", n.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", r), this.accept(n), this.opcode("invokeAmbiguous", a, i);
                    },
                    simpleSexpr: function(e) {
                        this.accept(e.path), this.opcode("resolvePossibleLambda");
                    },
                    helperSexpr: function(e, t, r) {
                        var n = this.setupFullMustacheParams(e, t, r),
                            a = e.path,
                            i = a.parts[0];
                        if (this.options.knownHelpers[i]) this.opcode("invokeKnownHelper", n.length, i);
                        else {
                            if (this.options.knownHelpersOnly) throw new d("You specified knownHelpersOnly, but used the unknown helper " + i, e);
                            (a.falsy = !0), this.accept(a), this.opcode("invokeHelper", n.length, a.original, p.helpers.simpleId(a));
                        }
                    },
                    PathExpression: function(e) {
                        this.addDepth(e.depth), this.opcode("getContext", e.depth);
                        var t = e.parts[0],
                            r = p.helpers.scopedId(e),
                            n = !e.depth && !r && this.blockParamIndex(t);
                        n
                            ?
                            this.opcode("lookupBlockParam", n, e.parts) :
                            t ?
                            e.data ?
                            ((this.options.data = !0), this.opcode("lookupData", e.depth, e.parts)) :
                            this.opcode("lookupOnContext", e.parts, e.falsy, r) :
                            this.opcode("pushContext");
                    },
                    StringLiteral: function(e) {
                        this.opcode("pushString", e.value);
                    },
                    NumberLiteral: function(e) {
                        this.opcode("pushLiteral", e.value);
                    },
                    BooleanLiteral: function(e) {
                        this.opcode("pushLiteral", e.value);
                    },
                    Hash: function(e) {
                        var t,
                            r,
                            n = e.pairs;
                        for (this.opcode("pushHash"), t = 0, r = n.length; t < r; t++) this.pushParam(n[t].value);
                        for (; t--;) this.opcode("assignToHash", n[t].key);
                        this.opcode("popHash");
                    },
                    opcode: function(e) {
                        this.opcodes.push({ opcode: e, args: h.call(arguments, 1), loc: this.sourceNode[0].loc });
                    },
                    addDepth: function(e) {
                        e && (this.useDepths = !0);
                    },
                    classifySexpr: function(e) {
                        var t = p.helpers.simpleId(e.path),
                            r = t && !!this.blockParamIndex(e.path.parts[0]),
                            n = !r && p.helpers.helperExpression(e),
                            a = !r && (n || t),
                            i = this.options;
                        if (a && !n) {
                            var o = e.path.parts[0];
                            i.knownHelpers[o] ? (n = !0) : i.knownHelpersOnly && (a = !1);
                        }
                        return n ? "helper" : a ? "ambiguous" : "simple";
                    },
                    pushParams: function(e) {
                        for (var t = 0, r = e.length; t < r; t++) this.pushParam(e[t]);
                    },
                    pushParam: function(e) {
                        var t = null != e.value ? e.value : e.original || "";
                        if (this.stringParams)
                            t.replace && (t = t.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")),
                            e.depth && this.addDepth(e.depth),
                            this.opcode("getContext", e.depth || 0),
                            this.opcode("pushStringParam", t, e.type),
                            "SubExpression" === e.type && this.accept(e);
                        else {
                            if (this.trackIds) {
                                var r;
                                if ((!e.parts || p.helpers.scopedId(e) || e.depth || (r = this.blockParamIndex(e.parts[0])), r)) {
                                    var n = e.parts.slice(1).join(".");
                                    this.opcode("pushId", "BlockParam", r, n);
                                } else(t = e.original || t), t.replace && (t = t.replace(/^\.\//g, "").replace(/^\.$/g, "")), this.opcode("pushId", e.type, t);
                            }
                            this.accept(e);
                        }
                    },
                    setupFullMustacheParams: function(e, t, r, n) {
                        var a = e.params;
                        return this.pushParams(a), this.opcode("pushProgram", t), this.opcode("pushProgram", r), e.hash ? this.accept(e.hash) : this.opcode("emptyHash", n), a;
                    },
                    blockParamIndex: function(e) {
                        for (var t = 0, r = this.options.blockParams.length; t < r; t++) {
                            var n = this.options.blockParams[t],
                                a = n && u(n, e);
                            if (n && a >= 0) return [t, a];
                        }
                    },
                }),
                (l.precompile = a),
                (l.compile = i),
                l
            );
        })(t, e, o),
        h = (function(e) {
            "use strict";

            function t(e, t, r) {
                if (a(e)) {
                    for (var n = [], i = 0, o = e.length; i < o; i++) n.push(t.wrap(e[i], r));
                    return n;
                }
                return "boolean" == typeof e || "number" == typeof e ? e + "" : e;
            }

            function r(e) {
                (this.srcFile = e), (this.source = []);
            }
            var n,
                a = e.isArray;
            try {
                var i = require("source-map"),
                    o = i.SourceNode;
            } catch (s) {
                (o = function(e, t, r, n) {
                    (this.src = ""), n && this.add(n);
                }),
                (o.prototype = {
                    add: function(e) {
                        a(e) && (e = e.join("")), (this.src += e);
                    },
                    prepend: function(e) {
                        a(e) && (e = e.join("")), (this.src = e + this.src);
                    },
                    toStringWithSourceMap: function() {
                        return { code: this.toString() };
                    },
                    toString: function() {
                        return this.src;
                    },
                });
            }
            return (
                (r.prototype = {
                    prepend: function(e, t) {
                        this.source.unshift(this.wrap(e, t));
                    },
                    push: function(e, t) {
                        this.source.push(this.wrap(e, t));
                    },
                    merge: function() {
                        var e = this.empty();
                        return (
                            this.each(function(t) {
                                e.add(["  ", t, "\n"]);
                            }),
                            e
                        );
                    },
                    each: function(e) {
                        for (var t = 0, r = this.source.length; t < r; t++) e(this.source[t]);
                    },
                    empty: function(e) {
                        return (e = e || this.currentLocation || { start: {} }), new o(e.start.line, e.start.column, this.srcFile);
                    },
                    wrap: function(e, r) {
                        return e instanceof o ? e : ((r = r || this.currentLocation || { start: {} }), (e = t(e, this, r)), new o(r.start.line, r.start.column, this.srcFile, e));
                    },
                    functionCall: function(e, t, r) {
                        return (r = this.generateList(r)), this.wrap([e, t ? "." + t + "(" : "(", r, ")"]);
                    },
                    quotedString: function(e) {
                        return (
                            '"' +
                            (e + "")
                            .replace(/\\/g, "\\\\")
                            .replace(/"/g, '\\"')
                            .replace(/\n/g, "\\n")
                            .replace(/\r/g, "\\r")
                            .replace(/\u2028/g, "\\u2028")
                            .replace(/\u2029/g, "\\u2029") +
                            '"'
                        );
                    },
                    objectLiteral: function(e) {
                        var r = [];
                        for (var n in e)
                            if (e.hasOwnProperty(n)) {
                                var a = t(e[n], this);
                                "undefined" !== a && r.push([this.quotedString(n), ":", a]);
                            }
                        var i = this.generateList(r);
                        return i.prepend("{"), i.add("}"), i;
                    },
                    generateList: function(e, r) {
                        for (var n = this.empty(r), a = 0, i = e.length; a < i; a++) a && n.add(","), n.add(t(e[a], this, r));
                        return n;
                    },
                    generateArray: function(e, t) {
                        var r = this.generateList(e, t);
                        return r.prepend("["), r.add("]"), r;
                    },
                }),
                (n = r)
            );
        })(e),
        f = (function(e, t, r, n) {
            "use strict";

            function a(e) {
                this.value = e;
            }

            function i() {}

            function o(e, t, r, n) {
                var a = t.popStack(),
                    i = 0,
                    o = r.length;
                for (e && o--; i < o; i++) a = t.nameLookup(a, r[i], n);
                return e ? [t.aliasable("this.strict"), "(", a, ", ", t.quotedString(r[i]), ")"] : a;
            }
            var s,
                l = e.COMPILER_REVISION,
                d = e.REVISION_CHANGES,
                c = t,
                u = r.isArray,
                p = n;
            i.prototype = {
                nameLookup: function(e, t) {
                    return i.isValidJavaScriptVariableName(t) ? [e, ".", t] : [e, "['", t, "']"];
                },
                depthedLookup: function(e) {
                    return [this.aliasable("this.lookup"), '(depths, "', e, '")'];
                },
                compilerInfo: function() {
                    var e = l,
                        t = d[e];
                    return [e, t];
                },
                appendToBuffer: function(e, t, r) {
                    return u(e) || (e = [e]), (e = this.source.wrap(e, t)), this.environment.isSimple ? ["return ", e, ";"] : r ? ["buffer += ", e, ";"] : ((e.appendToBuffer = !0), e);
                },
                initializeBuffer: function() {
                    return this.quotedString("");
                },
                compile: function(e, t, r, n) {
                    (this.environment = e),
                    (this.options = t),
                    (this.stringParams = this.options.stringParams),
                    (this.trackIds = this.options.trackIds),
                    (this.precompile = !n),
                    (this.name = this.environment.name),
                    (this.isChild = !!r),
                    (this.context = r || { programs: [], environments: [] }),
                    this.preamble(),
                        (this.stackSlot = 0),
                        (this.stackVars = []),
                        (this.aliases = {}),
                        (this.registers = { list: [] }),
                        (this.hashes = []),
                        (this.compileStack = []),
                        (this.inlineStack = []),
                        (this.blockParams = []),
                        this.compileChildren(e, t),
                        (this.useDepths = this.useDepths || e.useDepths || this.options.compat),
                        (this.useBlockParams = this.useBlockParams || e.useBlockParams);
                    var a,
                        i,
                        o,
                        s,
                        l = e.opcodes;
                    for (o = 0, s = l.length; o < s; o++)(a = l[o]), (this.source.currentLocation = a.loc), (i = i || a.loc), this[a.opcode].apply(this, a.args);
                    if (((this.source.currentLocation = i), this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length)) throw new c("Compile completed with content left on stack");
                    var d = this.createFunctionContext(n);
                    if (this.isChild) return d;
                    var u = { compiler: this.compilerInfo(), main: d },
                        p = this.context.programs;
                    for (o = 0, s = p.length; o < s; o++) p[o] && (u[o] = p[o]);
                    return (
                        this.environment.usePartial && (u.usePartial = !0),
                        this.options.data && (u.useData = !0),
                        this.useDepths && (u.useDepths = !0),
                        this.useBlockParams && (u.useBlockParams = !0),
                        this.options.compat && (u.compat = !0),
                        n ?
                        (u.compilerOptions = this.options) :
                        ((u.compiler = JSON.stringify(u.compiler)),
                            (this.source.currentLocation = { start: { line: 1, column: 0 } }),
                            (u = this.objectLiteral(u)),
                            t.srcName ? ((u = u.toStringWithSourceMap({ file: t.destName })), (u.map = u.map && u.map.toString())) : (u = u.toString())),
                        u
                    );
                },
                preamble: function() {
                    (this.lastContext = 0), (this.source = new p(this.options.srcName));
                },
                createFunctionContext: function(e) {
                    var t = "",
                        r = this.stackVars.concat(this.registers.list);
                    r.length > 0 && (t += ", " + r.join(", "));
                    var n = 0;
                    for (var a in this.aliases) {
                        var i = this.aliases[a];
                        this.aliases.hasOwnProperty(a) && i.children && i.referenceCount > 1 && ((t += ", alias" + ++n + "=" + a), (i.children[0] = "alias" + n));
                    }
                    var o = ["depth0", "helpers", "partials", "data"];
                    (this.useBlockParams || this.useDepths) && o.push("blockParams"), this.useDepths && o.push("depths");
                    var s = this.mergeSource(t);
                    return e ? (o.push(s), Function.apply(this, o)) : this.source.wrap(["function(", o.join(","), ") {\n  ", s, "}"]);
                },
                mergeSource: function(e) {
                    var t,
                        r,
                        n,
                        a,
                        i = this.environment.isSimple,
                        o = !this.forceBuffer;
                    return (
                        this.source.each(function(e) {
                            e.appendToBuffer ? (n ? e.prepend("  + ") : (n = e), (a = e)) : (n && (r ? n.prepend("buffer += ") : (t = !0), a.add(";"), (n = a = void 0)), (r = !0), i || (o = !1));
                        }),
                        o ?
                        n ?
                        (n.prepend("return "), a.add(";")) :
                        r || this.source.push('return "";') :
                        ((e += ", buffer = " + (t ? "" : this.initializeBuffer())), n ? (n.prepend("return buffer + "), a.add(";")) : this.source.push("return buffer;")),
                        e && this.source.prepend("var " + e.substring(2) + (t ? "" : ";\n")),
                        this.source.merge()
                    );
                },
                blockValue: function(e) {
                    var t = this.aliasable("helpers.blockHelperMissing"),
                        r = [this.contextName(0)];
                    this.setupHelperArgs(e, 0, r);
                    var n = this.popStack();
                    r.splice(1, 0, n), this.push(this.source.functionCall(t, "call", r));
                },
                ambiguousBlockValue: function() {
                    var e = this.aliasable("helpers.blockHelperMissing"),
                        t = [this.contextName(0)];
                    this.setupHelperArgs("", 0, t, !0), this.flushInline();
                    var r = this.topStack();
                    t.splice(1, 0, r), this.pushSource(["if (!", this.lastHelper, ") { ", r, " = ", this.source.functionCall(e, "call", t), "}"]);
                },
                appendContent: function(e) {
                    this.pendingContent ? (e = this.pendingContent + e) : (this.pendingLocation = this.source.currentLocation), (this.pendingContent = e);
                },
                append: function() {
                    if (this.isInline())
                        this.replaceStack(function(e) {
                            return [" != null ? ", e, ' : ""'];
                        }),
                        this.pushSource(this.appendToBuffer(this.popStack()));
                    else {
                        var e = this.popStack();
                        this.pushSource(["if (", e, " != null) { ", this.appendToBuffer(e, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"]);
                    }
                },
                appendEscaped: function() {
                    this.pushSource(this.appendToBuffer([this.aliasable("this.escapeExpression"), "(", this.popStack(), ")"]));
                },
                getContext: function(e) {
                    this.lastContext = e;
                },
                pushContext: function() {
                    this.pushStackLiteral(this.contextName(this.lastContext));
                },
                lookupOnContext: function(e, t, r) {
                    var n = 0;
                    r || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(e[n++])), this.resolvePath("context", e, n, t);
                },
                lookupBlockParam: function(e, t) {
                    (this.useBlockParams = !0), this.push(["blockParams[", e[0], "][", e[1], "]"]), this.resolvePath("context", t, 1);
                },
                lookupData: function(e, t) {
                    e ? this.pushStackLiteral("this.data(data, " + e + ")") : this.pushStackLiteral("data"), this.resolvePath("data", t, 0, !0);
                },
                resolvePath: function(e, t, r, n) {
                    if (this.options.strict || this.options.assumeObjects) return void this.push(o(this.options.strict, this, t, e));
                    for (var a = t.length; r < a; r++)
                        this.replaceStack(function(a) {
                            var i = this.nameLookup(a, t[r], e);
                            return n ? [" && ", i] : [" != null ? ", i, " : ", a];
                        });
                },
                resolvePossibleLambda: function() {
                    this.push([this.aliasable("this.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
                },
                pushStringParam: function(e, t) {
                    this.pushContext(), this.pushString(t), "SubExpression" !== t && ("string" == typeof e ? this.pushString(e) : this.pushStackLiteral(e));
                },
                emptyHash: function(e) {
                    this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(e ? "undefined" : "{}");
                },
                pushHash: function() {
                    this.hash && this.hashes.push(this.hash), (this.hash = { values: [], types: [], contexts: [], ids: [] });
                },
                popHash: function() {
                    var e = this.hash;
                    (this.hash = this.hashes.pop()),
                    this.trackIds && this.push(this.objectLiteral(e.ids)),
                        this.stringParams && (this.push(this.objectLiteral(e.contexts)), this.push(this.objectLiteral(e.types))),
                        this.push(this.objectLiteral(e.values));
                },
                pushString: function(e) {
                    this.pushStackLiteral(this.quotedString(e));
                },
                pushLiteral: function(e) {
                    this.pushStackLiteral(e);
                },
                pushProgram: function(e) {
                    null != e ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null);
                },
                invokeHelper: function(e, t, r) {
                    var n = this.popStack(),
                        a = this.setupHelper(e, t),
                        i = r ? [a.name, " || "] : "",
                        o = ["("].concat(i, n);
                    this.options.strict || o.push(" || ", this.aliasable("helpers.helperMissing")), o.push(")"), this.push(this.source.functionCall(o, "call", a.callParams));
                },
                invokeKnownHelper: function(e, t) {
                    var r = this.setupHelper(e, t);
                    this.push(this.source.functionCall(r.name, "call", r.callParams));
                },
                invokeAmbiguous: function(e, t) {
                    this.useRegister("helper");
                    var r = this.popStack();
                    this.emptyHash();
                    var n = this.setupHelper(0, e, t),
                        a = (this.lastHelper = this.nameLookup("helpers", e, "helper")),
                        i = ["(", "(helper = ", a, " || ", r, ")"];
                    this.options.strict || ((i[0] = "(helper = "), i.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))),
                        this.push(["(", i, n.paramsInit ? ["),(", n.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", n.callParams), " : helper))"]);
                },
                invokePartial: function(e, t, r) {
                    var n = [],
                        a = this.setupParams(t, 1, n, !1);
                    e && ((t = this.popStack()), delete a.name),
                        r && (a.indent = JSON.stringify(r)),
                        (a.helpers = "helpers"),
                        (a.partials = "partials"),
                        e ? n.unshift(t) : n.unshift(this.nameLookup("partials", t, "partial")),
                        this.options.compat && (a.depths = "depths"),
                        (a = this.objectLiteral(a)),
                        n.push(a),
                        this.push(this.source.functionCall("this.invokePartial", "", n));
                },
                assignToHash: function(e) {
                    var t,
                        r,
                        n,
                        a = this.popStack();
                    this.trackIds && (n = this.popStack()), this.stringParams && ((r = this.popStack()), (t = this.popStack()));
                    var i = this.hash;
                    t && (i.contexts[e] = t), r && (i.types[e] = r), n && (i.ids[e] = n), (i.values[e] = a);
                },
                pushId: function(e, t, r) {
                    "BlockParam" === e
                        ?
                        this.pushStackLiteral("blockParams[" + t[0] + "].path[" + t[1] + "]" + (r ? " + " + JSON.stringify("." + r) : "")) :
                        "PathExpression" === e ?
                        this.pushString(t) :
                        "SubExpression" === e ?
                        this.pushStackLiteral("true") :
                        this.pushStackLiteral("null");
                },
                compiler: i,
                compileChildren: function(e, t) {
                    for (var r, n, a = e.children, i = 0, o = a.length; i < o; i++) {
                        (r = a[i]), (n = new this.compiler());
                        var s = this.matchExistingProgram(r);
                        null == s ?
                            (this.context.programs.push(""),
                                (s = this.context.programs.length),
                                (r.index = s),
                                (r.name = "program" + s),
                                (this.context.programs[s] = n.compile(r, t, this.context, !this.precompile)),
                                (this.context.environments[s] = r),
                                (this.useDepths = this.useDepths || n.useDepths),
                                (this.useBlockParams = this.useBlockParams || n.useBlockParams)) :
                            ((r.index = s), (r.name = "program" + s), (this.useDepths = this.useDepths || r.useDepths), (this.useBlockParams = this.useBlockParams || r.useBlockParams));
                    }
                },
                matchExistingProgram: function(e) {
                    for (var t = 0, r = this.context.environments.length; t < r; t++) {
                        var n = this.context.environments[t];
                        if (n && n.equals(e)) return t;
                    }
                },
                programExpression: function(e) {
                    var t = this.environment.children[e],
                        r = [t.index, "data", t.blockParams];
                    return (this.useBlockParams || this.useDepths) && r.push("blockParams"), this.useDepths && r.push("depths"), "this.program(" + r.join(", ") + ")";
                },
                useRegister: function(e) {
                    this.registers[e] || ((this.registers[e] = !0), this.registers.list.push(e));
                },
                push: function(e) {
                    return e instanceof a || (e = this.source.wrap(e)), this.inlineStack.push(e), e;
                },
                pushStackLiteral: function(e) {
                    this.push(new a(e));
                },
                pushSource: function(e) {
                    this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), (this.pendingContent = void 0)), e && this.source.push(e);
                },
                replaceStack: function(e) {
                    var t,
                        r,
                        n,
                        i = ["("];
                    if (!this.isInline()) throw new c("replaceStack on non-inline");
                    var o = this.popStack(!0);
                    if (o instanceof a)(t = [o.value]), (i = ["(", t]), (n = !0);
                    else {
                        r = !0;
                        var s = this.incrStack();
                        (i = ["((", this.push(s), " = ", o, ")"]), (t = this.topStack());
                    }
                    var l = e.call(this, t);
                    n || this.popStack(), r && this.stackSlot--, this.push(i.concat(l, ")"));
                },
                incrStack: function() {
                    return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName();
                },
                topStackName: function() {
                    return "stack" + this.stackSlot;
                },
                flushInline: function() {
                    var e = this.inlineStack;
                    this.inlineStack = [];
                    for (var t = 0, r = e.length; t < r; t++) {
                        var n = e[t];
                        if (n instanceof a) this.compileStack.push(n);
                        else {
                            var i = this.incrStack();
                            this.pushSource([i, " = ", n, ";"]), this.compileStack.push(i);
                        }
                    }
                },
                isInline: function() {
                    return this.inlineStack.length;
                },
                popStack: function(e) {
                    var t = this.isInline(),
                        r = (t ? this.inlineStack : this.compileStack).pop();
                    if (!e && r instanceof a) return r.value;
                    if (!t) {
                        if (!this.stackSlot) throw new c("Invalid stack pop");
                        this.stackSlot--;
                    }
                    return r;
                },
                topStack: function() {
                    var e = this.isInline() ? this.inlineStack : this.compileStack,
                        t = e[e.length - 1];
                    return t instanceof a ? t.value : t;
                },
                contextName: function(e) {
                    return this.useDepths && e ? "depths[" + e + "]" : "depth" + e;
                },
                quotedString: function(e) {
                    return this.source.quotedString(e);
                },
                objectLiteral: function(e) {
                    return this.source.objectLiteral(e);
                },
                aliasable: function(e) {
                    var t = this.aliases[e];
                    return t ? (t.referenceCount++, t) : ((t = this.aliases[e] = this.source.wrap(e)), (t.aliasable = !0), (t.referenceCount = 1), t);
                },
                setupHelper: function(e, t, r) {
                    var n = [],
                        a = this.setupHelperArgs(t, e, n, r),
                        i = this.nameLookup("helpers", t, "helper");
                    return { params: n, paramsInit: a, name: i, callParams: [this.contextName(0)].concat(n) };
                },
                setupParams: function(e, t, r) {
                    var n,
                        a = {},
                        i = [],
                        o = [],
                        s = [];
                    (a.name = this.quotedString(e)), (a.hash = this.popStack()), this.trackIds && (a.hashIds = this.popStack()), this.stringParams && ((a.hashTypes = this.popStack()), (a.hashContexts = this.popStack()));
                    var l = this.popStack(),
                        d = this.popStack();
                    (d || l) && ((a.fn = d || "this.noop"), (a.inverse = l || "this.noop"));
                    for (var c = t; c--;)(n = this.popStack()), (r[c] = n), this.trackIds && (s[c] = this.popStack()), this.stringParams && ((o[c] = this.popStack()), (i[c] = this.popStack()));
                    return (
                        this.trackIds && (a.ids = this.source.generateArray(s)),
                        this.stringParams && ((a.types = this.source.generateArray(o)), (a.contexts = this.source.generateArray(i))),
                        this.options.data && (a.data = "data"),
                        this.useBlockParams && (a.blockParams = "blockParams"),
                        a
                    );
                },
                setupHelperArgs: function(e, t, r, n) {
                    var a = this.setupParams(e, t, r, !0);
                    return (a = this.objectLiteral(a)), n ? (this.useRegister("options"), r.push("options"), ["options=", a]) : (r.push(a), "");
                },
            };
            for (
                var h = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(
                        " "
                    ),
                    f = (i.RESERVED_WORDS = {}),
                    m = 0,
                    g = h.length; m < g; m++
            )
                f[h[m]] = !0;
            return (
                (i.isValidJavaScriptVariableName = function(e) {
                    return !i.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e);
                }),
                (s = i)
            );
        })(r, t, e, h),
        m = (function(e, t, r, n, a) {
            "use strict";
            var i,
                o = e,
                s = t,
                l = r.parser,
                d = r.parse,
                c = n.Compiler,
                u = n.compile,
                p = n.precompile,
                h = a,
                f = o.create,
                m = function() {
                    var e = f();
                    return (
                        (e.compile = function(t, r) {
                            return u(t, r, e);
                        }),
                        (e.precompile = function(t, r) {
                            return p(t, r, e);
                        }),
                        (e.AST = s),
                        (e.Compiler = c),
                        (e.JavaScriptCompiler = h),
                        (e.Parser = l),
                        (e.parse = d),
                        e
                    );
                };
            (o = m()), (o.create = m);
            var g = "undefined" != typeof global ? global : window,
                v = g.Handlebars;
            return (
                (o.noConflict = function() {
                    g.Handlebars === o && (g.Handlebars = v);
                }),
                (o["default"] = o),
                (i = o)
            );
        })(i, o, u, p, f);
    return m;
}),
(function(e, t) {
    "use strict";
    var r = function(e) {
            if ("object" != typeof e.document) throw new Error("Cookies.js requires a `window` with a `document` object");
            var r = function(e, t, n) {
                return 1 === arguments.length ? r.get(e) : r.set(e, t, n);
            };
            return (
                (r._document = e.document),
                (r._cacheKeyPrefix = "cookey."),
                (r._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC")),
                (r.defaults = { path: "/", secure: !1 }),
                (r.get = function(e) {
                    return r._cachedDocumentCookie !== r._document.cookie && r._renewCache(), r._cache[r._cacheKeyPrefix + e];
                }),
                (r.set = function(e, n, a) {
                    return (a = r._getExtendedOptions(a)), (a.expires = r._getExpiresDate(n === t ? -1 : a.expires)), (r._document.cookie = r._generateCookieString(e, n, a)), r;
                }),
                (r.expire = function(e, n) {
                    return r.set(e, t, n);
                }),
                (r._getExtendedOptions = function(e) {
                    return { path: (e && e.path) || r.defaults.path, domain: (e && e.domain) || r.defaults.domain, expires: (e && e.expires) || r.defaults.expires, secure: e && e.secure !== t ? e.secure : r.defaults.secure };
                }),
                (r._isValidDate = function(e) {
                    return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime());
                }),
                (r._getExpiresDate = function(e, t) {
                    if (((t = t || new Date()), "number" == typeof e ? (e = e === 1 / 0 ? r._maxExpireDate : new Date(t.getTime() + 1e3 * e)) : "string" == typeof e && (e = new Date(e)), e && !r._isValidDate(e)))
                        throw new Error("`expires` parameter cannot be converted to a valid Date instance");
                    return e;
                }),
                (r._generateCookieString = function(e, t, r) {
                    (e = e.replace(/[^#$&+\^`|]/g, encodeURIComponent)), (e = e.replace(/\(/g, "%28").replace(/\)/g, "%29")), (t = (t + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent)), (r = r || {});
                    var n = e + "=" + t;
                    return (n += r.path ? ";path=" + r.path : ""), (n += r.domain ? ";domain=" + r.domain : ""), (n += r.expires ? ";expires=" + r.expires.toUTCString() : ""), (n += r.secure ? ";secure" : "");
                }),
                (r._getCacheFromString = function(e) {
                    for (var n = {}, a = e ? e.split("; ") : [], i = 0; i < a.length; i++) {
                        var o = r._getKeyValuePairFromCookieString(a[i]);
                        n[r._cacheKeyPrefix + o.key] === t && (n[r._cacheKeyPrefix + o.key] = o.value);
                    }
                    return n;
                }),
                (r._getKeyValuePairFromCookieString = function(e) {
                    var t = e.indexOf("=");
                    return (t = t < 0 ? e.length : t), { key: decodeURIComponent(e.substr(0, t)), value: decodeURIComponent(e.substr(t + 1)) };
                }),
                (r._renewCache = function() {
                    (r._cache = r._getCacheFromString(r._document.cookie)), (r._cachedDocumentCookie = r._document.cookie);
                }),
                (r._areEnabled = function() {
                    var e = "cookies.js",
                        t = "1" === r.set(e, 1).get(e);
                    return r.expire(e), t;
                }),
                (r.enabled = r._areEnabled()),
                r
            );
        },
        n = "object" == typeof e.document ? r(e) : r;
    "function" == typeof define && define.amd ?
        define(function() {
            return n;
        }) :
        "object" == typeof exports ?
        ("object" == typeof module && "object" == typeof module.exports && (exports = module.exports = n), (exports.Cookies = n)) :
        (e.Cookies = n);
})("undefined" == typeof window ? this : window),
(function(e) {
    var t,
        r,
        n = "0.4.2",
        a = "hasOwnProperty",
        i = /[\.\/]/,
        o = "*",
        s = function() {},
        l = function(e, t) {
            return e - t;
        },
        d = { n: {} },
        c = function(e, n) {
            e = String(e);
            var a,
                i = r,
                o = Array.prototype.slice.call(arguments, 2),
                s = c.listeners(e),
                d = 0,
                u = [],
                p = {},
                h = [],
                f = t;
            (t = e), (r = 0);
            for (var m = 0, g = s.length; m < g; m++) "zIndex" in s[m] && (u.push(s[m].zIndex), s[m].zIndex < 0 && (p[s[m].zIndex] = s[m]));
            for (u.sort(l); u[d] < 0;)
                if (((a = p[u[d++]]), h.push(a.apply(n, o)), r)) return (r = i), h;
            for (m = 0; m < g; m++)
                if (((a = s[m]), "zIndex" in a))
                    if (a.zIndex == u[d]) {
                        if ((h.push(a.apply(n, o)), r)) break;
                        do
                            if ((d++, (a = p[u[d]]), a && h.push(a.apply(n, o)), r)) break;
                        while (a);
                    } else p[a.zIndex] = a;
            else if ((h.push(a.apply(n, o)), r)) break;
            return (r = i), (t = f), h.length ? h : null;
        };
    (c._events = d),
    (c.listeners = function(e) {
        var t,
            r,
            n,
            a,
            s,
            l,
            c,
            u,
            p = e.split(i),
            h = d,
            f = [h],
            m = [];
        for (a = 0, s = p.length; a < s; a++) {
            for (u = [], l = 0, c = f.length; l < c; l++)
                for (h = f[l].n, r = [h[p[a]], h[o]], n = 2; n--;)(t = r[n]), t && (u.push(t), (m = m.concat(t.f || [])));
            f = u;
        }
        return m;
    }),
    (c.on = function(e, t) {
        if (((e = String(e)), "function" != typeof t)) return function() {};
        for (var r = e.split(i), n = d, a = 0, o = r.length; a < o; a++)(n = n.n), (n = (n.hasOwnProperty(r[a]) && n[r[a]]) || (n[r[a]] = { n: {} }));
        for (n.f = n.f || [], a = 0, o = n.f.length; a < o; a++)
            if (n.f[a] == t) return s;
        return (
            n.f.push(t),
            function(e) {
                +e == +e && (t.zIndex = +e);
            }
        );
    }),
    (c.f = function(e) {
        var t = [].slice.call(arguments, 1);
        return function() {
            c.apply(null, [e, null].concat(t).concat([].slice.call(arguments, 0)));
        };
    }),
    (c.stop = function() {
        r = 1;
    }),
    (c.nt = function(e) {
        return e ? new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(t) : t;
    }),
    (c.nts = function() {
        return t.split(i);
    }),
    (c.off = c.unbind = function(e, t) {
        if (!e) return void(c._events = d = { n: {} });
        var r,
            n,
            s,
            l,
            u,
            p,
            h,
            f = e.split(i),
            m = [d];
        for (l = 0, u = f.length; l < u; l++)
            for (p = 0; p < m.length; p += s.length - 2) {
                if (((s = [p, 1]), (r = m[p].n), f[l] != o)) r[f[l]] && s.push(r[f[l]]);
                else
                    for (n in r) r[a](n) && s.push(r[n]);
                m.splice.apply(m, s);
            }
        for (l = 0, u = m.length; l < u; l++)
            for (r = m[l]; r.n;) {
                if (t) {
                    if (r.f) {
                        for (p = 0, h = r.f.length; p < h; p++)
                            if (r.f[p] == t) {
                                r.f.splice(p, 1);
                                break;
                            }!r.f.length && delete r.f;
                    }
                    for (n in r.n)
                        if (r.n[a](n) && r.n[n].f) {
                            var g = r.n[n].f;
                            for (p = 0, h = g.length; p < h; p++)
                                if (g[p] == t) {
                                    g.splice(p, 1);
                                    break;
                                }!g.length && delete r.n[n].f;
                        }
                } else {
                    delete r.f;
                    for (n in r.n) r.n[a](n) && r.n[n].f && delete r.n[n].f;
                }
                r = r.n;
            }
    }),
    (c.once = function(e, t) {
        var r = function() {
            return c.unbind(e, r), t.apply(this, arguments);
        };
        return c.on(e, r);
    }),
    (c.version = n),
    (c.toString = function() {
        return "You are running Eve " + n;
    }),
    "undefined" != typeof module && module.exports ?
        (module.exports = c) :
        "undefined" != typeof define ?
        define("eve", [], function() {
            return c;
        }) :
        (e.eve = c);
})(window || this),
(function(e, t) {
    "function" == typeof define && define.amd ?
        define(["eve"], function(r) {
            return t(e, r);
        }) :
        t(e, e.eve || ("function" == typeof require && require("eve")));
})(this, function(e, t) {
    function r(e) {
        if (r.is(e, "function")) return S ? e() : t.on("raphael.DOMload", e);
        if (r.is(e, W)) return r._engine.create[I](r, e.splice(0, 3 + r.is(e[0], j))).add(e);
        var n = Array.prototype.slice.call(arguments, 0);
        if (r.is(n[n.length - 1], "function")) {
            var a = n.pop();
            return S ?
                a.call(r._engine.create[I](r, n)) :
                t.on("raphael.DOMload", function() {
                    a.call(r._engine.create[I](r, n));
                });
        }
        return r._engine.create[I](r, arguments);
    }

    function n(e) {
        if ("function" == typeof e || Object(e) !== e) return e;
        var t = new e.constructor();
        for (var r in e) e[P](r) && (t[r] = n(e[r]));
        return t;
    }

    function a(e, t) {
        for (var r = 0, n = e.length; r < n; r++)
            if (e[r] === t) return e.push(e.splice(r, 1)[0]);
    }

    function i(e, t, r) {
        function n() {
            var i = Array.prototype.slice.call(arguments, 0),
                o = i.join("␀"),
                s = (n.cache = n.cache || {}),
                l = (n.count = n.count || []);
            return s[P](o) ? (a(l, o), r ? r(s[o]) : s[o]) : (l.length >= 1e3 && delete s[l.shift()], l.push(o), (s[o] = e[I](t, i)), r ? r(s[o]) : s[o]);
        }
        return n;
    }

    function o() {
        return this.hex;
    }

    function s(e, t) {
        for (var r = [], n = 0, a = e.length; a - 2 * !t > n; n += 2) {
            var i = [
                { x: +e[n - 2], y: +e[n - 1] },
                { x: +e[n], y: +e[n + 1] },
                { x: +e[n + 2], y: +e[n + 3] },
                { x: +e[n + 4], y: +e[n + 5] },
            ];
            t
                ?
                n ?
                a - 4 == n ?
                (i[3] = { x: +e[0], y: +e[1] }) :
                a - 2 == n && ((i[2] = { x: +e[0], y: +e[1] }), (i[3] = { x: +e[2], y: +e[3] })) :
                (i[0] = { x: +e[a - 2], y: +e[a - 1] }) :
                a - 4 == n ?
                (i[3] = i[2]) :
                n || (i[0] = { x: +e[n], y: +e[n + 1] }),
                r.push(["C", (-i[0].x + 6 * i[1].x + i[2].x) / 6, (-i[0].y + 6 * i[1].y + i[2].y) / 6, (i[1].x + 6 * i[2].x - i[3].x) / 6, (i[1].y + 6 * i[2].y - i[3].y) / 6, i[2].x, i[2].y]);
        }
        return r;
    }

    function l(e, t, r, n, a) {
        var i = -3 * t + 9 * r - 9 * n + 3 * a,
            o = e * i + 6 * t - 12 * r + 6 * n;
        return e * o - 3 * t + 3 * r;
    }

    function d(e, t, r, n, a, i, o, s, d) {
        null == d && (d = 1), (d = d > 1 ? 1 : d < 0 ? 0 : d);
        for (
            var c = d / 2,
                u = 12,
                p = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
                h = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
                f = 0,
                m = 0; m < u; m++
        ) {
            var g = c * p[m] + c,
                v = l(g, e, r, a, o),
                y = l(g, t, n, i, s),
                b = v * v + y * y;
            f += h[m] * M.sqrt(b);
        }
        return c * f;
    }

    function c(e, t, r, n, a, i, o, s, l) {
        if (!(l < 0 || d(e, t, r, n, a, i, o, s) < l)) {
            var c,
                u = 1,
                p = u / 2,
                h = u - p,
                f = 0.01;
            for (c = d(e, t, r, n, a, i, o, s, h); H(c - l) > f;)(p /= 2), (h += (c < l ? 1 : -1) * p), (c = d(e, t, r, n, a, i, o, s, h));
            return h;
        }
    }

    function u(e, t, r, n, a, i, o, s) {
        if (!(F(e, r) < U(a, o) || U(e, r) > F(a, o) || F(t, n) < U(i, s) || U(t, n) > F(i, s))) {
            var l = (e * n - t * r) * (a - o) - (e - r) * (a * s - i * o),
                d = (e * n - t * r) * (i - s) - (t - n) * (a * s - i * o),
                c = (e - r) * (i - s) - (t - n) * (a - o);
            if (c) {
                var u = l / c,
                    p = d / c,
                    h = +u.toFixed(2),
                    f = +p.toFixed(2);
                if (!(h < +U(e, r).toFixed(2) || h > +F(e, r).toFixed(2) || h < +U(a, o).toFixed(2) || h > +F(a, o).toFixed(2) || f < +U(t, n).toFixed(2) || f > +F(t, n).toFixed(2) || f < +U(i, s).toFixed(2) || f > +F(i, s).toFixed(2)))
                    return { x: u, y: p };
            }
        }
    }

    function p(e, t, n) {
        var a = r.bezierBBox(e),
            i = r.bezierBBox(t);
        if (!r.isBBoxIntersect(a, i)) return n ? 0 : [];
        for (var o = d.apply(0, e), s = d.apply(0, t), l = F(~~(o / 5), 1), c = F(~~(s / 5), 1), p = [], h = [], f = {}, m = n ? 0 : [], g = 0; g < l + 1; g++) {
            var v = r.findDotsAtSegment.apply(r, e.concat(g / l));
            p.push({ x: v.x, y: v.y, t: g / l });
        }
        for (g = 0; g < c + 1; g++)(v = r.findDotsAtSegment.apply(r, t.concat(g / c))), h.push({ x: v.x, y: v.y, t: g / c });
        for (g = 0; g < l; g++)
            for (var y = 0; y < c; y++) {
                var b = p[g],
                    S = p[g + 1],
                    w = h[y],
                    C = h[y + 1],
                    _ = H(S.x - b.x) < 0.001 ? "y" : "x",
                    x = H(C.x - w.x) < 0.001 ? "y" : "x",
                    P = u(b.x, b.y, S.x, S.y, w.x, w.y, C.x, C.y);
                if (P) {
                    if (f[P.x.toFixed(4)] == P.y.toFixed(4)) continue;
                    f[P.x.toFixed(4)] = P.y.toFixed(4);
                    var A = b.t + H((P[_] - b[_]) / (S[_] - b[_])) * (S.t - b.t),
                        $ = w.t + H((P[x] - w[x]) / (C[x] - w[x])) * (C.t - w.t);
                    A >= 0 && A <= 1.001 && $ >= 0 && $ <= 1.001 && (n ? m++ : m.push({ x: P.x, y: P.y, t1: U(A, 1), t2: U($, 1) }));
                }
            }
        return m;
    }

    function h(e, t, n) {
        (e = r._path2curve(e)), (t = r._path2curve(t));
        for (var a, i, o, s, l, d, c, u, h, f, m = n ? 0 : [], g = 0, v = e.length; g < v; g++) {
            var y = e[g];
            if ("M" == y[0])(a = l = y[1]), (i = d = y[2]);
            else {
                "C" == y[0] ? ((h = [a, i].concat(y.slice(1))), (a = h[6]), (i = h[7])) : ((h = [a, i, a, i, l, d, l, d]), (a = l), (i = d));
                for (var b = 0, S = t.length; b < S; b++) {
                    var w = t[b];
                    if ("M" == w[0])(o = c = w[1]), (s = u = w[2]);
                    else {
                        "C" == w[0] ? ((f = [o, s].concat(w.slice(1))), (o = f[6]), (s = f[7])) : ((f = [o, s, o, s, c, u, c, u]), (o = c), (s = u));
                        var C = p(h, f, n);
                        if (n) m += C;
                        else {
                            for (var _ = 0, x = C.length; _ < x; _++)(C[_].segment1 = g), (C[_].segment2 = b), (C[_].bez1 = h), (C[_].bez2 = f);
                            m = m.concat(C);
                        }
                    }
                }
            }
        }
        return m;
    }

    function f(e, t, r, n, a, i) {
        null != e ? ((this.a = +e), (this.b = +t), (this.c = +r), (this.d = +n), (this.e = +a), (this.f = +i)) : ((this.a = 1), (this.b = 0), (this.c = 0), (this.d = 1), (this.e = 0), (this.f = 0));
    }

    function m() {
        return this.x + k + this.y + k + this.width + " × " + this.height;
    }

    function g(e, t, r, n, a, i) {
        function o(e) {
            return ((u * e + c) * e + d) * e;
        }

        function s(e, t) {
            var r = l(e, t);
            return ((f * r + h) * r + p) * r;
        }

        function l(e, t) {
            var r, n, a, i, s, l;
            for (a = e, l = 0; l < 8; l++) {
                if (((i = o(a) - e), H(i) < t)) return a;
                if (((s = (3 * u * a + 2 * c) * a + d), H(s) < 1e-6)) break;
                a -= i / s;
            }
            if (((r = 0), (n = 1), (a = e), a < r)) return r;
            if (a > n) return n;
            for (; r < n;) {
                if (((i = o(a)), H(i - e) < t)) return a;
                e > i ? (r = a) : (n = a), (a = (n - r) / 2 + r);
            }
            return a;
        }
        var d = 3 * t,
            c = 3 * (n - t) - d,
            u = 1 - d - c,
            p = 3 * r,
            h = 3 * (a - r) - p,
            f = 1 - p - h;
        return s(e, 1 / (200 * i));
    }

    function v(e, t) {
        var r = [],
            n = {};
        if (((this.ms = t), (this.times = 1), e)) {
            for (var a in e) e[P](a) && ((n[X(a)] = e[a]), r.push(X(a)));
            r.sort(ue);
        }
        (this.anim = n), (this.top = r[r.length - 1]), (this.percents = r);
    }

    function y(e, n, a, i, o, s) {
        a = X(a);
        var l,
            d,
            c,
            u,
            p,
            h,
            m = e.ms,
            v = {},
            y = {},
            b = {};
        if (i)
            for (w = 0, _ = lt.length; w < _; w++) {
                var S = lt[w];
                if (S.el.id == n.id && S.anim == e) {
                    S.percent != a ? (lt.splice(w, 1), (c = 1)) : (d = S), n.attr(S.totalOrigin);
                    break;
                }
            }
        else i = +y;
        for (var w = 0, _ = e.percents.length; w < _; w++) {
            if (e.percents[w] == a || e.percents[w] > i * e.top) {
                (a = e.percents[w]), (p = e.percents[w - 1] || 0), (m = (m / e.top) * (a - p)), (u = e.percents[w + 1]), (l = e.anim[a]);
                break;
            }
            i && n.attr(e.anim[e.percents[w]]);
        }
        if (l) {
            if (d)(d.initstatus = i), (d.start = new Date() - d.ms * i);
            else {
                for (var x in l)
                    if (l[P](x) && (ne[P](x) || n.paper.customAttributes[P](x)))
                        switch (((v[x] = n.attr(x)), null == v[x] && (v[x] = re[x]), (y[x] = l[x]), ne[x])) {
                            case j:
                                b[x] = (y[x] - v[x]) / m;
                                break;
                            case "colour":
                                v[x] = r.getRGB(v[x]);
                                var A = r.getRGB(y[x]);
                                b[x] = { r: (A.r - v[x].r) / m, g: (A.g - v[x].g) / m, b: (A.b - v[x].b) / m };
                                break;
                            case "path":
                                var $ = Re(v[x], y[x]),
                                    D = $[1];
                                for (v[x] = $[0], b[x] = [], w = 0, _ = v[x].length; w < _; w++) {
                                    b[x][w] = [0];
                                    for (var I = 1, B = v[x][w].length; I < B; I++) b[x][w][I] = (D[w][I] - v[x][w][I]) / m;
                                }
                                break;
                            case "transform":
                                var O = n._,
                                    k = Ue(O[x], y[x]);
                                if (k)
                                    for (v[x] = k.from, y[x] = k.to, b[x] = [], b[x].real = !0, w = 0, _ = v[x].length; w < _; w++)
                                        for (b[x][w] = [v[x][w][0]], I = 1, B = v[x][w].length; I < B; I++) b[x][w][I] = (y[x][w][I] - v[x][w][I]) / m;
                                else {
                                    var R = n.matrix || new f(),
                                        N = {
                                            _: { transform: O.transform },
                                            getBBox: function() {
                                                return n.getBBox(1);
                                            },
                                        };
                                    (v[x] = [R.a, R.b, R.c, R.d, R.e, R.f]),
                                    Me(N, y[x]),
                                        (y[x] = N._.transform),
                                        (b[x] = [(N.matrix.a - R.a) / m, (N.matrix.b - R.b) / m, (N.matrix.c - R.c) / m, (N.matrix.d - R.d) / m, (N.matrix.e - R.e) / m, (N.matrix.f - R.f) / m]);
                                }
                                break;
                            case "csv":
                                var q = L(l[x])[T](C),
                                    M = L(v[x])[T](C);
                                if ("clip-rect" == x)
                                    for (v[x] = M, b[x] = [], w = M.length; w--;) b[x][w] = (q[w] - v[x][w]) / m;
                                y[x] = q;
                                break;
                            default:
                                for (q = [][E](l[x]), M = [][E](v[x]), b[x] = [], w = n.paper.customAttributes[x].length; w--;) b[x][w] = ((q[w] || 0) - (M[w] || 0)) / m;
                        }
                var F = l.easing,
                    U = r.easing_formulas[F];
                if (!U)
                    if (((U = L(F).match(Z)), U && 5 == U.length)) {
                        var H = U;
                        U = function(e) {
                            return g(e, +H[1], +H[2], +H[3], +H[4], m);
                        };
                    } else U = he;
                if (
                    ((h = l.start || e.start || +new Date()),
                        (S = {
                            anim: e,
                            percent: a,
                            timestamp: h,
                            start: h + (e.del || 0),
                            status: 0,
                            initstatus: i || 0,
                            stop: !1,
                            ms: m,
                            easing: U,
                            from: v,
                            diff: b,
                            to: y,
                            el: n,
                            callback: l.callback,
                            prev: p,
                            next: u,
                            repeat: s || e.times,
                            origin: n.attr(),
                            totalOrigin: o,
                        }),
                        lt.push(S),
                        i && !d && !c && ((S.stop = !0), (S.start = new Date() - m * i), 1 == lt.length))
                )
                    return ct();
                c && (S.start = new Date() - S.ms * i), 1 == lt.length && dt(ct);
            }
            t("raphael.anim.start." + n.id, n, e);
        }
    }

    function b(e) {
        for (var t = 0; t < lt.length; t++) lt[t].el.paper == e && lt.splice(t--, 1);
    }
    (r.version = "2.1.2"), (r.eve = t);
    var S,
        w,
        C = /[, ]+/,
        _ = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
        x = /\{(\d+)\}/g,
        P = "hasOwnProperty",
        A = { doc: document, win: e },
        $ = { was: Object.prototype[P].call(A.win, "Raphael"), is: A.win.Raphael },
        D = function() {
            this.ca = this.customAttributes = {};
        },
        I = "apply",
        E = "concat",
        B = "ontouchstart" in A.win || (A.win.DocumentTouch && A.doc instanceof DocumentTouch),
        O = "",
        k = " ",
        L = String,
        T = "split",
        R = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [T](k),
        N = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" },
        q = L.prototype.toLowerCase,
        M = Math,
        F = M.max,
        U = M.min,
        H = M.abs,
        z = M.pow,
        V = M.PI,
        j = "number",
        G = "string",
        W = "array",
        Y = Object.prototype.toString,
        K =
        ((r._ISURL = /^url\(['"]?(.+?)['"]?\)$/i),
            /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
        Q = { NaN: 1, Infinity: 1, "-Infinity": 1 },
        Z = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        J = M.round,
        X = parseFloat,
        ee = parseInt,
        te = L.prototype.toUpperCase,
        re = (r._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0,
        }),
        ne = (r._availableAnimAttrs = {
            blur: j,
            "clip-rect": "csv",
            cx: j,
            cy: j,
            fill: "colour",
            "fill-opacity": j,
            "font-size": j,
            height: j,
            opacity: j,
            path: "path",
            r: j,
            rx: j,
            ry: j,
            stroke: "colour",
            "stroke-opacity": j,
            "stroke-width": j,
            transform: "transform",
            width: j,
            x: j,
            y: j,
        }),
        ae = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        ie = { hs: 1, rg: 1 },
        oe = /,?([achlmqrstvxz]),?/gi,
        se = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        le = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        de = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
        ce =
        ((r._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/), {}),
        ue = function(e, t) {
            return X(e) - X(t);
        },
        pe = function() {},
        he = function(e) {
            return e;
        },
        fe = (r._rectPath = function(e, t, r, n, a) {
            return a ? [
                ["M", e + a, t],
                ["l", r - 2 * a, 0],
                ["a", a, a, 0, 0, 1, a, a],
                ["l", 0, n - 2 * a],
                ["a", a, a, 0, 0, 1, -a, a],
                ["l", 2 * a - r, 0],
                ["a", a, a, 0, 0, 1, -a, -a],
                ["l", 0, 2 * a - n],
                ["a", a, a, 0, 0, 1, a, -a],
                ["z"],
            ] : [
                ["M", e, t],
                ["l", r, 0],
                ["l", 0, n],
                ["l", -r, 0],
                ["z"]
            ];
        }),
        me = function(e, t, r, n) {
            return null == n && (n = r), [
                ["M", e, t],
                ["m", 0, -n],
                ["a", r, n, 0, 1, 1, 0, 2 * n],
                ["a", r, n, 0, 1, 1, 0, -2 * n],
                ["z"]
            ];
        },
        ge = (r._getPath = {
            path: function(e) {
                return e.attr("path");
            },
            circle: function(e) {
                var t = e.attrs;
                return me(t.cx, t.cy, t.r);
            },
            ellipse: function(e) {
                var t = e.attrs;
                return me(t.cx, t.cy, t.rx, t.ry);
            },
            rect: function(e) {
                var t = e.attrs;
                return fe(t.x, t.y, t.width, t.height, t.r);
            },
            image: function(e) {
                var t = e.attrs;
                return fe(t.x, t.y, t.width, t.height);
            },
            text: function(e) {
                var t = e._getBBox();
                return fe(t.x, t.y, t.width, t.height);
            },
            set: function(e) {
                var t = e._getBBox();
                return fe(t.x, t.y, t.width, t.height);
            },
        }),
        ve = (r.mapPath = function(e, t) {
            if (!t) return e;
            var r, n, a, i, o, s, l;
            for (e = Re(e), a = 0, o = e.length; a < o; a++)
                for (l = e[a], i = 1, s = l.length; i < s; i += 2)(r = t.x(l[i], l[i + 1])), (n = t.y(l[i], l[i + 1])), (l[i] = r), (l[i + 1] = n);
            return e;
        });
    if (((r._g = A), (r.type = A.win.SVGAngle || A.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML"), "VML" == r.type)) {
        var ye,
            be = A.doc.createElement("div");
        if (((be.innerHTML = '<v:shape adj="1"/>'), (ye = be.firstChild), (ye.style.behavior = "url(#default#VML)"), !ye || "object" != typeof ye.adj)) return (r.type = O);
        be = null;
    }
    (r.svg = !(r.vml = "VML" == r.type)),
    (r._Paper = D),
    (r.fn = w = D.prototype = r.prototype),
    (r._id = 0),
    (r._oid = 0),
    (r.is = function(e, t) {
        return (
            (t = q.call(t)),
            "finite" == t ?
            !Q[P](+e) :
            "array" == t ?
            e instanceof Array :
            ("null" == t && null === e) || (t == typeof e && null !== e) || ("object" == t && e === Object(e)) || ("array" == t && Array.isArray && Array.isArray(e)) || Y.call(e).slice(8, -1).toLowerCase() == t
        );
    }),
    (r.angle = function(e, t, n, a, i, o) {
        if (null == i) {
            var s = e - n,
                l = t - a;
            return s || l ? (180 + (180 * M.atan2(-l, -s)) / V + 360) % 360 : 0;
        }
        return r.angle(e, t, i, o) - r.angle(n, a, i, o);
    }),
    (r.rad = function(e) {
        return ((e % 360) * V) / 180;
    }),
    (r.deg = function(e) {
        return ((180 * e) / V) % 360;
    }),
    (r.snapTo = function(e, t, n) {
        if (((n = r.is(n, "finite") ? n : 10), r.is(e, W))) {
            for (var a = e.length; a--;)
                if (H(e[a] - t) <= n) return e[a];
        } else {
            e = +e;
            var i = t % e;
            if (i < n) return t - i;
            if (i > e - n) return t - i + e;
        }
        return t;
    });
    r.createUUID = (function(e, t) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(e, t).toUpperCase();
        };
    })(/[xy]/g, function(e) {
        var t = (16 * M.random()) | 0,
            r = "x" == e ? t : (3 & t) | 8;
        return r.toString(16);
    });
    r.setWindow = function(e) {
        t("raphael.setWindow", r, A.win, e), (A.win = e), (A.doc = A.win.document), r._engine.initWin && r._engine.initWin(A.win);
    };
    var Se = function(e) {
            if (r.vml) {
                var t,
                    n = /^\s+|\s+$/g;
                try {
                    var a = new ActiveXObject("htmlfile");
                    a.write("<body>"), a.close(), (t = a.body);
                } catch (o) {
                    t = createPopup().document.body;
                }
                var s = t.createTextRange();
                Se = i(function(e) {
                    try {
                        t.style.color = L(e).replace(n, O);
                        var r = s.queryCommandValue("ForeColor");
                        return (r = ((255 & r) << 16) | (65280 & r) | ((16711680 & r) >>> 16)), "#" + ("000000" + r.toString(16)).slice(-6);
                    } catch (a) {
                        return "none";
                    }
                });
            } else {
                var l = A.doc.createElement("i");
                (l.title = "Raphaël Colour Picker"),
                (l.style.display = "none"),
                A.doc.body.appendChild(l),
                    (Se = i(function(e) {
                        return (l.style.color = e), A.doc.defaultView.getComputedStyle(l, O).getPropertyValue("color");
                    }));
            }
            return Se(e);
        },
        we = function() {
            return "hsb(" + [this.h, this.s, this.b] + ")";
        },
        Ce = function() {
            return "hsl(" + [this.h, this.s, this.l] + ")";
        },
        _e = function() {
            return this.hex;
        },
        xe = function(e, t, n) {
            if ((null == t && r.is(e, "object") && "r" in e && "g" in e && "b" in e && ((n = e.b), (t = e.g), (e = e.r)), null == t && r.is(e, G))) {
                var a = r.getRGB(e);
                (e = a.r), (t = a.g), (n = a.b);
            }
            return (e > 1 || t > 1 || n > 1) && ((e /= 255), (t /= 255), (n /= 255)), [e, t, n];
        },
        Pe = function(e, t, n, a) {
            (e *= 255), (t *= 255), (n *= 255);
            var i = { r: e, g: t, b: n, hex: r.rgb(e, t, n), toString: _e };
            return r.is(a, "finite") && (i.opacity = a), i;
        };
    (r.color = function(e) {
        var t;
        return (
            r.is(e, "object") && "h" in e && "s" in e && "b" in e ?
            ((t = r.hsb2rgb(e)), (e.r = t.r), (e.g = t.g), (e.b = t.b), (e.hex = t.hex)) :
            r.is(e, "object") && "h" in e && "s" in e && "l" in e ?
            ((t = r.hsl2rgb(e)), (e.r = t.r), (e.g = t.g), (e.b = t.b), (e.hex = t.hex)) :
            (r.is(e, "string") && (e = r.getRGB(e)),
                r.is(e, "object") && "r" in e && "g" in e && "b" in e ?
                ((t = r.rgb2hsl(e)), (e.h = t.h), (e.s = t.s), (e.l = t.l), (t = r.rgb2hsb(e)), (e.v = t.b)) :
                ((e = { hex: "none" }), (e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1))),
            (e.toString = _e),
            e
        );
    }),
    (r.hsb2rgb = function(e, t, r, n) {
        this.is(e, "object") && "h" in e && "s" in e && "b" in e && ((r = e.b), (t = e.s), (n = e.o), (e = e.h)), (e *= 360);
        var a, i, o, s, l;
        return (e = (e % 360) / 60), (l = r * t), (s = l * (1 - H((e % 2) - 1))), (a = i = o = r - l), (e = ~~e), (a += [l, s, 0, 0, s, l][e]), (i += [s, l, l, s, 0, 0][e]), (o += [0, 0, s, l, l, s][e]), Pe(a, i, o, n);
    }),
    (r.hsl2rgb = function(e, t, r, n) {
        this.is(e, "object") && "h" in e && "s" in e && "l" in e && ((r = e.l), (t = e.s), (e = e.h)), (e > 1 || t > 1 || r > 1) && ((e /= 360), (t /= 100), (r /= 100)), (e *= 360);
        var a, i, o, s, l;
        return (
            (e = (e % 360) / 60),
            (l = 2 * t * (r < 0.5 ? r : 1 - r)),
            (s = l * (1 - H((e % 2) - 1))),
            (a = i = o = r - l / 2),
            (e = ~~e),
            (a += [l, s, 0, 0, s, l][e]),
            (i += [s, l, l, s, 0, 0][e]),
            (o += [0, 0, s, l, l, s][e]),
            Pe(a, i, o, n)
        );
    }),
    (r.rgb2hsb = function(e, t, r) {
        (r = xe(e, t, r)), (e = r[0]), (t = r[1]), (r = r[2]);
        var n, a, i, o;
        return (
            (i = F(e, t, r)),
            (o = i - U(e, t, r)),
            (n = 0 == o ? null : i == e ? (t - r) / o : i == t ? (r - e) / o + 2 : (e - t) / o + 4),
            (n = (((n + 360) % 6) * 60) / 360),
            (a = 0 == o ? 0 : o / i), { h: n, s: a, b: i, toString: we }
        );
    }),
    (r.rgb2hsl = function(e, t, r) {
        (r = xe(e, t, r)), (e = r[0]), (t = r[1]), (r = r[2]);
        var n, a, i, o, s, l;
        return (
            (o = F(e, t, r)),
            (s = U(e, t, r)),
            (l = o - s),
            (n = 0 == l ? null : o == e ? (t - r) / l : o == t ? (r - e) / l + 2 : (e - t) / l + 4),
            (n = (((n + 360) % 6) * 60) / 360),
            (i = (o + s) / 2),
            (a = 0 == l ? 0 : i < 0.5 ? l / (2 * i) : l / (2 - 2 * i)), { h: n, s: a, l: i, toString: Ce }
        );
    }),
    (r._path2string = function() {
        return this.join(",").replace(oe, "$1");
    });
    r._preload = function(e, t) {
        var r = A.doc.createElement("img");
        (r.style.cssText = "position:absolute;left:-9999em;top:-9999em"),
        (r.onload = function() {
            t.call(this), (this.onload = null), A.doc.body.removeChild(this);
        }),
        (r.onerror = function() {
            A.doc.body.removeChild(this);
        }),
        A.doc.body.appendChild(r),
            (r.src = e);
    };
    (r.getRGB = i(function(e) {
        if (!e || (e = L(e)).indexOf("-") + 1) return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: o };
        if ("none" == e) return { r: -1, g: -1, b: -1, hex: "none", toString: o };
        !(ie[P](e.toLowerCase().substring(0, 2)) || "#" == e.charAt()) && (e = Se(e));
        var t,
            n,
            a,
            i,
            s,
            l,
            d = e.match(K);
        return d ?
            (d[2] && ((a = ee(d[2].substring(5), 16)), (n = ee(d[2].substring(3, 5), 16)), (t = ee(d[2].substring(1, 3), 16))),
                d[3] && ((a = ee((s = d[3].charAt(3)) + s, 16)), (n = ee((s = d[3].charAt(2)) + s, 16)), (t = ee((s = d[3].charAt(1)) + s, 16))),
                d[4] &&
                ((l = d[4][T](ae)),
                    (t = X(l[0])),
                    "%" == l[0].slice(-1) && (t *= 2.55),
                    (n = X(l[1])),
                    "%" == l[1].slice(-1) && (n *= 2.55),
                    (a = X(l[2])),
                    "%" == l[2].slice(-1) && (a *= 2.55),
                    "rgba" == d[1].toLowerCase().slice(0, 4) && (i = X(l[3])),
                    l[3] && "%" == l[3].slice(-1) && (i /= 100)),
                d[5] ?
                ((l = d[5][T](ae)),
                    (t = X(l[0])),
                    "%" == l[0].slice(-1) && (t *= 2.55),
                    (n = X(l[1])),
                    "%" == l[1].slice(-1) && (n *= 2.55),
                    (a = X(l[2])),
                    "%" == l[2].slice(-1) && (a *= 2.55),
                    ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (t /= 360),
                    "hsba" == d[1].toLowerCase().slice(0, 4) && (i = X(l[3])),
                    l[3] && "%" == l[3].slice(-1) && (i /= 100),
                    r.hsb2rgb(t, n, a, i)) :
                d[6] ?
                ((l = d[6][T](ae)),
                    (t = X(l[0])),
                    "%" == l[0].slice(-1) && (t *= 2.55),
                    (n = X(l[1])),
                    "%" == l[1].slice(-1) && (n *= 2.55),
                    (a = X(l[2])),
                    "%" == l[2].slice(-1) && (a *= 2.55),
                    ("deg" == l[0].slice(-3) || "°" == l[0].slice(-1)) && (t /= 360),
                    "hsla" == d[1].toLowerCase().slice(0, 4) && (i = X(l[3])),
                    l[3] && "%" == l[3].slice(-1) && (i /= 100),
                    r.hsl2rgb(t, n, a, i)) :
                ((d = { r: t, g: n, b: a, toString: o }), (d.hex = "#" + (16777216 | a | (n << 8) | (t << 16)).toString(16).slice(1)), r.is(i, "finite") && (d.opacity = i), d)) : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: o };
    }, r)),
    (r.hsb = i(function(e, t, n) {
        return r.hsb2rgb(e, t, n).hex;
    })),
    (r.hsl = i(function(e, t, n) {
        return r.hsl2rgb(e, t, n).hex;
    })),
    (r.rgb = i(function(e, t, r) {
        return "#" + (16777216 | r | (t << 8) | (e << 16)).toString(16).slice(1);
    })),
    (r.getColor = function(e) {
        var t = (this.getColor.start = this.getColor.start || { h: 0, s: 1, b: e || 0.75 }),
            r = this.hsb2rgb(t.h, t.s, t.b);
        return (t.h += 0.075), t.h > 1 && ((t.h = 0), (t.s -= 0.2), t.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: t.b })), r.hex;
    }),
    (r.getColor.reset = function() {
        delete this.start;
    }),
    (r.parsePathString = function(e) {
        if (!e) return null;
        var t = Ae(e);
        if (t.arr) return De(t.arr);
        var n = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 },
            a = [];
        return (
            r.is(e, W) && r.is(e[0], W) && (a = De(e)),
            a.length ||
            L(e).replace(se, function(e, t, r) {
                var i = [],
                    o = t.toLowerCase();
                if (
                    (r.replace(de, function(e, t) {
                            t && i.push(+t);
                        }),
                        "m" == o && i.length > 2 && (a.push([t][E](i.splice(0, 2))), (o = "l"), (t = "m" == t ? "l" : "L")),
                        "r" == o)
                )
                    a.push([t][E](i));
                else
                    for (; i.length >= n[o] && (a.push([t][E](i.splice(0, n[o]))), n[o]););
            }),
            (a.toString = r._path2string),
            (t.arr = De(a)),
            a
        );
    }),
    (r.parseTransformString = i(function(e) {
        if (!e) return null;
        var t = [];
        return (
            r.is(e, W) && r.is(e[0], W) && (t = De(e)),
            t.length ||
            L(e).replace(le, function(e, r, n) {
                var a = [];
                q.call(r);
                n.replace(de, function(e, t) {
                        t && a.push(+t);
                    }),
                    t.push([r][E](a));
            }),
            (t.toString = r._path2string),
            t
        );
    }));
    var Ae = function(e) {
        var t = (Ae.ps = Ae.ps || {});
        return (
            t[e] ? (t[e].sleep = 100) : (t[e] = { sleep: 100 }),
            setTimeout(function() {
                for (var r in t) t[P](r) && r != e && (t[r].sleep--, !t[r].sleep && delete t[r]);
            }),
            t[e]
        );
    };
    (r.findDotsAtSegment = function(e, t, r, n, a, i, o, s, l) {
        var d = 1 - l,
            c = z(d, 3),
            u = z(d, 2),
            p = l * l,
            h = p * l,
            f = c * e + 3 * u * l * r + 3 * d * l * l * a + h * o,
            m = c * t + 3 * u * l * n + 3 * d * l * l * i + h * s,
            g = e + 2 * l * (r - e) + p * (a - 2 * r + e),
            v = t + 2 * l * (n - t) + p * (i - 2 * n + t),
            y = r + 2 * l * (a - r) + p * (o - 2 * a + r),
            b = n + 2 * l * (i - n) + p * (s - 2 * i + n),
            S = d * e + l * r,
            w = d * t + l * n,
            C = d * a + l * o,
            _ = d * i + l * s,
            x = 90 - (180 * M.atan2(g - y, v - b)) / V;
        return (g > y || v < b) && (x += 180), { x: f, y: m, m: { x: g, y: v }, n: { x: y, y: b }, start: { x: S, y: w }, end: { x: C, y: _ }, alpha: x };
    }),
    (r.bezierBBox = function(e, t, n, a, i, o, s, l) {
        r.is(e, "array") || (e = [e, t, n, a, i, o, s, l]);
        var d = Te.apply(null, e);
        return { x: d.min.x, y: d.min.y, x2: d.max.x, y2: d.max.y, width: d.max.x - d.min.x, height: d.max.y - d.min.y };
    }),
    (r.isPointInsideBBox = function(e, t, r) {
        return t >= e.x && t <= e.x2 && r >= e.y && r <= e.y2;
    }),
    (r.isBBoxIntersect = function(e, t) {
        var n = r.isPointInsideBBox;
        return (
            n(t, e.x, e.y) ||
            n(t, e.x2, e.y) ||
            n(t, e.x, e.y2) ||
            n(t, e.x2, e.y2) ||
            n(e, t.x, t.y) ||
            n(e, t.x2, t.y) ||
            n(e, t.x, t.y2) ||
            n(e, t.x2, t.y2) ||
            (((e.x < t.x2 && e.x > t.x) || (t.x < e.x2 && t.x > e.x)) && ((e.y < t.y2 && e.y > t.y) || (t.y < e.y2 && t.y > e.y)))
        );
    }),
    (r.pathIntersection = function(e, t) {
        return h(e, t);
    }),
    (r.pathIntersectionNumber = function(e, t) {
        return h(e, t, 1);
    }),
    (r.isPointInsidePath = function(e, t, n) {
        var a = r.pathBBox(e);
        return (
            r.isPointInsideBBox(a, t, n) &&
            h(
                e, [
                    ["M", t, n],
                    ["H", a.x2 + 10],
                ],
                1
            ) %
            2 ==
            1
        );
    }),
    (r._removedFactory = function(e) {
        return function() {
            t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e);
        };
    });
    var $e = (r.pathBBox = function(e) {
            var t = Ae(e);
            if (t.bbox) return n(t.bbox);
            if (!e) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };
            e = Re(e);
            for (var r, a = 0, i = 0, o = [], s = [], l = 0, d = e.length; l < d; l++)
                if (((r = e[l]), "M" == r[0]))(a = r[1]), (i = r[2]), o.push(a), s.push(i);
                else {
                    var c = Te(a, i, r[1], r[2], r[3], r[4], r[5], r[6]);
                    (o = o[E](c.min.x, c.max.x)), (s = s[E](c.min.y, c.max.y)), (a = r[5]), (i = r[6]);
                }
            var u = U[I](0, o),
                p = U[I](0, s),
                h = F[I](0, o),
                f = F[I](0, s),
                m = h - u,
                g = f - p,
                v = { x: u, y: p, x2: h, y2: f, width: m, height: g, cx: u + m / 2, cy: p + g / 2 };
            return (t.bbox = n(v)), v;
        }),
        De = function(e) {
            var t = n(e);
            return (t.toString = r._path2string), t;
        },
        Ie = (r._pathToRelative = function(e) {
            var t = Ae(e);
            if (t.rel) return De(t.rel);
            (r.is(e, W) && r.is(e && e[0], W)) || (e = r.parsePathString(e));
            var n = [],
                a = 0,
                i = 0,
                o = 0,
                s = 0,
                l = 0;
            "M" == e[0][0] && ((a = e[0][1]), (i = e[0][2]), (o = a), (s = i), l++, n.push(["M", a, i]));
            for (var d = l, c = e.length; d < c; d++) {
                var u = (n[d] = []),
                    p = e[d];
                if (p[0] != q.call(p[0]))
                    switch (((u[0] = q.call(p[0])), u[0])) {
                        case "a":
                            (u[1] = p[1]), (u[2] = p[2]), (u[3] = p[3]), (u[4] = p[4]), (u[5] = p[5]), (u[6] = +(p[6] - a).toFixed(3)), (u[7] = +(p[7] - i).toFixed(3));
                            break;
                        case "v":
                            u[1] = +(p[1] - i).toFixed(3);
                            break;
                        case "m":
                            (o = p[1]), (s = p[2]);
                        default:
                            for (var h = 1, f = p.length; h < f; h++) u[h] = +(p[h] - (h % 2 ? a : i)).toFixed(3);
                    }
                else {
                    (u = n[d] = []), "m" == p[0] && ((o = p[1] + a), (s = p[2] + i));
                    for (var m = 0, g = p.length; m < g; m++) n[d][m] = p[m];
                }
                var v = n[d].length;
                switch (n[d][0]) {
                    case "z":
                        (a = o), (i = s);
                        break;
                    case "h":
                        a += +n[d][v - 1];
                        break;
                    case "v":
                        i += +n[d][v - 1];
                        break;
                    default:
                        (a += +n[d][v - 2]), (i += +n[d][v - 1]);
                }
            }
            return (n.toString = r._path2string), (t.rel = De(n)), n;
        }),
        Ee = (r._pathToAbsolute = function(e) {
            var t = Ae(e);
            if (t.abs) return De(t.abs);
            if (((r.is(e, W) && r.is(e && e[0], W)) || (e = r.parsePathString(e)), !e || !e.length)) return [
                ["M", 0, 0]
            ];
            var n = [],
                a = 0,
                i = 0,
                o = 0,
                l = 0,
                d = 0;
            "M" == e[0][0] && ((a = +e[0][1]), (i = +e[0][2]), (o = a), (l = i), d++, (n[0] = ["M", a, i]));
            for (var c, u, p = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), h = d, f = e.length; h < f; h++) {
                if ((n.push((c = [])), (u = e[h]), u[0] != te.call(u[0])))
                    switch (((c[0] = te.call(u[0])), c[0])) {
                        case "A":
                            (c[1] = u[1]), (c[2] = u[2]), (c[3] = u[3]), (c[4] = u[4]), (c[5] = u[5]), (c[6] = +(u[6] + a)), (c[7] = +(u[7] + i));
                            break;
                        case "V":
                            c[1] = +u[1] + i;
                            break;
                        case "H":
                            c[1] = +u[1] + a;
                            break;
                        case "R":
                            for (var m = [a, i][E](u.slice(1)), g = 2, v = m.length; g < v; g++)(m[g] = +m[g] + a), (m[++g] = +m[g] + i);
                            n.pop(), (n = n[E](s(m, p)));
                            break;
                        case "M":
                            (o = +u[1] + a), (l = +u[2] + i);
                        default:
                            for (g = 1, v = u.length; g < v; g++) c[g] = +u[g] + (g % 2 ? a : i);
                    }
                else if ("R" == u[0])(m = [a, i][E](u.slice(1))), n.pop(), (n = n[E](s(m, p))), (c = ["R"][E](u.slice(-2)));
                else
                    for (var y = 0, b = u.length; y < b; y++) c[y] = u[y];
                switch (c[0]) {
                    case "Z":
                        (a = o), (i = l);
                        break;
                    case "H":
                        a = c[1];
                        break;
                    case "V":
                        i = c[1];
                        break;
                    case "M":
                        (o = c[c.length - 2]), (l = c[c.length - 1]);
                    default:
                        (a = c[c.length - 2]), (i = c[c.length - 1]);
                }
            }
            return (n.toString = r._path2string), (t.abs = De(n)), n;
        }),
        Be = function(e, t, r, n) {
            return [e, t, r, n, r, n];
        },
        Oe = function(e, t, r, n, a, i) {
            var o = 1 / 3,
                s = 2 / 3;
            return [o * e + s * r, o * t + s * n, o * a + s * r, o * i + s * n, a, i];
        },
        ke = function(e, t, r, n, a, o, s, l, d, c) {
            var u,
                p = (120 * V) / 180,
                h = (V / 180) * (+a || 0),
                f = [],
                m = i(function(e, t, r) {
                    var n = e * M.cos(r) - t * M.sin(r),
                        a = e * M.sin(r) + t * M.cos(r);
                    return { x: n, y: a };
                });
            if (c)(x = c[0]), (P = c[1]), (C = c[2]), (_ = c[3]);
            else {
                (u = m(e, t, -h)), (e = u.x), (t = u.y), (u = m(l, d, -h)), (l = u.x), (d = u.y);
                var g = (M.cos((V / 180) * a), M.sin((V / 180) * a), (e - l) / 2),
                    v = (t - d) / 2,
                    y = (g * g) / (r * r) + (v * v) / (n * n);
                y > 1 && ((y = M.sqrt(y)), (r = y * r), (n = y * n));
                var b = r * r,
                    S = n * n,
                    w = (o == s ? -1 : 1) * M.sqrt(H((b * S - b * v * v - S * g * g) / (b * v * v + S * g * g))),
                    C = (w * r * v) / n + (e + l) / 2,
                    _ = (w * -n * g) / r + (t + d) / 2,
                    x = M.asin(((t - _) / n).toFixed(9)),
                    P = M.asin(((d - _) / n).toFixed(9));
                (x = e < C ? V - x : x), (P = l < C ? V - P : P), x < 0 && (x = 2 * V + x), P < 0 && (P = 2 * V + P), s && x > P && (x -= 2 * V), !s && P > x && (P -= 2 * V);
            }
            var A = P - x;
            if (H(A) > p) {
                var $ = P,
                    D = l,
                    I = d;
                (P = x + p * (s && P > x ? 1 : -1)), (l = C + r * M.cos(P)), (d = _ + n * M.sin(P)), (f = ke(l, d, r, n, a, 0, s, D, I, [P, $, C, _]));
            }
            A = P - x;
            var B = M.cos(x),
                O = M.sin(x),
                k = M.cos(P),
                L = M.sin(P),
                R = M.tan(A / 4),
                N = (4 / 3) * r * R,
                q = (4 / 3) * n * R,
                F = [e, t],
                U = [e + N * O, t - q * B],
                z = [l + N * L, d - q * k],
                j = [l, d];
            if (((U[0] = 2 * F[0] - U[0]), (U[1] = 2 * F[1] - U[1]), c)) return [U, z, j][E](f);
            f = [U, z, j][E](f).join()[T](",");
            for (var G = [], W = 0, Y = f.length; W < Y; W++) G[W] = W % 2 ? m(f[W - 1], f[W], h).y : m(f[W], f[W + 1], h).x;
            return G;
        },
        Le = function(e, t, r, n, a, i, o, s, l) {
            var d = 1 - l;
            return { x: z(d, 3) * e + 3 * z(d, 2) * l * r + 3 * d * l * l * a + z(l, 3) * o, y: z(d, 3) * t + 3 * z(d, 2) * l * n + 3 * d * l * l * i + z(l, 3) * s };
        },
        Te = i(function(e, t, r, n, a, i, o, s) {
            var l,
                d = a - 2 * r + e - (o - 2 * a + r),
                c = 2 * (r - e) - 2 * (a - r),
                u = e - r,
                p = (-c + M.sqrt(c * c - 4 * d * u)) / 2 / d,
                h = (-c - M.sqrt(c * c - 4 * d * u)) / 2 / d,
                f = [t, s],
                m = [e, o];
            return (
                H(p) > "1e12" && (p = 0.5),
                H(h) > "1e12" && (h = 0.5),
                p > 0 && p < 1 && ((l = Le(e, t, r, n, a, i, o, s, p)), m.push(l.x), f.push(l.y)),
                h > 0 && h < 1 && ((l = Le(e, t, r, n, a, i, o, s, h)), m.push(l.x), f.push(l.y)),
                (d = i - 2 * n + t - (s - 2 * i + n)),
                (c = 2 * (n - t) - 2 * (i - n)),
                (u = t - n),
                (p = (-c + M.sqrt(c * c - 4 * d * u)) / 2 / d),
                (h = (-c - M.sqrt(c * c - 4 * d * u)) / 2 / d),
                H(p) > "1e12" && (p = 0.5),
                H(h) > "1e12" && (h = 0.5),
                p > 0 && p < 1 && ((l = Le(e, t, r, n, a, i, o, s, p)), m.push(l.x), f.push(l.y)),
                h > 0 && h < 1 && ((l = Le(e, t, r, n, a, i, o, s, h)), m.push(l.x), f.push(l.y)), { min: { x: U[I](0, m), y: U[I](0, f) }, max: { x: F[I](0, m), y: F[I](0, f) } }
            );
        }),
        Re = (r._path2curve = i(
            function(e, t) {
                var r = !t && Ae(e);
                if (!t && r.curve) return De(r.curve);
                for (
                    var n = Ee(e),
                        a = t && Ee(t),
                        i = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                        o = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                        s = function(e, t, r) {
                            var n,
                                a,
                                i = { T: 1, Q: 1 };
                            if (!e) return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
                            switch ((!(e[0] in i) && (t.qx = t.qy = null), e[0])) {
                                case "M":
                                    (t.X = e[1]), (t.Y = e[2]);
                                    break;
                                case "A":
                                    e = ["C"][E](ke[I](0, [t.x, t.y][E](e.slice(1))));
                                    break;
                                case "S":
                                    "C" == r || "S" == r ? ((n = 2 * t.x - t.bx), (a = 2 * t.y - t.by)) : ((n = t.x), (a = t.y)), (e = ["C", n, a][E](e.slice(1)));
                                    break;
                                case "T":
                                    "Q" == r || "T" == r ? ((t.qx = 2 * t.x - t.qx), (t.qy = 2 * t.y - t.qy)) : ((t.qx = t.x), (t.qy = t.y)), (e = ["C"][E](Oe(t.x, t.y, t.qx, t.qy, e[1], e[2])));
                                    break;
                                case "Q":
                                    (t.qx = e[1]), (t.qy = e[2]), (e = ["C"][E](Oe(t.x, t.y, e[1], e[2], e[3], e[4])));
                                    break;
                                case "L":
                                    e = ["C"][E](Be(t.x, t.y, e[1], e[2]));
                                    break;
                                case "H":
                                    e = ["C"][E](Be(t.x, t.y, e[1], t.y));
                                    break;
                                case "V":
                                    e = ["C"][E](Be(t.x, t.y, t.x, e[1]));
                                    break;
                                case "Z":
                                    e = ["C"][E](Be(t.x, t.y, t.X, t.Y));
                            }
                            return e;
                        },
                        l = function(e, t) {
                            if (e[t].length > 7) {
                                e[t].shift();
                                for (var r = e[t]; r.length;)(c[t] = "A"), a && (u[t] = "A"), e.splice(t++, 0, ["C"][E](r.splice(0, 6)));
                                e.splice(t, 1), (m = F(n.length, (a && a.length) || 0));
                            }
                        },
                        d = function(e, t, r, i, o) {
                            e && t && "M" == e[o][0] && "M" != t[o][0] && (t.splice(o, 0, ["M", i.x, i.y]), (r.bx = 0), (r.by = 0), (r.x = e[o][1]), (r.y = e[o][2]), (m = F(n.length, (a && a.length) || 0)));
                        },
                        c = [],
                        u = [],
                        p = "",
                        h = "",
                        f = 0,
                        m = F(n.length, (a && a.length) || 0); f < m; f++
                ) {
                    n[f] && (p = n[f][0]),
                        "C" != p && ((c[f] = p), f && (h = c[f - 1])),
                        (n[f] = s(n[f], i, h)),
                        "A" != c[f] && "C" == p && (c[f] = "C"),
                        l(n, f),
                        a && (a[f] && (p = a[f][0]), "C" != p && ((u[f] = p), f && (h = u[f - 1])), (a[f] = s(a[f], o, h)), "A" != u[f] && "C" == p && (u[f] = "C"), l(a, f)),
                        d(n, a, i, o, f),
                        d(a, n, o, i, f);
                    var g = n[f],
                        v = a && a[f],
                        y = g.length,
                        b = a && v.length;
                    (i.x = g[y - 2]), (i.y = g[y - 1]), (i.bx = X(g[y - 4]) || i.x), (i.by = X(g[y - 3]) || i.y), (o.bx = a && (X(v[b - 4]) || o.x)), (o.by = a && (X(v[b - 3]) || o.y)), (o.x = a && v[b - 2]), (o.y = a && v[b - 1]);
                }
                return a || (r.curve = De(n)), a ? [n, a] : n;
            },
            null,
            De
        )),
        Ne =
        ((r._parseDots = i(function(e) {
                for (var t = [], n = 0, a = e.length; n < a; n++) {
                    var i = {},
                        o = e[n].match(/^([^:]*):?([\d\.]*)/);
                    if (((i.color = r.getRGB(o[1])), i.color.error)) return null;
                    (i.color = i.color.hex), o[2] && (i.offset = o[2] + "%"), t.push(i);
                }
                for (n = 1, a = t.length - 1; n < a; n++)
                    if (!t[n].offset) {
                        for (var s = X(t[n - 1].offset || 0), l = 0, d = n + 1; d < a; d++)
                            if (t[d].offset) {
                                l = t[d].offset;
                                break;
                            }
                        l || ((l = 100), (d = a)), (l = X(l));
                        for (var c = (l - s) / (d - n + 1); n < d; n++)(s += c), (t[n].offset = s + "%");
                    }
                return t;
            })),
            (r._tear = function(e, t) {
                e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next);
            })),
        qe =
        ((r._tofront = function(e, t) {
                t.top !== e && (Ne(e, t), (e.next = null), (e.prev = t.top), (t.top.next = e), (t.top = e));
            }),
            (r._toback = function(e, t) {
                t.bottom !== e && (Ne(e, t), (e.next = t.bottom), (e.prev = null), (t.bottom.prev = e), (t.bottom = e));
            }),
            (r._insertafter = function(e, t, r) {
                Ne(e, r), t == r.top && (r.top = e), t.next && (t.next.prev = e), (e.next = t.next), (e.prev = t), (t.next = e);
            }),
            (r._insertbefore = function(e, t, r) {
                Ne(e, r), t == r.bottom && (r.bottom = e), t.prev && (t.prev.next = e), (e.prev = t.prev), (t.prev = e), (e.next = t);
            }),
            (r.toMatrix = function(e, t) {
                var r = $e(e),
                    n = {
                        _: { transform: O },
                        getBBox: function() {
                            return r;
                        },
                    };
                return Me(n, t), n.matrix;
            })),
        Me =
        ((r.transformPath = function(e, t) {
                return ve(e, qe(e, t));
            }),
            (r._extractTransform = function(e, t) {
                if (null == t) return e._.transform;
                t = L(t).replace(/\.{3}|\u2026/g, e._.transform || O);
                var n = r.parseTransformString(t),
                    a = 0,
                    i = 0,
                    o = 0,
                    s = 1,
                    l = 1,
                    d = e._,
                    c = new f();
                if (((d.transform = n || []), n))
                    for (var u = 0, p = n.length; u < p; u++) {
                        var h,
                            m,
                            g,
                            v,
                            y,
                            b = n[u],
                            S = b.length,
                            w = L(b[0]).toLowerCase(),
                            C = b[0] != w,
                            _ = C ? c.invert() : 0;
                        "t" == w && 3 == S ?
                            C ?
                            ((h = _.x(0, 0)), (m = _.y(0, 0)), (g = _.x(b[1], b[2])), (v = _.y(b[1], b[2])), c.translate(g - h, v - m)) :
                            c.translate(b[1], b[2]) :
                            "r" == w ?
                            2 == S ?
                            ((y = y || e.getBBox(1)), c.rotate(b[1], y.x + y.width / 2, y.y + y.height / 2), (a += b[1])) :
                            4 == S && (C ? ((g = _.x(b[2], b[3])), (v = _.y(b[2], b[3])), c.rotate(b[1], g, v)) : c.rotate(b[1], b[2], b[3]), (a += b[1])) :
                            "s" == w ?
                            2 == S || 3 == S ?
                            ((y = y || e.getBBox(1)), c.scale(b[1], b[S - 1], y.x + y.width / 2, y.y + y.height / 2), (s *= b[1]), (l *= b[S - 1])) :
                            5 == S && (C ? ((g = _.x(b[3], b[4])), (v = _.y(b[3], b[4])), c.scale(b[1], b[2], g, v)) : c.scale(b[1], b[2], b[3], b[4]), (s *= b[1]), (l *= b[2])) :
                            "m" == w && 7 == S && c.add(b[1], b[2], b[3], b[4], b[5], b[6]),
                            (d.dirtyT = 1),
                            (e.matrix = c);
                    }
                    (e.matrix = c), (d.sx = s), (d.sy = l), (d.deg = a), (d.dx = i = c.e), (d.dy = o = c.f), 1 == s && 1 == l && !a && d.bbox ? ((d.bbox.x += +i), (d.bbox.y += +o)) : (d.dirtyT = 1);
            })),
        Fe = function(e) {
            var t = e[0];
            switch (t.toLowerCase()) {
                case "t":
                    return [t, 0, 0];
                case "m":
                    return [t, 1, 0, 0, 1, 0, 0];
                case "r":
                    return 4 == e.length ? [t, 0, e[2], e[3]] : [t, 0];
                case "s":
                    return 5 == e.length ? [t, 1, 1, e[3], e[4]] : 3 == e.length ? [t, 1, 1] : [t, 1];
            }
        },
        Ue = (r._equaliseTransform = function(e, t) {
            (t = L(t).replace(/\.{3}|\u2026/g, e)), (e = r.parseTransformString(e) || []), (t = r.parseTransformString(t) || []);
            for (var n, a, i, o, s = F(e.length, t.length), l = [], d = [], c = 0; c < s; c++) {
                if (((i = e[c] || Fe(t[c])), (o = t[c] || Fe(i)), i[0] != o[0] || ("r" == i[0].toLowerCase() && (i[2] != o[2] || i[3] != o[3])) || ("s" == i[0].toLowerCase() && (i[3] != o[3] || i[4] != o[4])))) return;
                for (l[c] = [], d[c] = [], n = 0, a = F(i.length, o.length); n < a; n++) n in i && (l[c][n] = i[n]), n in o && (d[c][n] = o[n]);
            }
            return { from: l, to: d };
        });
    (r._getContainer = function(e, t, n, a) {
        var i;
        if (((i = null != a || r.is(e, "object") ? e : A.doc.getElementById(e)), null != i))
            return i.tagName ?
                null == t ? { container: i, width: i.style.pixelWidth || i.offsetWidth, height: i.style.pixelHeight || i.offsetHeight } : { container: i, width: t, height: n } : { container: 1, x: e, y: t, width: n, height: a };
    }),
    (r.pathToRelative = Ie),
    (r._engine = {}),
    (r.path2curve = Re),
    (r.matrix = function(e, t, r, n, a, i) {
        return new f(e, t, r, n, a, i);
    }),
    (function(e) {
        function t(e) {
            return e[0] * e[0] + e[1] * e[1];
        }

        function n(e) {
            var r = M.sqrt(t(e));
            e[0] && (e[0] /= r), e[1] && (e[1] /= r);
        }
        (e.add = function(e, t, r, n, a, i) {
            var o,
                s,
                l,
                d,
                c = [
                    [],
                    [],
                    []
                ],
                u = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1],
                ],
                p = [
                    [e, r, a],
                    [t, n, i],
                    [0, 0, 1],
                ];
            for (
                e &&
                e instanceof f &&
                (p = [
                    [e.a, e.c, e.e],
                    [e.b, e.d, e.f],
                    [0, 0, 1],
                ]),
                o = 0; o < 3; o++
            )
                for (s = 0; s < 3; s++) {
                    for (d = 0, l = 0; l < 3; l++) d += u[o][l] * p[l][s];
                    c[o][s] = d;
                }
                (this.a = c[0][0]), (this.b = c[1][0]), (this.c = c[0][1]), (this.d = c[1][1]), (this.e = c[0][2]), (this.f = c[1][2]);
        }),
        (e.invert = function() {
            var e = this,
                t = e.a * e.d - e.b * e.c;
            return new f(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t);
        }),
        (e.clone = function() {
            return new f(this.a, this.b, this.c, this.d, this.e, this.f);
        }),
        (e.translate = function(e, t) {
            this.add(1, 0, 0, 1, e, t);
        }),
        (e.scale = function(e, t, r, n) {
            null == t && (t = e), (r || n) && this.add(1, 0, 0, 1, r, n), this.add(e, 0, 0, t, 0, 0), (r || n) && this.add(1, 0, 0, 1, -r, -n);
        }),
        (e.rotate = function(e, t, n) {
            (e = r.rad(e)), (t = t || 0), (n = n || 0);
            var a = +M.cos(e).toFixed(9),
                i = +M.sin(e).toFixed(9);
            this.add(a, i, -i, a, t, n), this.add(1, 0, 0, 1, -t, -n);
        }),
        (e.x = function(e, t) {
            return e * this.a + t * this.c + this.e;
        }),
        (e.y = function(e, t) {
            return e * this.b + t * this.d + this.f;
        }),
        (e.get = function(e) {
            return +this[L.fromCharCode(97 + e)].toFixed(4);
        }),
        (e.toString = function() {
            return r.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        }),
        (e.toFilter = function() {
            return (
                "progid:DXImageTransform.Microsoft.Matrix(M11=" +
                this.get(0) +
                ", M12=" +
                this.get(2) +
                ", M21=" +
                this.get(1) +
                ", M22=" +
                this.get(3) +
                ", Dx=" +
                this.get(4) +
                ", Dy=" +
                this.get(5) +
                ", sizingmethod='auto expand')"
            );
        }),
        (e.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        }),
        (e.split = function() {
            var e = {};
            (e.dx = this.e), (e.dy = this.f);
            var a = [
                [this.a, this.c],
                [this.b, this.d],
            ];
            (e.scalex = M.sqrt(t(a[0]))),
            n(a[0]),
                (e.shear = a[0][0] * a[1][0] + a[0][1] * a[1][1]),
                (a[1] = [a[1][0] - a[0][0] * e.shear, a[1][1] - a[0][1] * e.shear]),
                (e.scaley = M.sqrt(t(a[1]))),
                n(a[1]),
                (e.shear /= e.scaley);
            var i = -a[0][1],
                o = a[1][1];
            return (
                o < 0 ? ((e.rotate = r.deg(M.acos(o))), i < 0 && (e.rotate = 360 - e.rotate)) : (e.rotate = r.deg(M.asin(i))),
                (e.isSimple = !(+e.shear.toFixed(9) || (e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate))),
                (e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate),
                (e.noRotation = !+e.shear.toFixed(9) && !e.rotate),
                e
            );
        }),
        (e.toTransformString = function(e) {
            var t = e || this[T]();
            return t.isSimple ?
                ((t.scalex = +t.scalex.toFixed(4)),
                    (t.scaley = +t.scaley.toFixed(4)),
                    (t.rotate = +t.rotate.toFixed(4)),
                    (t.dx || t.dy ? "t" + [t.dx, t.dy] : O) + (1 != t.scalex || 1 != t.scaley ? "s" + [t.scalex, t.scaley, 0, 0] : O) + (t.rotate ? "r" + [t.rotate, 0, 0] : O)) :
                "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        });
    })(f.prototype);
    var He = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    ("Apple Computer, Inc." == navigator.vendor && ((He && He[1] < 4) || "iP" == navigator.platform.slice(0, 2))) || ("Google Inc." == navigator.vendor && He && He[1] < 8) ?
    (w.safari = function() {
        var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({ stroke: "none" });
        setTimeout(function() {
            e.remove();
        });
    }) :
    (w.safari = pe);
    for (
        var ze = function() {
                this.returnValue = !1;
            },
            Ve = function() {
                return this.originalEvent.preventDefault();
            },
            je = function() {
                this.cancelBubble = !0;
            },
            Ge = function() {
                return this.originalEvent.stopPropagation();
            },
            We = function(e) {
                var t = A.doc.documentElement.scrollTop || A.doc.body.scrollTop,
                    r = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft;
                return { x: e.clientX + r, y: e.clientY + t };
            },
            Ye = (function() {
                return A.doc.addEventListener ?

                    function(e, t, r, n) {
                        var a = function(e) {
                            var t = We(e);
                            return r.call(n, e, t.x, t.y);
                        };
                        if ((e.addEventListener(t, a, !1), B && N[t])) {
                            var i = function(t) {
                                for (var a = We(t), i = t, o = 0, s = t.targetTouches && t.targetTouches.length; o < s; o++)
                                    if (t.targetTouches[o].target == e) {
                                        (t = t.targetTouches[o]), (t.originalEvent = i), (t.preventDefault = Ve), (t.stopPropagation = Ge);
                                        break;
                                    }
                                return r.call(n, t, a.x, a.y);
                            };
                            e.addEventListener(N[t], i, !1);
                        }
                        return function() {
                            return e.removeEventListener(t, a, !1), B && N[t] && e.removeEventListener(N[t], i, !1), !0;
                        };
                    } :
                    A.doc.attachEvent ?

                    function(e, t, r, n) {
                        var a = function(e) {
                            e = e || A.win.event;
                            var t = A.doc.documentElement.scrollTop || A.doc.body.scrollTop,
                                a = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft,
                                i = e.clientX + a,
                                o = e.clientY + t;
                            return (e.preventDefault = e.preventDefault || ze), (e.stopPropagation = e.stopPropagation || je), r.call(n, e, i, o);
                        };
                        e.attachEvent("on" + t, a);
                        var i = function() {
                            return e.detachEvent("on" + t, a), !0;
                        };
                        return i;
                    } :
                    void 0;
            })(),
            Ke = [],
            Qe = function(e) {
                for (var r, n = e.clientX, a = e.clientY, i = A.doc.documentElement.scrollTop || A.doc.body.scrollTop, o = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft, s = Ke.length; s--;) {
                    if (((r = Ke[s]), B && e.touches)) {
                        for (var l, d = e.touches.length; d--;)
                            if (((l = e.touches[d]), l.identifier == r.el._drag.id)) {
                                (n = l.clientX), (a = l.clientY), (e.originalEvent ? e.originalEvent : e).preventDefault();
                                break;
                            }
                    } else e.preventDefault();
                    var c,
                        u = r.el.node,
                        p = u.nextSibling,
                        h = u.parentNode,
                        f = u.style.display;
                    A.win.opera && h.removeChild(u),
                        (u.style.display = "none"),
                        (c = r.el.paper.getElementByPoint(n, a)),
                        (u.style.display = f),
                        A.win.opera && (p ? h.insertBefore(u, p) : h.appendChild(u)),
                        c && t("raphael.drag.over." + r.el.id, r.el, c),
                        (n += o),
                        (a += i),
                        t("raphael.drag.move." + r.el.id, r.move_scope || r.el, n - r.el._drag.x, a - r.el._drag.y, n, a, e);
                }
            },
            Ze = function(e) {
                r.unmousemove(Qe).unmouseup(Ze);
                for (var n, a = Ke.length; a--;)(n = Ke[a]), (n.el._drag = {}), t("raphael.drag.end." + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, e);
                Ke = [];
            },
            Je = (r.el = {}),
            Xe = R.length; Xe--;

    )
        !(function(e) {
            (r[e] = Je[e] = function(t, n) {
                return r.is(t, "function") && ((this.events = this.events || []), this.events.push({ name: e, f: t, unbind: Ye(this.shape || this.node || A.doc, e, t, n || this) })), this;
            }),
            (r["un" + e] = Je["un" + e] = function(t) {
                for (var n = this.events || [], a = n.length; a--;) n[a].name != e || (!r.is(t, "undefined") && n[a].f != t) || (n[a].unbind(), n.splice(a, 1), !n.length && delete this.events);
                return this;
            });
        })(R[Xe]);
    (Je.data = function(e, n) {
        var a = (ce[this.id] = ce[this.id] || {});
        if (0 == arguments.length) return a;
        if (1 == arguments.length) {
            if (r.is(e, "object")) {
                for (var i in e) e[P](i) && this.data(i, e[i]);
                return this;
            }
            return t("raphael.data.get." + this.id, this, a[e], e), a[e];
        }
        return (a[e] = n), t("raphael.data.set." + this.id, this, n, e), this;
    }),
    (Je.removeData = function(e) {
        return null == e ? (ce[this.id] = {}) : ce[this.id] && delete ce[this.id][e], this;
    }),
    (Je.getData = function() {
        return n(ce[this.id] || {});
    }),
    (Je.hover = function(e, t, r, n) {
        return this.mouseover(e, r).mouseout(t, n || r);
    }),
    (Je.unhover = function(e, t) {
        return this.unmouseover(e).unmouseout(t);
    });
    var et = [];
    (Je.drag = function(e, n, a, i, o, s) {
        function l(l) {
            (l.originalEvent || l).preventDefault();
            var d = l.clientX,
                c = l.clientY,
                u = A.doc.documentElement.scrollTop || A.doc.body.scrollTop,
                p = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft;
            if (((this._drag.id = l.identifier), B && l.touches))
                for (var h, f = l.touches.length; f--;)
                    if (((h = l.touches[f]), (this._drag.id = h.identifier), h.identifier == this._drag.id)) {
                        (d = h.clientX), (c = h.clientY);
                        break;
                    }
                    (this._drag.x = d + p),
                    (this._drag.y = c + u), !Ke.length && r.mousemove(Qe).mouseup(Ze),
                Ke.push({ el: this, move_scope: i, start_scope: o, end_scope: s }),
                n && t.on("raphael.drag.start." + this.id, n),
                e && t.on("raphael.drag.move." + this.id, e),
                a && t.on("raphael.drag.end." + this.id, a),
                t("raphael.drag.start." + this.id, o || i || this, l.clientX + p, l.clientY + u, l);
        }
        return (this._drag = {}), et.push({ el: this, start: l }), this.mousedown(l), this;
    }),
    (Je.onDragOver = function(e) {
        e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id);
    }),
    (Je.undrag = function() {
        for (var e = et.length; e--;) et[e].el == this && (this.unmousedown(et[e].start), et.splice(e, 1), t.unbind("raphael.drag.*." + this.id));
        !et.length && r.unmousemove(Qe).unmouseup(Ze), (Ke = []);
    }),
    (w.circle = function(e, t, n) {
        var a = r._engine.circle(this, e || 0, t || 0, n || 0);
        return this.__set__ && this.__set__.push(a), a;
    }),
    (w.rect = function(e, t, n, a, i) {
        var o = r._engine.rect(this, e || 0, t || 0, n || 0, a || 0, i || 0);
        return this.__set__ && this.__set__.push(o), o;
    }),
    (w.ellipse = function(e, t, n, a) {
        var i = r._engine.ellipse(this, e || 0, t || 0, n || 0, a || 0);
        return this.__set__ && this.__set__.push(i), i;
    }),
    (w.path = function(e) {
        e && !r.is(e, G) && !r.is(e[0], W) && (e += O);
        var t = r._engine.path(r.format[I](r, arguments), this);
        return this.__set__ && this.__set__.push(t), t;
    }),
    (w.image = function(e, t, n, a, i) {
        var o = r._engine.image(this, e || "about:blank", t || 0, n || 0, a || 0, i || 0);
        return this.__set__ && this.__set__.push(o), o;
    }),
    (w.text = function(e, t, n) {
        var a = r._engine.text(this, e || 0, t || 0, L(n));
        return this.__set__ && this.__set__.push(a), a;
    }),
    (w.set = function(e) {
        !r.is(e, "array") && (e = Array.prototype.splice.call(arguments, 0, arguments.length));
        var t = new pt(e);
        return this.__set__ && this.__set__.push(t), (t.paper = this), (t.type = "set"), t;
    }),
    (w.setStart = function(e) {
        this.__set__ = e || this.set();
    }),
    (w.setFinish = function(e) {
        var t = this.__set__;
        return delete this.__set__, t;
    }),
    (w.getSize = function() {
        var e = this.canvas.parentNode;
        return { width: e.offsetWidth, height: e.offsetHeight };
    }),
    (w.setSize = function(e, t) {
        return r._engine.setSize.call(this, e, t);
    }),
    (w.setViewBox = function(e, t, n, a, i) {
        return r._engine.setViewBox.call(this, e, t, n, a, i);
    }),
    (w.top = w.bottom = null),
    (w.raphael = r);
    var tt = function(e) {
        var t = e.getBoundingClientRect(),
            r = e.ownerDocument,
            n = r.body,
            a = r.documentElement,
            i = a.clientTop || n.clientTop || 0,
            o = a.clientLeft || n.clientLeft || 0,
            s = t.top + (A.win.pageYOffset || a.scrollTop || n.scrollTop) - i,
            l = t.left + (A.win.pageXOffset || a.scrollLeft || n.scrollLeft) - o;
        return { y: s, x: l };
    };
    (w.getElementByPoint = function(e, t) {
        var r = this,
            n = r.canvas,
            a = A.doc.elementFromPoint(e, t);
        if (A.win.opera && "svg" == a.tagName) {
            var i = tt(n),
                o = n.createSVGRect();
            (o.x = e - i.x), (o.y = t - i.y), (o.width = o.height = 1);
            var s = n.getIntersectionList(o, null);
            s.length && (a = s[s.length - 1]);
        }
        if (!a) return null;
        for (; a.parentNode && a != n.parentNode && !a.raphael;) a = a.parentNode;
        return a == r.canvas.parentNode && (a = n), (a = a && a.raphael ? r.getById(a.raphaelid) : null);
    }),
    (w.getElementsByBBox = function(e) {
        var t = this.set();
        return (
            this.forEach(function(n) {
                r.isBBoxIntersect(n.getBBox(), e) && t.push(n);
            }),
            t
        );
    }),
    (w.getById = function(e) {
        for (var t = this.bottom; t;) {
            if (t.id == e) return t;
            t = t.next;
        }
        return null;
    }),
    (w.forEach = function(e, t) {
        for (var r = this.bottom; r;) {
            if (e.call(t, r) === !1) return this;
            r = r.next;
        }
        return this;
    }),
    (w.getElementsByPoint = function(e, t) {
        var r = this.set();
        return (
            this.forEach(function(n) {
                n.isPointInside(e, t) && r.push(n);
            }),
            r
        );
    }),
    (Je.isPointInside = function(e, t) {
        var n = (this.realPath = ge[this.type](this));
        return this.attr("transform") && this.attr("transform").length && (n = r.transformPath(n, this.attr("transform"))), r.isPointInsidePath(n, e, t);
    }),
    (Je.getBBox = function(e) {
        if (this.removed) return {};
        var t = this._;
        return e ?
            ((!t.dirty && t.bboxwt) || ((this.realPath = ge[this.type](this)), (t.bboxwt = $e(this.realPath)), (t.bboxwt.toString = m), (t.dirty = 0)), t.bboxwt) :
            ((t.dirty || t.dirtyT || !t.bbox) &&
                ((!t.dirty && this.realPath) || ((t.bboxwt = 0), (this.realPath = ge[this.type](this))), (t.bbox = $e(ve(this.realPath, this.matrix))), (t.bbox.toString = m), (t.dirty = t.dirtyT = 0)),
                t.bbox);
    }),
    (Je.clone = function() {
        if (this.removed) return null;
        var e = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(e), e;
    }),
    (Je.glow = function(e) {
        if ("text" == this.type) return null;
        e = e || {};
        var t = { width: (e.width || 10) + (+this.attr("stroke-width") || 1), fill: e.fill || !1, opacity: e.opacity || 0.5, offsetx: e.offsetx || 0, offsety: e.offsety || 0, color: e.color || "#000" },
            r = t.width / 2,
            n = this.paper,
            a = n.set(),
            i = this.realPath || ge[this.type](this);
        i = this.matrix ? ve(i, this.matrix) : i;
        for (var o = 1; o < r + 1; o++)
            a.push(n.path(i).attr({ stroke: t.color, fill: t.fill ? t.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +((t.width / r) * o).toFixed(3), opacity: +(t.opacity / r).toFixed(3) }));
        return a.insertBefore(this).translate(t.offsetx, t.offsety);
    });
    var rt = function(e, t, n, a, i, o, s, l, u) {
            return null == u ? d(e, t, n, a, i, o, s, l) : r.findDotsAtSegment(e, t, n, a, i, o, s, l, c(e, t, n, a, i, o, s, l, u));
        },
        nt = function(e, t) {
            return function(n, a, i) {
                n = Re(n);
                for (var o, s, l, d, c, u = "", p = {}, h = 0, f = 0, m = n.length; f < m; f++) {
                    if (((l = n[f]), "M" == l[0]))(o = +l[1]), (s = +l[2]);
                    else {
                        if (((d = rt(o, s, l[1], l[2], l[3], l[4], l[5], l[6])), h + d > a)) {
                            if (t && !p.start) {
                                if (((c = rt(o, s, l[1], l[2], l[3], l[4], l[5], l[6], a - h)), (u += ["C" + c.start.x, c.start.y, c.m.x, c.m.y, c.x, c.y]), i)) return u;
                                (p.start = u), (u = ["M" + c.x, c.y + "C" + c.n.x, c.n.y, c.end.x, c.end.y, l[5], l[6]].join()), (h += d), (o = +l[5]), (s = +l[6]);
                                continue;
                            }
                            if (!e && !t) return (c = rt(o, s, l[1], l[2], l[3], l[4], l[5], l[6], a - h)), { x: c.x, y: c.y, alpha: c.alpha };
                        }
                        (h += d), (o = +l[5]), (s = +l[6]);
                    }
                    u += l.shift() + l;
                }
                return (p.end = u), (c = e ? h : t ? p : r.findDotsAtSegment(o, s, l[0], l[1], l[2], l[3], l[4], l[5], 1)), c.alpha && (c = { x: c.x, y: c.y, alpha: c.alpha }), c;
            };
        },
        at = nt(1),
        it = nt(),
        ot = nt(0, 1);
    (r.getTotalLength = at),
    (r.getPointAtLength = it),
    (r.getSubpath = function(e, t, r) {
        if (this.getTotalLength(e) - r < 1e-6) return ot(e, t).end;
        var n = ot(e, r, 1);
        return t ? ot(n, t).end : n;
    }),
    (Je.getTotalLength = function() {
        var e = this.getPath();
        if (e) return this.node.getTotalLength ? this.node.getTotalLength() : at(e);
    }),
    (Je.getPointAtLength = function(e) {
        var t = this.getPath();
        if (t) return it(t, e);
    }),
    (Je.getPath = function() {
        var e,
            t = r._getPath[this.type];
        if ("text" != this.type && "set" != this.type) return t && (e = t(this)), e;
    }),
    (Je.getSubpath = function(e, t) {
        var n = this.getPath();
        if (n) return r.getSubpath(n, e, t);
    });
    var st = (r.easing_formulas = {
        linear: function(e) {
            return e;
        },
        "<": function(e) {
            return z(e, 1.7);
        },
        ">": function(e) {
            return z(e, 0.48);
        },
        "<>": function(e) {
            var t = 0.48 - e / 1.04,
                r = M.sqrt(0.1734 + t * t),
                n = r - t,
                a = z(H(n), 1 / 3) * (n < 0 ? -1 : 1),
                i = -r - t,
                o = z(H(i), 1 / 3) * (i < 0 ? -1 : 1),
                s = a + o + 0.5;
            return 3 * (1 - s) * s * s + s * s * s;
        },
        backIn: function(e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t);
        },
        backOut: function(e) {
            e -= 1;
            var t = 1.70158;
            return e * e * ((t + 1) * e + t) + 1;
        },
        elastic: function(e) {
            return e == !!e ? e : z(2, -10 * e) * M.sin(((e - 0.075) * (2 * V)) / 0.3) + 1;
        },
        bounce: function(e) {
            var t,
                r = 7.5625,
                n = 2.75;
            return e < 1 / n ? (t = r * e * e) : e < 2 / n ? ((e -= 1.5 / n), (t = r * e * e + 0.75)) : e < 2.5 / n ? ((e -= 2.25 / n), (t = r * e * e + 0.9375)) : ((e -= 2.625 / n), (t = r * e * e + 0.984375)), t;
        },
    });
    (st.easeIn = st["ease-in"] = st["<"]), (st.easeOut = st["ease-out"] = st[">"]), (st.easeInOut = st["ease-in-out"] = st["<>"]), (st["back-in"] = st.backIn), (st["back-out"] = st.backOut);
    var lt = [],
        dt =
        e.requestAnimationFrame ||
        e.webkitRequestAnimationFrame ||
        e.mozRequestAnimationFrame ||
        e.oRequestAnimationFrame ||
        e.msRequestAnimationFrame ||
        function(e) {
            setTimeout(e, 16);
        },
        ct = function() {
            for (var e = +new Date(), n = 0; n < lt.length; n++) {
                var a = lt[n];
                if (!a.el.removed && !a.paused) {
                    var i,
                        o,
                        s = e - a.start,
                        l = a.ms,
                        d = a.easing,
                        c = a.from,
                        u = a.diff,
                        p = a.to,
                        h = (a.t, a.el),
                        f = {},
                        m = {};
                    if (
                        (a.initstatus ?
                            ((s = ((a.initstatus * a.anim.top - a.prev) / (a.percent - a.prev)) * l), (a.status = a.initstatus), delete a.initstatus, a.stop && lt.splice(n--, 1)) :
                            (a.status = (a.prev + (a.percent - a.prev) * (s / l)) / a.anim.top), !(s < 0))
                    )
                        if (s < l) {
                            var g = d(s / l);
                            for (var v in c)
                                if (c[P](v)) {
                                    switch (ne[v]) {
                                        case j:
                                            i = +c[v] + g * l * u[v];
                                            break;
                                        case "colour":
                                            i = "rgb(" + [ut(J(c[v].r + g * l * u[v].r)), ut(J(c[v].g + g * l * u[v].g)), ut(J(c[v].b + g * l * u[v].b))].join(",") + ")";
                                            break;
                                        case "path":
                                            i = [];
                                            for (var b = 0, S = c[v].length; b < S; b++) {
                                                i[b] = [c[v][b][0]];
                                                for (var w = 1, C = c[v][b].length; w < C; w++) i[b][w] = +c[v][b][w] + g * l * u[v][b][w];
                                                i[b] = i[b].join(k);
                                            }
                                            i = i.join(k);
                                            break;
                                        case "transform":
                                            if (u[v].real)
                                                for (i = [], b = 0, S = c[v].length; b < S; b++)
                                                    for (i[b] = [c[v][b][0]], w = 1, C = c[v][b].length; w < C; w++) i[b][w] = c[v][b][w] + g * l * u[v][b][w];
                                            else {
                                                var _ = function(e) {
                                                    return +c[v][e] + g * l * u[v][e];
                                                };
                                                i = [
                                                    ["m", _(0), _(1), _(2), _(3), _(4), _(5)]
                                                ];
                                            }
                                            break;
                                        case "csv":
                                            if ("clip-rect" == v)
                                                for (i = [], b = 4; b--;) i[b] = +c[v][b] + g * l * u[v][b];
                                            break;
                                        default:
                                            var x = [][E](c[v]);
                                            for (i = [], b = h.paper.customAttributes[v].length; b--;) i[b] = +x[b] + g * l * u[v][b];
                                    }
                                    f[v] = i;
                                }
                            h.attr(f),
                                (function(e, r, n) {
                                    setTimeout(function() {
                                        t("raphael.anim.frame." + e, r, n);
                                    });
                                })(h.id, h, a.anim);
                        } else {
                            if (
                                ((function(e, n, a) {
                                        setTimeout(function() {
                                            t("raphael.anim.frame." + n.id, n, a), t("raphael.anim.finish." + n.id, n, a), r.is(e, "function") && e.call(n);
                                        });
                                    })(a.callback, h, a.anim),
                                    h.attr(p),
                                    lt.splice(n--, 1),
                                    a.repeat > 1 && !a.next)
                            ) {
                                for (o in p) p[P](o) && (m[o] = a.totalOrigin[o]);
                                a.el.attr(m), y(a.anim, a.el, a.anim.percents[0], null, a.totalOrigin, a.repeat - 1);
                            }
                            a.next && !a.stop && y(a.anim, a.el, a.next, null, a.totalOrigin, a.repeat);
                        }
                }
            }
            r.svg && h && h.paper && h.paper.safari(), lt.length && dt(ct);
        },
        ut = function(e) {
            return e > 255 ? 255 : e < 0 ? 0 : e;
        };
    (Je.animateWith = function(e, t, n, a, i, o) {
        var s = this;
        if (s.removed) return o && o.call(s), s;
        var l = n instanceof v ? n : r.animation(n, a, i, o);
        y(l, s, l.percents[0], null, s.attr());
        for (var d = 0, c = lt.length; d < c; d++)
            if (lt[d].anim == t && lt[d].el == e) {
                lt[c - 1].start = lt[d].start;
                break;
            }
        return s;
    }),
    (Je.onAnimation = function(e) {
        return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this;
    }),
    (v.prototype.delay = function(e) {
        var t = new v(this.anim, this.ms);
        return (t.times = this.times), (t.del = +e || 0), t;
    }),
    (v.prototype.repeat = function(e) {
        var t = new v(this.anim, this.ms);
        return (t.del = this.del), (t.times = M.floor(F(e, 0)) || 1), t;
    }),
    (r.animation = function(e, t, n, a) {
        if (e instanceof v) return e;
        (!r.is(n, "function") && n) || ((a = a || n || null), (n = null)), (e = Object(e)), (t = +t || 0);
        var i,
            o,
            s = {};
        for (o in e) e[P](o) && X(o) != o && X(o) + "%" != o && ((i = !0), (s[o] = e[o]));
        if (i) return n && (s.easing = n), a && (s.callback = a), new v({ 100: s }, t);
        if (a) {
            var l = 0;
            for (var d in e) {
                var c = ee(d);
                e[P](d) && c > l && (l = c);
            }
            (l += "%"), !e[l].callback && (e[l].callback = a);
        }
        return new v(e, t);
    }),
    (Je.animate = function(e, t, n, a) {
        var i = this;
        if (i.removed) return a && a.call(i), i;
        var o = e instanceof v ? e : r.animation(e, t, n, a);
        return y(o, i, o.percents[0], null, i.attr()), i;
    }),
    (Je.setTime = function(e, t) {
        return e && null != t && this.status(e, U(t, e.ms) / e.ms), this;
    }),
    (Je.status = function(e, t) {
        var r,
            n,
            a = [],
            i = 0;
        if (null != t) return y(e, this, -1, U(t, 1)), this;
        for (r = lt.length; i < r; i++)
            if (((n = lt[i]), n.el.id == this.id && (!e || n.anim == e))) {
                if (e) return n.status;
                a.push({ anim: n.anim, status: n.status });
            }
        return e ? 0 : a;
    }),
    (Je.pause = function(e) {
        for (var r = 0; r < lt.length; r++) lt[r].el.id != this.id || (e && lt[r].anim != e) || (t("raphael.anim.pause." + this.id, this, lt[r].anim) !== !1 && (lt[r].paused = !0));
        return this;
    }),
    (Je.resume = function(e) {
        for (var r = 0; r < lt.length; r++)
            if (lt[r].el.id == this.id && (!e || lt[r].anim == e)) {
                var n = lt[r];
                t("raphael.anim.resume." + this.id, this, n.anim) !== !1 && (delete n.paused, this.status(n.anim, n.status));
            }
        return this;
    }),
    (Je.stop = function(e) {
        for (var r = 0; r < lt.length; r++) lt[r].el.id != this.id || (e && lt[r].anim != e) || (t("raphael.anim.stop." + this.id, this, lt[r].anim) !== !1 && lt.splice(r--, 1));
        return this;
    }),
    t.on("raphael.remove", b),
        t.on("raphael.clear", b),
        (Je.toString = function() {
            return "Raphaël’s object";
        });
    var pt = function(e) {
            if (((this.items = []), (this.length = 0), (this.type = "set"), e))
                for (var t = 0, r = e.length; t < r; t++) !e[t] || (e[t].constructor != Je.constructor && e[t].constructor != pt) || ((this[this.items.length] = this.items[this.items.length] = e[t]), this.length++);
        },
        ht = pt.prototype;
    (ht.push = function() {
        for (var e, t, r = 0, n = arguments.length; r < n; r++)(e = arguments[r]), !e || (e.constructor != Je.constructor && e.constructor != pt) || ((t = this.items.length), (this[t] = this.items[t] = e), this.length++);
        return this;
    }),
    (ht.pop = function() {
        return this.length && delete this[this.length--], this.items.pop();
    }),
    (ht.forEach = function(e, t) {
        for (var r = 0, n = this.items.length; r < n; r++)
            if (e.call(t, this.items[r], r) === !1) return this;
        return this;
    });
    for (var ft in Je)
        Je[P](ft) &&
        (ht[ft] = (function(e) {
            return function() {
                var t = arguments;
                return this.forEach(function(r) {
                    r[e][I](r, t);
                });
            };
        })(ft));
    return (
        (ht.attr = function(e, t) {
            if (e && r.is(e, W) && r.is(e[0], "object"))
                for (var n = 0, a = e.length; n < a; n++) this.items[n].attr(e[n]);
            else
                for (var i = 0, o = this.items.length; i < o; i++) this.items[i].attr(e, t);
            return this;
        }),
        (ht.clear = function() {
            for (; this.length;) this.pop();
        }),
        (ht.splice = function(e, t, r) {
            (e = e < 0 ? F(this.length + e, 0) : e), (t = F(0, U(this.length - e, t)));
            var n,
                a = [],
                i = [],
                o = [];
            for (n = 2; n < arguments.length; n++) o.push(arguments[n]);
            for (n = 0; n < t; n++) i.push(this[e + n]);
            for (; n < this.length - e; n++) a.push(this[e + n]);
            var s = o.length;
            for (n = 0; n < s + a.length; n++) this.items[e + n] = this[e + n] = n < s ? o[n] : a[n - s];
            for (n = this.items.length = this.length -= t - s; this[n];) delete this[n++];
            return new pt(i);
        }),
        (ht.exclude = function(e) {
            for (var t = 0, r = this.length; t < r; t++)
                if (this[t] == e) return this.splice(t, 1), !0;
        }),
        (ht.animate = function(e, t, n, a) {
            (r.is(n, "function") || !n) && (a = n || null);
            var i,
                o,
                s = this.items.length,
                l = s,
                d = this;
            if (!s) return this;
            a &&
                (o = function() {
                    !--s && a.call(d);
                }),
                (n = r.is(n, G) ? n : o);
            var c = r.animation(e, t, n, o);
            for (i = this.items[--l].animate(c); l--;) this.items[l] && !this.items[l].removed && this.items[l].animateWith(i, c, c), (this.items[l] && !this.items[l].removed) || s--;
            return this;
        }),
        (ht.insertAfter = function(e) {
            for (var t = this.items.length; t--;) this.items[t].insertAfter(e);
            return this;
        }),
        (ht.getBBox = function() {
            for (var e = [], t = [], r = [], n = [], a = this.items.length; a--;)
                if (!this.items[a].removed) {
                    var i = this.items[a].getBBox();
                    e.push(i.x), t.push(i.y), r.push(i.x + i.width), n.push(i.y + i.height);
                }
            return (e = U[I](0, e)), (t = U[I](0, t)), (r = F[I](0, r)), (n = F[I](0, n)), { x: e, y: t, x2: r, y2: n, width: r - e, height: n - t };
        }),
        (ht.clone = function(e) {
            e = this.paper.set();
            for (var t = 0, r = this.items.length; t < r; t++) e.push(this.items[t].clone());
            return e;
        }),
        (ht.toString = function() {
            return "Raphaël‘s set";
        }),
        (ht.glow = function(e) {
            var t = this.paper.set();
            return (
                this.forEach(function(r, n) {
                    var a = r.glow(e);
                    null != a &&
                        a.forEach(function(e, r) {
                            t.push(e);
                        });
                }),
                t
            );
        }),
        (ht.isPointInside = function(e, t) {
            var r = !1;
            return (
                this.forEach(function(n) {
                    if (n.isPointInside(e, t)) return (r = !0), !1;
                }),
                r
            );
        }),
        (r.registerFont = function(e) {
            if (!e.face) return e;
            this.fonts = this.fonts || {};
            var t = { w: e.w, face: {}, glyphs: {} },
                r = e.face["font-family"];
            for (var n in e.face) e.face[P](n) && (t.face[n] = e.face[n]);
            if ((this.fonts[r] ? this.fonts[r].push(t) : (this.fonts[r] = [t]), !e.svg)) {
                t.face["units-per-em"] = ee(e.face["units-per-em"], 10);
                for (var a in e.glyphs)
                    if (e.glyphs[P](a)) {
                        var i = e.glyphs[a];
                        if (
                            ((t.glyphs[a] = {
                                    w: i.w,
                                    k: {},
                                    d: i.d &&
                                        "M" +
                                        i.d.replace(/[mlcxtrv]/g, function(e) {
                                            return { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[e] || "M";
                                        }) +
                                        "z",
                                }),
                                i.k)
                        )
                            for (var o in i.k) i[P](o) && (t.glyphs[a].k[o] = i.k[o]);
                    }
            }
            return e;
        }),
        (w.getFont = function(e, t, n, a) {
            if (((a = a || "normal"), (n = n || "normal"), (t = +t || { normal: 400, bold: 700, lighter: 300, bolder: 800 }[t] || 400), r.fonts)) {
                var i = r.fonts[e];
                if (!i) {
                    var o = new RegExp("(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, O) + "(\\s|$)", "i");
                    for (var s in r.fonts)
                        if (r.fonts[P](s) && o.test(s)) {
                            i = r.fonts[s];
                            break;
                        }
                }
                var l;
                if (i)
                    for (var d = 0, c = i.length; d < c && ((l = i[d]), l.face["font-weight"] != t || (l.face["font-style"] != n && l.face["font-style"]) || l.face["font-stretch"] != a); d++);
                return l;
            }
        }),
        (w.print = function(e, t, n, a, i, o, s, l) {
            (o = o || "middle"), (s = F(U(s || 0, 1), -1)), (l = F(U(l || 1, 3), 1));
            var d,
                c = L(n)[T](O),
                u = 0,
                p = 0,
                h = O;
            if ((r.is(a, "string") && (a = this.getFont(a)), a)) {
                d = (i || 16) / a.face["units-per-em"];
                for (var f = a.face.bbox[T](C), m = +f[0], g = f[3] - f[1], v = 0, y = +f[1] + ("baseline" == o ? g + +a.face.descent : g / 2), b = 0, S = c.length; b < S; b++) {
                    if ("\n" == c[b])(u = 0), (_ = 0), (p = 0), (v += g * l);
                    else {
                        var w = (p && a.glyphs[c[b - 1]]) || {},
                            _ = a.glyphs[c[b]];
                        (u += p ? (w.w || a.w) + ((w.k && w.k[c[b]]) || 0) + a.w * s : 0), (p = 1);
                    }
                    _ && _.d && (h += r.transformPath(_.d, ["t", u * d, v * d, "s", d, d, m, y, "t", (e - m) / d, (t - y) / d]));
                }
            }
            return this.path(h).attr({ fill: "#000", stroke: "none" });
        }),
        (w.add = function(e) {
            if (r.is(e, "array"))
                for (var t, n = this.set(), a = 0, i = e.length; a < i; a++)(t = e[a] || {}), _[P](t.type) && n.push(this[t.type]().attr(t));
            return n;
        }),
        (r.format = function(e, t) {
            var n = r.is(t, W) ? [0][E](t) : arguments;
            return (
                e &&
                r.is(e, G) &&
                n.length - 1 &&
                (e = e.replace(x, function(e, t) {
                    return null == n[++t] ? O : n[t];
                })),
                e || O
            );
        }),
        (r.fullfill = (function() {
            var e = /\{([^\}]+)\}/g,
                t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                r = function(e, r, n) {
                    var a = n;
                    return (
                        r.replace(t, function(e, t, r, n, i) {
                            (t = t || n), a && (t in a && (a = a[t]), "function" == typeof a && i && (a = a()));
                        }),
                        (a = (null == a || a == n ? e : a) + "")
                    );
                };
            return function(t, n) {
                return String(t).replace(e, function(e, t) {
                    return r(e, t, n);
                });
            };
        })()),
        (r.ninja = function() {
            return $.was ? (A.win.Raphael = $.is) : delete Raphael, r;
        }),
        (r.st = ht),
        t.on("raphael.DOMload", function() {
            S = !0;
        }),
        (function(e, t, n) {
            function a() {
                /in/.test(e.readyState) ? setTimeout(a, 9) : r.eve("raphael.DOMload");
            }
            null == e.readyState &&
                e.addEventListener &&
                (e.addEventListener(
                        t,
                        (n = function() {
                            e.removeEventListener(t, n, !1), (e.readyState = "complete");
                        }), !1
                    ),
                    (e.readyState = "loading")),
                a();
        })(document, "DOMContentLoaded"),
        (function() {
            if (r.svg) {
                var e = "hasOwnProperty",
                    t = String,
                    n = parseFloat,
                    a = parseInt,
                    i = Math,
                    o = i.max,
                    s = i.abs,
                    l = i.pow,
                    d = /[, ]+/,
                    c = r.eve,
                    u = "",
                    p = " ",
                    h = "http://www.w3.org/1999/xlink",
                    f = { block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z" },
                    m = {};
                r.toString = function() {
                    return "Your browser supports SVG.\nYou are running Raphaël " + this.version;
                };
                var g = function(n, a) {
                        if (a) {
                            "string" == typeof n && (n = g(n));
                            for (var i in a) a[e](i) && ("xlink:" == i.substring(0, 6) ? n.setAttributeNS(h, i.substring(6), t(a[i])) : n.setAttribute(i, t(a[i])));
                        } else(n = r._g.doc.createElementNS("http://www.w3.org/2000/svg", n)), n.style && (n.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                        return n;
                    },
                    v = function(e, a) {
                        var d = "linear",
                            c = e.id + a,
                            p = 0.5,
                            h = 0.5,
                            f = e.node,
                            m = e.paper,
                            v = f.style,
                            y = r._g.doc.getElementById(c);
                        if (!y) {
                            if (
                                ((a = t(a).replace(r._radial_gradient, function(e, t, r) {
                                        if (((d = "radial"), t && r)) {
                                            (p = n(t)), (h = n(r));
                                            var a = 2 * (h > 0.5) - 1;
                                            l(p - 0.5, 2) + l(h - 0.5, 2) > 0.25 && (h = i.sqrt(0.25 - l(p - 0.5, 2)) * a + 0.5) && 0.5 != h && (h = h.toFixed(5) - 1e-5 * a);
                                        }
                                        return u;
                                    })),
                                    (a = a.split(/\s*\-\s*/)),
                                    "linear" == d)
                            ) {
                                var b = a.shift();
                                if (((b = -n(b)), isNaN(b))) return null;
                                var S = [0, 0, i.cos(r.rad(b)), i.sin(r.rad(b))],
                                    w = 1 / (o(s(S[2]), s(S[3])) || 1);
                                (S[2] *= w), (S[3] *= w), S[2] < 0 && ((S[0] = -S[2]), (S[2] = 0)), S[3] < 0 && ((S[1] = -S[3]), (S[3] = 0));
                            }
                            var C = r._parseDots(a);
                            if (!C) return null;
                            if (((c = c.replace(/[\(\)\s,\xb0#]/g, "_")), e.gradient && c != e.gradient.id && (m.defs.removeChild(e.gradient), delete e.gradient), !e.gradient)) {
                                (y = g(d + "Gradient", { id: c })), (e.gradient = y), g(y, "radial" == d ? { fx: p, fy: h } : { x1: S[0], y1: S[1], x2: S[2], y2: S[3], gradientTransform: e.matrix.invert() }), m.defs.appendChild(y);
                                for (var _ = 0, x = C.length; _ < x; _++) y.appendChild(g("stop", { offset: C[_].offset ? C[_].offset : _ ? "100%" : "0%", "stop-color": C[_].color || "#fff" }));
                            }
                        }
                        return g(f, { fill: "url(" + document.location + "#" + c + ")", opacity: 1, "fill-opacity": 1 }), (v.fill = u), (v.opacity = 1), (v.fillOpacity = 1), 1;
                    },
                    y = function(e) {
                        var t = e.getBBox(1);
                        g(e.pattern, { patternTransform: e.matrix.invert() + " translate(" + t.x + "," + t.y + ")" });
                    },
                    b = function(n, a, i) {
                        if ("path" == n.type) {
                            for (var o, s, l, d, c, p = t(a).toLowerCase().split("-"), h = n.paper, v = i ? "end" : "start", y = n.node, b = n.attrs, S = b["stroke-width"], w = p.length, C = "classic", _ = 3, x = 3, P = 5; w--;)
                                switch (p[w]) {
                                    case "block":
                                    case "classic":
                                    case "oval":
                                    case "diamond":
                                    case "open":
                                    case "none":
                                        C = p[w];
                                        break;
                                    case "wide":
                                        x = 5;
                                        break;
                                    case "narrow":
                                        x = 2;
                                        break;
                                    case "long":
                                        _ = 5;
                                        break;
                                    case "short":
                                        _ = 2;
                                }
                            if (
                                ("open" == C ? ((_ += 2), (x += 2), (P += 2), (l = 1), (d = i ? 4 : 1), (c = { fill: "none", stroke: b.stroke })) : ((d = l = _ / 2), (c = { fill: b.stroke, stroke: "none" })),
                                    n._.arrows ?
                                    i ?
                                    (n._.arrows.endPath && m[n._.arrows.endPath]--, n._.arrows.endMarker && m[n._.arrows.endMarker]--) :
                                    (n._.arrows.startPath && m[n._.arrows.startPath]--, n._.arrows.startMarker && m[n._.arrows.startMarker]--) :
                                    (n._.arrows = {}),
                                    "none" != C)
                            ) {
                                var A = "raphael-marker-" + C,
                                    $ = "raphael-marker-" + v + C + _ + x + "-obj" + n.id;
                                r._g.doc.getElementById(A) ? m[A]++ : (h.defs.appendChild(g(g("path"), { "stroke-linecap": "round", d: f[C], id: A })), (m[A] = 1));
                                var D,
                                    I = r._g.doc.getElementById($);
                                I
                                    ?
                                    (m[$]++, (D = I.getElementsByTagName("use")[0])) :
                                    ((I = g(g("marker"), { id: $, markerHeight: x, markerWidth: _, orient: "auto", refX: d, refY: x / 2 })),
                                        (D = g(g("use"), {
                                            "xlink:href": "#" + A,
                                            transform: (i ? "rotate(180 " + _ / 2 + " " + x / 2 + ") " : u) + "scale(" + _ / P + "," + x / P + ")",
                                            "stroke-width": (1 / ((_ / P + x / P) / 2)).toFixed(4),
                                        })),
                                        I.appendChild(D),
                                        h.defs.appendChild(I),
                                        (m[$] = 1)),
                                    g(D, c);
                                var E = l * ("diamond" != C && "oval" != C);
                                i ? ((o = n._.arrows.startdx * S || 0), (s = r.getTotalLength(b.path) - E * S)) : ((o = E * S), (s = r.getTotalLength(b.path) - (n._.arrows.enddx * S || 0))),
                                    (c = {}),
                                    (c["marker-" + v] = "url(#" + $ + ")"),
                                    (s || o) && (c.d = r.getSubpath(b.path, o, s)),
                                    g(y, c),
                                    (n._.arrows[v + "Path"] = A),
                                    (n._.arrows[v + "Marker"] = $),
                                    (n._.arrows[v + "dx"] = E),
                                    (n._.arrows[v + "Type"] = C),
                                    (n._.arrows[v + "String"] = a);
                            } else
                                i ? ((o = n._.arrows.startdx * S || 0), (s = r.getTotalLength(b.path) - o)) : ((o = 0), (s = r.getTotalLength(b.path) - (n._.arrows.enddx * S || 0))),
                                n._.arrows[v + "Path"] && g(y, { d: r.getSubpath(b.path, o, s) }),
                                delete n._.arrows[v + "Path"],
                                delete n._.arrows[v + "Marker"],
                                delete n._.arrows[v + "dx"],
                                delete n._.arrows[v + "Type"],
                                delete n._.arrows[v + "String"];
                            for (c in m)
                                if (m[e](c) && !m[c]) {
                                    var B = r._g.doc.getElementById(c);
                                    B && B.parentNode.removeChild(B);
                                }
                        }
                    },
                    S = { "": [0], none: [0], "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3] },
                    w = function(e, r, n) {
                        if ((r = S[t(r).toLowerCase()])) {
                            for (var a = e.attrs["stroke-width"] || "1", i = { round: a, square: a, butt: 0 }[e.attrs["stroke-linecap"] || n["stroke-linecap"]] || 0, o = [], s = r.length; s--;) o[s] = r[s] * a + (s % 2 ? 1 : -1) * i;
                            g(e.node, { "stroke-dasharray": o.join(",") });
                        }
                    },
                    C = function(n, i) {
                        var l = n.node,
                            c = n.attrs,
                            p = l.style.visibility;
                        l.style.visibility = "hidden";
                        for (var f in i)
                            if (i[e](f)) {
                                if (!r._availableAttrs[e](f)) continue;
                                var m = i[f];
                                switch (((c[f] = m), f)) {
                                    case "blur":
                                        n.blur(m);
                                        break;
                                    case "title":
                                        var S = l.getElementsByTagName("title");
                                        if (S.length && (S = S[0])) S.firstChild.nodeValue = m;
                                        else {
                                            S = g("title");
                                            var C = r._g.doc.createTextNode(m);
                                            S.appendChild(C), l.appendChild(S);
                                        }
                                        break;
                                    case "href":
                                    case "target":
                                        var _ = l.parentNode;
                                        if ("a" != _.tagName.toLowerCase()) {
                                            var P = g("a");
                                            _.insertBefore(P, l), P.appendChild(l), (_ = P);
                                        }
                                        "target" == f ? _.setAttributeNS(h, "show", "blank" == m ? "new" : m) : _.setAttributeNS(h, f, m);
                                        break;
                                    case "cursor":
                                        l.style.cursor = m;
                                        break;
                                    case "transform":
                                        n.transform(m);
                                        break;
                                    case "arrow-start":
                                        b(n, m);
                                        break;
                                    case "arrow-end":
                                        b(n, m, 1);
                                        break;
                                    case "clip-rect":
                                        var A = t(m).split(d);
                                        if (4 == A.length) {
                                            n.clip && n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);
                                            var $ = g("clipPath"),
                                                D = g("rect");
                                            ($.id = r.createUUID()), g(D, { x: A[0], y: A[1], width: A[2], height: A[3] }), $.appendChild(D), n.paper.defs.appendChild($), g(l, { "clip-path": "url(#" + $.id + ")" }), (n.clip = D);
                                        }
                                        if (!m) {
                                            var I = l.getAttribute("clip-path");
                                            if (I) {
                                                var E = r._g.doc.getElementById(I.replace(/(^url\(#|\)$)/g, u));
                                                E && E.parentNode.removeChild(E), g(l, { "clip-path": u }), delete n.clip;
                                            }
                                        }
                                        break;
                                    case "path":
                                        "path" == n.type &&
                                            (g(l, { d: m ? (c.path = r._pathToAbsolute(m)) : "M0,0" }),
                                                (n._.dirty = 1),
                                                n._.arrows && ("startString" in n._.arrows && b(n, n._.arrows.startString), "endString" in n._.arrows && b(n, n._.arrows.endString, 1)));
                                        break;
                                    case "width":
                                        if ((l.setAttribute(f, m), (n._.dirty = 1), !c.fx)) break;
                                        (f = "x"), (m = c.x);
                                    case "x":
                                        c.fx && (m = -c.x - (c.width || 0));
                                    case "rx":
                                        if ("rx" == f && "rect" == n.type) break;
                                    case "cx":
                                        l.setAttribute(f, m), n.pattern && y(n), (n._.dirty = 1);
                                        break;
                                    case "height":
                                        if ((l.setAttribute(f, m), (n._.dirty = 1), !c.fy)) break;
                                        (f = "y"), (m = c.y);
                                    case "y":
                                        c.fy && (m = -c.y - (c.height || 0));
                                    case "ry":
                                        if ("ry" == f && "rect" == n.type) break;
                                    case "cy":
                                        l.setAttribute(f, m), n.pattern && y(n), (n._.dirty = 1);
                                        break;
                                    case "r":
                                        "rect" == n.type ? g(l, { rx: m, ry: m }) : l.setAttribute(f, m), (n._.dirty = 1);
                                        break;
                                    case "src":
                                        "image" == n.type && l.setAttributeNS(h, "href", m);
                                        break;
                                    case "stroke-width":
                                        (1 == n._.sx && 1 == n._.sy) || (m /= o(s(n._.sx), s(n._.sy)) || 1),
                                        l.setAttribute(f, m),
                                            c["stroke-dasharray"] && w(n, c["stroke-dasharray"], i),
                                            n._.arrows && ("startString" in n._.arrows && b(n, n._.arrows.startString), "endString" in n._.arrows && b(n, n._.arrows.endString, 1));
                                        break;
                                    case "stroke-dasharray":
                                        w(n, m, i);
                                        break;
                                    case "fill":
                                        var B = t(m).match(r._ISURL);
                                        if (B) {
                                            $ = g("pattern");
                                            var O = g("image");
                                            ($.id = r.createUUID()),
                                            g($, { x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1 }),
                                                g(O, { x: 0, y: 0, "xlink:href": B[1] }),
                                                $.appendChild(O),
                                                (function(e) {
                                                    r._preload(B[1], function() {
                                                        var t = this.offsetWidth,
                                                            r = this.offsetHeight;
                                                        g(e, { width: t, height: r }), g(O, { width: t, height: r }), n.paper.safari();
                                                    });
                                                })($),
                                                n.paper.defs.appendChild($),
                                                g(l, { fill: "url(#" + $.id + ")" }),
                                                (n.pattern = $),
                                                n.pattern && y(n);
                                            break;
                                        }
                                        var k = r.getRGB(m);
                                        if (k.error) {
                                            if (("circle" == n.type || "ellipse" == n.type || "r" != t(m).charAt()) && v(n, m)) {
                                                if ("opacity" in c || "fill-opacity" in c) {
                                                    var L = r._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, u));
                                                    if (L) {
                                                        var T = L.getElementsByTagName("stop");
                                                        g(T[T.length - 1], { "stop-opacity": ("opacity" in c ? c.opacity : 1) * ("fill-opacity" in c ? c["fill-opacity"] : 1) });
                                                    }
                                                }
                                                (c.gradient = m), (c.fill = "none");
                                                break;
                                            }
                                        } else
                                            delete i.gradient,
                                            delete c.gradient, !r.is(c.opacity, "undefined") && r.is(i.opacity, "undefined") && g(l, { opacity: c.opacity }), !r.is(c["fill-opacity"], "undefined") && r.is(i["fill-opacity"], "undefined") && g(l, { "fill-opacity": c["fill-opacity"] });
                                        k[e]("opacity") && g(l, { "fill-opacity": k.opacity > 1 ? k.opacity / 100 : k.opacity });
                                    case "stroke":
                                        (k = r.getRGB(m)),
                                        l.setAttribute(f, k.hex),
                                            "stroke" == f && k[e]("opacity") && g(l, { "stroke-opacity": k.opacity > 1 ? k.opacity / 100 : k.opacity }),
                                            "stroke" == f && n._.arrows && ("startString" in n._.arrows && b(n, n._.arrows.startString), "endString" in n._.arrows && b(n, n._.arrows.endString, 1));
                                        break;
                                    case "gradient":
                                        ("circle" == n.type || "ellipse" == n.type || "r" != t(m).charAt()) && v(n, m);
                                        break;
                                    case "opacity":
                                        c.gradient && !c[e]("stroke-opacity") && g(l, { "stroke-opacity": m > 1 ? m / 100 : m });
                                    case "fill-opacity":
                                        if (c.gradient) {
                                            (L = r._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, u))), L && ((T = L.getElementsByTagName("stop")), g(T[T.length - 1], { "stop-opacity": m }));
                                            break;
                                        }
                                    default:
                                        "font-size" == f && (m = a(m, 10) + "px");
                                        var R = f.replace(/(\-.)/g, function(e) {
                                            return e.substring(1).toUpperCase();
                                        });
                                        (l.style[R] = m), (n._.dirty = 1), l.setAttribute(f, m);
                                }
                            }
                        x(n, i), (l.style.visibility = p);
                    },
                    _ = 1.2,
                    x = function(n, i) {
                        if ("text" == n.type && (i[e]("text") || i[e]("font") || i[e]("font-size") || i[e]("x") || i[e]("y"))) {
                            var o = n.attrs,
                                s = n.node,
                                l = s.firstChild ? a(r._g.doc.defaultView.getComputedStyle(s.firstChild, u).getPropertyValue("font-size"), 10) : 10;
                            if (i[e]("text")) {
                                for (o.text = i.text; s.firstChild;) s.removeChild(s.firstChild);
                                for (var d, c = t(i.text).split("\n"), p = [], h = 0, f = c.length; h < f; h++)
                                    (d = g("tspan")), h && g(d, { dy: l * _, x: o.x }), d.appendChild(r._g.doc.createTextNode(c[h])), s.appendChild(d), (p[h] = d);
                            } else
                                for (p = s.getElementsByTagName("tspan"), h = 0, f = p.length; h < f; h++) h ? g(p[h], { dy: l * _, x: o.x }) : g(p[0], { dy: 0 });
                            g(s, { x: o.x, y: o.y }), (n._.dirty = 1);
                            var m = n._getBBox(),
                                v = o.y - (m.y + m.height / 2);
                            v && r.is(v, "finite") && g(p[0], { dy: v });
                        }
                    },
                    P = function(e) {
                        return e.parentNode && "a" === e.parentNode.tagName.toLowerCase() ? e.parentNode : e;
                    },
                    A = function(e, t) {
                        (this[0] = this.node = e),
                        (e.raphael = !0),
                        (this.id = r._oid++),
                        (e.raphaelid = this.id),
                        (this.matrix = r.matrix()),
                        (this.realPath = null),
                        (this.paper = t),
                        (this.attrs = this.attrs || {}),
                        (this._ = { transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1 }), !t.bottom && (t.bottom = this),
                            (this.prev = t.top),
                            t.top && (t.top.next = this),
                            (t.top = this),
                            (this.next = null);
                    },
                    $ = r.el;
                (A.prototype = $),
                ($.constructor = A),
                (r._engine.path = function(e, t) {
                    var r = g("path");
                    t.canvas && t.canvas.appendChild(r);
                    var n = new A(r, t);
                    return (n.type = "path"), C(n, { fill: "none", stroke: "#000", path: e }), n;
                }),
                ($.rotate = function(e, r, a) {
                    if (this.removed) return this;
                    if (((e = t(e).split(d)), e.length - 1 && ((r = n(e[1])), (a = n(e[2]))), (e = n(e[0])), null == a && (r = a), null == r || null == a)) {
                        var i = this.getBBox(1);
                        (r = i.x + i.width / 2), (a = i.y + i.height / 2);
                    }
                    return this.transform(this._.transform.concat([
                        ["r", e, r, a]
                    ])), this;
                }),
                ($.scale = function(e, r, a, i) {
                    if (this.removed) return this;
                    if (((e = t(e).split(d)), e.length - 1 && ((r = n(e[1])), (a = n(e[2])), (i = n(e[3]))), (e = n(e[0])), null == r && (r = e), null == i && (a = i), null == a || null == i)) var o = this.getBBox(1);
                    return (a = null == a ? o.x + o.width / 2 : a), (i = null == i ? o.y + o.height / 2 : i), this.transform(this._.transform.concat([
                        ["s", e, r, a, i]
                    ])), this;
                }),
                ($.translate = function(e, r) {
                    return this.removed ? this : ((e = t(e).split(d)), e.length - 1 && (r = n(e[1])), (e = n(e[0]) || 0), (r = +r || 0), this.transform(this._.transform.concat([
                        ["t", e, r]
                    ])), this);
                }),
                ($.transform = function(t) {
                    var n = this._;
                    if (null == t) return n.transform;
                    if ((r._extractTransform(this, t), this.clip && g(this.clip, { transform: this.matrix.invert() }), this.pattern && y(this), this.node && g(this.node, { transform: this.matrix }), 1 != n.sx || 1 != n.sy)) {
                        var a = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
                        this.attr({ "stroke-width": a });
                    }
                    return this;
                }),
                ($.hide = function() {
                    return !this.removed && this.paper.safari((this.node.style.display = "none")), this;
                }),
                ($.show = function() {
                    return !this.removed && this.paper.safari((this.node.style.display = "")), this;
                }),
                ($.remove = function() {
                    var e = P(this.node);
                    if (!this.removed && e.parentNode) {
                        var t = this.paper;
                        t.__set__ && t.__set__.exclude(this), c.unbind("raphael.*.*." + this.id), this.gradient && t.defs.removeChild(this.gradient), r._tear(this, t), e.parentNode.removeChild(e), this.removeData();
                        for (var n in this) this[n] = "function" == typeof this[n] ? r._removedFactory(n) : null;
                        this.removed = !0;
                    }
                }),
                ($._getBBox = function() {
                    if ("none" == this.node.style.display) {
                        this.show();
                        var e = !0;
                    }
                    var t,
                        r = !1;
                    this.paper.canvas.parentElement ? (t = this.paper.canvas.parentElement.style) : this.paper.canvas.parentNode && (t = this.paper.canvas.parentNode.style), t && "none" == t.display && ((r = !0), (t.display = ""));
                    var n = {};
                    try {
                        n = this.node.getBBox();
                    } catch (a) {
                        n = { x: this.node.clientLeft, y: this.node.clientTop, width: this.node.clientWidth, height: this.node.clientHeight };
                    } finally {
                        (n = n || {}), r && (t.display = "none");
                    }
                    return e && this.hide(), n;
                }),
                ($.attr = function(t, n) {
                    if (this.removed) return this;
                    if (null == t) {
                        var a = {};
                        for (var i in this.attrs) this.attrs[e](i) && (a[i] = this.attrs[i]);
                        return a.gradient && "none" == a.fill && (a.fill = a.gradient) && delete a.gradient, (a.transform = this._.transform), a;
                    }
                    if (null == n && r.is(t, "string")) {
                        if ("fill" == t && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                        if ("transform" == t) return this._.transform;
                        for (var o = t.split(d), s = {}, l = 0, u = o.length; l < u; l++)
                            (t = o[l]), t in this.attrs ? (s[t] = this.attrs[t]) : r.is(this.paper.customAttributes[t], "function") ? (s[t] = this.paper.customAttributes[t].def) : (s[t] = r._availableAttrs[t]);
                        return u - 1 ? s : s[o[0]];
                    }
                    if (null == n && r.is(t, "array")) {
                        for (s = {}, l = 0, u = t.length; l < u; l++) s[t[l]] = this.attr(t[l]);
                        return s;
                    }
                    if (null != n) {
                        var p = {};
                        p[t] = n;
                    } else null != t && r.is(t, "object") && (p = t);
                    for (var h in p) c("raphael.attr." + h + "." + this.id, this, p[h]);
                    for (h in this.paper.customAttributes)
                        if (this.paper.customAttributes[e](h) && p[e](h) && r.is(this.paper.customAttributes[h], "function")) {
                            var f = this.paper.customAttributes[h].apply(this, [].concat(p[h]));
                            this.attrs[h] = p[h];
                            for (var m in f) f[e](m) && (p[m] = f[m]);
                        }
                    return C(this, p), this;
                }),
                ($.toFront = function() {
                    if (this.removed) return this;
                    var e = P(this.node);
                    e.parentNode.appendChild(e);
                    var t = this.paper;
                    return t.top != this && r._tofront(this, t), this;
                }),
                ($.toBack = function() {
                    if (this.removed) return this;
                    var e = P(this.node),
                        t = e.parentNode;
                    t.insertBefore(e, t.firstChild), r._toback(this, this.paper);
                    this.paper;
                    return this;
                }),
                ($.insertAfter = function(e) {
                    if (this.removed || !e) return this;
                    var t = P(this.node),
                        n = P(e.node || e[e.length - 1].node);
                    return n.nextSibling ? n.parentNode.insertBefore(t, n.nextSibling) : n.parentNode.appendChild(t), r._insertafter(this, e, this.paper), this;
                }),
                ($.insertBefore = function(e) {
                    if (this.removed || !e) return this;
                    var t = P(this.node),
                        n = P(e.node || e[0].node);
                    return n.parentNode.insertBefore(t, n), r._insertbefore(this, e, this.paper), this;
                }),
                ($.blur = function(e) {
                    var t = this;
                    if (0 !== +e) {
                        var n = g("filter"),
                            a = g("feGaussianBlur");
                        (t.attrs.blur = e), (n.id = r.createUUID()), g(a, { stdDeviation: +e || 1.5 }), n.appendChild(a), t.paper.defs.appendChild(n), (t._blur = n), g(t.node, { filter: "url(#" + n.id + ")" });
                    } else t._blur && (t._blur.parentNode.removeChild(t._blur), delete t._blur, delete t.attrs.blur), t.node.removeAttribute("filter");
                    return t;
                }),
                (r._engine.circle = function(e, t, r, n) {
                    var a = g("circle");
                    e.canvas && e.canvas.appendChild(a);
                    var i = new A(a, e);
                    return (i.attrs = { cx: t, cy: r, r: n, fill: "none", stroke: "#000" }), (i.type = "circle"), g(a, i.attrs), i;
                }),
                (r._engine.rect = function(e, t, r, n, a, i) {
                    var o = g("rect");
                    e.canvas && e.canvas.appendChild(o);
                    var s = new A(o, e);
                    return (s.attrs = { x: t, y: r, width: n, height: a, rx: i || 0, ry: i || 0, fill: "none", stroke: "#000" }), (s.type = "rect"), g(o, s.attrs), s;
                }),
                (r._engine.ellipse = function(e, t, r, n, a) {
                    var i = g("ellipse");
                    e.canvas && e.canvas.appendChild(i);
                    var o = new A(i, e);
                    return (o.attrs = { cx: t, cy: r, rx: n, ry: a, fill: "none", stroke: "#000" }), (o.type = "ellipse"), g(i, o.attrs), o;
                }),
                (r._engine.image = function(e, t, r, n, a, i) {
                    var o = g("image");
                    g(o, { x: r, y: n, width: a, height: i, preserveAspectRatio: "none" }), o.setAttributeNS(h, "href", t), e.canvas && e.canvas.appendChild(o);
                    var s = new A(o, e);
                    return (s.attrs = { x: r, y: n, width: a, height: i, src: t }), (s.type = "image"), s;
                }),
                (r._engine.text = function(e, t, n, a) {
                    var i = g("text");
                    e.canvas && e.canvas.appendChild(i);
                    var o = new A(i, e);
                    return (
                        (o.attrs = { x: t, y: n, "text-anchor": "middle", text: a, "font-family": r._availableAttrs["font-family"], "font-size": r._availableAttrs["font-size"], stroke: "none", fill: "#000" }),
                        (o.type = "text"),
                        C(o, o.attrs),
                        o
                    );
                }),
                (r._engine.setSize = function(e, t) {
                    return (
                        (this.width = e || this.width),
                        (this.height = t || this.height),
                        this.canvas.setAttribute("width", this.width),
                        this.canvas.setAttribute("height", this.height),
                        this._viewBox && this.setViewBox.apply(this, this._viewBox),
                        this
                    );
                }),
                (r._engine.create = function() {
                    var e = r._getContainer.apply(0, arguments),
                        t = e && e.container,
                        n = e.x,
                        a = e.y,
                        i = e.width,
                        o = e.height;
                    if (!t) throw new Error("SVG container not found.");
                    var s,
                        l = g("svg"),
                        d = "overflow:hidden;";
                    return (
                        (n = n || 0),
                        (a = a || 0),
                        (i = i || 512),
                        (o = o || 342),
                        g(l, { height: o, version: 1.1, width: i, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }),
                        1 == t ?
                        ((l.style.cssText = d + "position:absolute;left:" + n + "px;top:" + a + "px"), r._g.doc.body.appendChild(l), (s = 1)) :
                        ((l.style.cssText = d + "position:relative"), t.firstChild ? t.insertBefore(l, t.firstChild) : t.appendChild(l)),
                        (t = new r._Paper()),
                        (t.width = i),
                        (t.height = o),
                        (t.canvas = l),
                        t.clear(),
                        (t._left = t._top = 0),
                        s && (t.renderfix = function() {}),
                        t.renderfix(),
                        t
                    );
                }),
                (r._engine.setViewBox = function(e, t, r, n, a) {
                    c("raphael.setViewBox", this, this._viewBox, [e, t, r, n, a]);
                    var i,
                        s,
                        l = this.getSize(),
                        d = o(r / l.width, n / l.height),
                        u = this.top,
                        h = a ? "xMidYMid meet" : "xMinYMin";
                    for (
                        null == e ? (this._vbSize && (d = 1), delete this._vbSize, (i = "0 0 " + this.width + p + this.height)) : ((this._vbSize = d), (i = e + p + t + p + r + p + n)),
                        g(this.canvas, { viewBox: i, preserveAspectRatio: h }); d && u;

                    )
                        (s = "stroke-width" in u.attrs ? u.attrs["stroke-width"] : 1), u.attr({ "stroke-width": s }), (u._.dirty = 1), (u._.dirtyT = 1), (u = u.prev);
                    return (this._viewBox = [e, t, r, n, !!a]), this;
                }),
                (r.prototype.renderfix = function() {
                    var e,
                        t = this.canvas,
                        r = t.style;
                    try {
                        e = t.getScreenCTM() || t.createSVGMatrix();
                    } catch (n) {
                        e = t.createSVGMatrix();
                    }
                    var a = -e.e % 1,
                        i = -e.f % 1;
                    (a || i) && (a && ((this._left = (this._left + a) % 1), (r.left = this._left + "px")), i && ((this._top = (this._top + i) % 1), (r.top = this._top + "px")));
                }),
                (r.prototype.clear = function() {
                    r.eve("raphael.clear", this);
                    for (var e = this.canvas; e.firstChild;) e.removeChild(e.firstChild);
                    (this.bottom = this.top = null), (this.desc = g("desc")).appendChild(r._g.doc.createTextNode("Created with Raphaël " + r.version)), e.appendChild(this.desc), e.appendChild((this.defs = g("defs")));
                }),
                (r.prototype.remove = function() {
                    c("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                    for (var e in this) this[e] = "function" == typeof this[e] ? r._removedFactory(e) : null;
                });
                var D = r.st;
                for (var I in $)
                    $[e](I) &&
                    !D[e](I) &&
                    (D[I] = (function(e) {
                        return function() {
                            var t = arguments;
                            return this.forEach(function(r) {
                                r[e].apply(r, t);
                            });
                        };
                    })(I));
            }
        })(),
        (function() {
            if (r.vml) {
                var e = "hasOwnProperty",
                    t = String,
                    n = parseFloat,
                    a = Math,
                    i = a.round,
                    o = a.max,
                    s = a.min,
                    l = a.abs,
                    d = "fill",
                    c = /[, ]+/,
                    u = r.eve,
                    p = " progid:DXImageTransform.Microsoft",
                    h = " ",
                    f = "",
                    m = { M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x" },
                    g = /([clmz]),?([^clmz]*)/gi,
                    v = / progid:\S+Blur\([^\)]+\)/g,
                    y = /-?[^,\s-]+/g,
                    b = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",
                    S = 21600,
                    w = { path: 1, rect: 1, image: 1 },
                    C = { circle: 1, ellipse: 1 },
                    _ = function(e) {
                        var n = /[ahqstv]/gi,
                            a = r._pathToAbsolute;
                        if ((t(e).match(n) && (a = r._path2curve), (n = /[clmz]/g), a == r._pathToAbsolute && !t(e).match(n))) {
                            var o = t(e).replace(g, function(e, t, r) {
                                var n = [],
                                    a = "m" == t.toLowerCase(),
                                    o = m[t];
                                return (
                                    r.replace(y, function(e) {
                                        a && 2 == n.length && ((o += n + m["m" == t ? "l" : "L"]), (n = [])), n.push(i(e * S));
                                    }),
                                    o + n
                                );
                            });
                            return o;
                        }
                        var s,
                            l,
                            d = a(e);
                        o = [];
                        for (var c = 0, u = d.length; c < u; c++) {
                            (s = d[c]), (l = d[c][0].toLowerCase()), "z" == l && (l = "x");
                            for (var p = 1, v = s.length; p < v; p++) l += i(s[p] * S) + (p != v - 1 ? "," : f);
                            o.push(l);
                        }
                        return o.join(h);
                    },
                    x = function(e, t, n) {
                        var a = r.matrix();
                        return a.rotate(-e, 0.5, 0.5), { dx: a.x(t, n), dy: a.y(t, n) };
                    },
                    P = function(e, t, r, n, a, i) {
                        var o = e._,
                            s = e.matrix,
                            c = o.fillpos,
                            u = e.node,
                            p = u.style,
                            f = 1,
                            m = "",
                            g = S / t,
                            v = S / r;
                        if (((p.visibility = "hidden"), t && r)) {
                            if (((u.coordsize = l(g) + h + l(v)), (p.rotation = i * (t * r < 0 ? -1 : 1)), i)) {
                                var y = x(i, n, a);
                                (n = y.dx), (a = y.dy);
                            }
                            if ((t < 0 && (m += "x"), r < 0 && (m += " y") && (f = -1), (p.flip = m), (u.coordorigin = n * -g + h + a * -v), c || o.fillsize)) {
                                var b = u.getElementsByTagName(d);
                                (b = b && b[0]),
                                u.removeChild(b),
                                    c && ((y = x(i, s.x(c[0], c[1]), s.y(c[0], c[1]))), (b.position = y.dx * f + h + y.dy * f)),
                                    o.fillsize && (b.size = o.fillsize[0] * l(t) + h + o.fillsize[1] * l(r)),
                                    u.appendChild(b);
                            }
                            p.visibility = "visible";
                        }
                    };
                r.toString = function() {
                    return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version;
                };
                var A = function(e, r, n) {
                        for (var a = t(r).toLowerCase().split("-"), i = n ? "end" : "start", o = a.length, s = "classic", l = "medium", d = "medium"; o--;)
                            switch (a[o]) {
                                case "block":
                                case "classic":
                                case "oval":
                                case "diamond":
                                case "open":
                                case "none":
                                    s = a[o];
                                    break;
                                case "wide":
                                case "narrow":
                                    d = a[o];
                                    break;
                                case "long":
                                case "short":
                                    l = a[o];
                            }
                        var c = e.node.getElementsByTagName("stroke")[0];
                        (c[i + "arrow"] = s), (c[i + "arrowlength"] = l), (c[i + "arrowwidth"] = d);
                    },
                    $ = function(a, l) {
                        a.attrs = a.attrs || {};
                        var u = a.node,
                            p = a.attrs,
                            m = u.style,
                            g = w[a.type] && (l.x != p.x || l.y != p.y || l.width != p.width || l.height != p.height || l.cx != p.cx || l.cy != p.cy || l.rx != p.rx || l.ry != p.ry || l.r != p.r),
                            v = C[a.type] && (p.cx != l.cx || p.cy != l.cy || p.r != l.r || p.rx != l.rx || p.ry != l.ry),
                            y = a;
                        for (var b in l) l[e](b) && (p[b] = l[b]);
                        if (
                            (g && ((p.path = r._getPath[a.type](a)), (a._.dirty = 1)),
                                l.href && (u.href = l.href),
                                l.title && (u.title = l.title),
                                l.target && (u.target = l.target),
                                l.cursor && (m.cursor = l.cursor),
                                "blur" in l && a.blur(l.blur),
                                ((l.path && "path" == a.type) || g) &&
                                ((u.path = _(~t(p.path).toLowerCase().indexOf("r") ? r._pathToAbsolute(p.path) : p.path)),
                                    (a._.dirty = 1),
                                    "image" == a.type && ((a._.fillpos = [p.x, p.y]), (a._.fillsize = [p.width, p.height]), P(a, 1, 1, 0, 0, 0))),
                                "transform" in l && a.transform(l.transform),
                                v)
                        ) {
                            var x = +p.cx,
                                $ = +p.cy,
                                I = +p.rx || +p.r || 0,
                                E = +p.ry || +p.r || 0;
                            (u.path = r.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", i((x - I) * S), i(($ - E) * S), i((x + I) * S), i(($ + E) * S), i(x * S))), (a._.dirty = 1);
                        }
                        if ("clip-rect" in l) {
                            var O = t(l["clip-rect"]).split(c);
                            if (4 == O.length) {
                                (O[2] = +O[2] + +O[0]), (O[3] = +O[3] + +O[1]);
                                var k = u.clipRect || r._g.doc.createElement("div"),
                                    L = k.style;
                                (L.clip = r.format("rect({1}px {2}px {3}px {0}px)", O)),
                                u.clipRect ||
                                    ((L.position = "absolute"), (L.top = 0), (L.left = 0), (L.width = a.paper.width + "px"), (L.height = a.paper.height + "px"), u.parentNode.insertBefore(k, u), k.appendChild(u), (u.clipRect = k));
                            }
                            l["clip-rect"] || (u.clipRect && (u.clipRect.style.clip = "auto"));
                        }
                        if (a.textpath) {
                            var T = a.textpath.style;
                            l.font && (T.font = l.font),
                                l["font-family"] && (T.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, f) + '"'),
                                l["font-size"] && (T.fontSize = l["font-size"]),
                                l["font-weight"] && (T.fontWeight = l["font-weight"]),
                                l["font-style"] && (T.fontStyle = l["font-style"]);
                        }
                        if (
                            ("arrow-start" in l && A(y, l["arrow-start"]),
                                "arrow-end" in l && A(y, l["arrow-end"], 1),
                                null != l.opacity ||
                                null != l["stroke-width"] ||
                                null != l.fill ||
                                null != l.src ||
                                null != l.stroke ||
                                null != l["stroke-width"] ||
                                null != l["stroke-opacity"] ||
                                null != l["fill-opacity"] ||
                                null != l["stroke-dasharray"] ||
                                null != l["stroke-miterlimit"] ||
                                null != l["stroke-linejoin"] ||
                                null != l["stroke-linecap"])
                        ) {
                            var R = u.getElementsByTagName(d),
                                N = !1;
                            if (((R = R && R[0]), !R && (N = R = B(d)), "image" == a.type && l.src && (R.src = l.src), l.fill && (R.on = !0), (null != R.on && "none" != l.fill && null !== l.fill) || (R.on = !1), R.on && l.fill)) {
                                var q = t(l.fill).match(r._ISURL);
                                if (q) {
                                    R.parentNode == u && u.removeChild(R), (R.rotate = !0), (R.src = q[1]), (R.type = "tile");
                                    var M = a.getBBox(1);
                                    (R.position = M.x + h + M.y),
                                    (a._.fillpos = [M.x, M.y]),
                                    r._preload(q[1], function() {
                                        a._.fillsize = [this.offsetWidth, this.offsetHeight];
                                    });
                                } else
                                    (R.color = r.getRGB(l.fill).hex),
                                    (R.src = f),
                                    (R.type = "solid"),
                                    r.getRGB(l.fill).error && (y.type in { circle: 1, ellipse: 1 } || "r" != t(l.fill).charAt()) && D(y, l.fill, R) && ((p.fill = "none"), (p.gradient = l.fill), (R.rotate = !1));
                            }
                            if ("fill-opacity" in l || "opacity" in l) {
                                var F = ((+p["fill-opacity"] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+r.getRGB(l.fill).o + 1 || 2) - 1);
                                (F = s(o(F, 0), 1)), (R.opacity = F), R.src && (R.color = "none");
                            }
                            u.appendChild(R);
                            var U = u.getElementsByTagName("stroke") && u.getElementsByTagName("stroke")[0],
                                H = !1;
                            !U && (H = U = B("stroke")),
                                ((l.stroke && "none" != l.stroke) || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (U.on = !0),
                                ("none" == l.stroke || null === l.stroke || null == U.on || 0 == l.stroke || 0 == l["stroke-width"]) && (U.on = !1);
                            var z = r.getRGB(l.stroke);
                            U.on && l.stroke && (U.color = z.hex), (F = ((+p["stroke-opacity"] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+z.o + 1 || 2) - 1));
                            var V = 0.75 * (n(l["stroke-width"]) || 1);
                            if (
                                ((F = s(o(F, 0), 1)),
                                    null == l["stroke-width"] && (V = p["stroke-width"]),
                                    l["stroke-width"] && (U.weight = V),
                                    V && V < 1 && (F *= V) && (U.weight = 1),
                                    (U.opacity = F),
                                    l["stroke-linejoin"] && (U.joinstyle = l["stroke-linejoin"] || "miter"),
                                    (U.miterlimit = l["stroke-miterlimit"] || 8),
                                    l["stroke-linecap"] && (U.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"),
                                    "stroke-dasharray" in l)
                            ) {
                                var j = {
                                    "-": "shortdash",
                                    ".": "shortdot",
                                    "-.": "shortdashdot",
                                    "-..": "shortdashdotdot",
                                    ". ": "dot",
                                    "- ": "dash",
                                    "--": "longdash",
                                    "- .": "dashdot",
                                    "--.": "longdashdot",
                                    "--..": "longdashdotdot",
                                };
                                U.dashstyle = j[e](l["stroke-dasharray"]) ? j[l["stroke-dasharray"]] : f;
                            }
                            H && u.appendChild(U);
                        }
                        if ("text" == y.type) {
                            y.paper.canvas.style.display = f;
                            var G = y.paper.span,
                                W = 100,
                                Y = p.font && p.font.match(/\d+(?:\.\d*)?(?=px)/);
                            (m = G.style),
                            p.font && (m.font = p.font),
                                p["font-family"] && (m.fontFamily = p["font-family"]),
                                p["font-weight"] && (m.fontWeight = p["font-weight"]),
                                p["font-style"] && (m.fontStyle = p["font-style"]),
                                (Y = n(p["font-size"] || (Y && Y[0])) || 10),
                                (m.fontSize = Y * W + "px"),
                                y.textpath.string && (G.innerHTML = t(y.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                            var K = G.getBoundingClientRect();
                            (y.W = p.w = (K.right - K.left) / W),
                            (y.H = p.h = (K.bottom - K.top) / W),
                            (y.X = p.x),
                            (y.Y = p.y + y.H / 2),
                            ("x" in l || "y" in l) && (y.path.v = r.format("m{0},{1}l{2},{1}", i(p.x * S), i(p.y * S), i(p.x * S) + 1));
                            for (var Q = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Z = 0, J = Q.length; Z < J; Z++)
                                if (Q[Z] in l) {
                                    y._.dirty = 1;
                                    break;
                                }
                            switch (p["text-anchor"]) {
                                case "start":
                                    (y.textpath.style["v-text-align"] = "left"), (y.bbx = y.W / 2);
                                    break;
                                case "end":
                                    (y.textpath.style["v-text-align"] = "right"), (y.bbx = -y.W / 2);
                                    break;
                                default:
                                    (y.textpath.style["v-text-align"] = "center"), (y.bbx = 0);
                            }
                            y.textpath.style["v-text-kern"] = !0;
                        }
                    },
                    D = function(e, i, o) {
                        e.attrs = e.attrs || {};
                        var s = (e.attrs, Math.pow),
                            l = "linear",
                            d = ".5 .5";
                        if (
                            ((e.attrs.gradient = i),
                                (i = t(i).replace(r._radial_gradient, function(e, t, r) {
                                    return (l = "radial"), t && r && ((t = n(t)), (r = n(r)), s(t - 0.5, 2) + s(r - 0.5, 2) > 0.25 && (r = a.sqrt(0.25 - s(t - 0.5, 2)) * (2 * (r > 0.5) - 1) + 0.5), (d = t + h + r)), f;
                                })),
                                (i = i.split(/\s*\-\s*/)),
                                "linear" == l)
                        ) {
                            var c = i.shift();
                            if (((c = -n(c)), isNaN(c))) return null;
                        }
                        var u = r._parseDots(i);
                        if (!u) return null;
                        if (((e = e.shape || e.node), u.length)) {
                            e.removeChild(o), (o.on = !0), (o.method = "none"), (o.color = u[0].color), (o.color2 = u[u.length - 1].color);
                            for (var p = [], m = 0, g = u.length; m < g; m++) u[m].offset && p.push(u[m].offset + h + u[m].color);
                            (o.colors = p.length ? p.join() : "0% " + o.color),
                            "radial" == l ? ((o.type = "gradientTitle"), (o.focus = "100%"), (o.focussize = "0 0"), (o.focusposition = d), (o.angle = 0)) : ((o.type = "gradient"), (o.angle = (270 - c) % 360)),
                                e.appendChild(o);
                        }
                        return 1;
                    },
                    I = function(e, t) {
                        (this[0] = this.node = e),
                        (e.raphael = !0),
                        (this.id = r._oid++),
                        (e.raphaelid = this.id),
                        (this.X = 0),
                        (this.Y = 0),
                        (this.attrs = {}),
                        (this.paper = t),
                        (this.matrix = r.matrix()),
                        (this._ = { transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1 }), !t.bottom && (t.bottom = this),
                            (this.prev = t.top),
                            t.top && (t.top.next = this),
                            (t.top = this),
                            (this.next = null);
                    },
                    E = r.el;
                (I.prototype = E),
                (E.constructor = I),
                (E.transform = function(e) {
                    if (null == e) return this._.transform;
                    var n,
                        a = this.paper._viewBoxShift,
                        i = a ? "s" + [a.scale, a.scale] + "-1-1t" + [a.dx, a.dy] : f;
                    a && (n = e = t(e).replace(/\.{3}|\u2026/g, this._.transform || f)), r._extractTransform(this, i + e);
                    var o,
                        s = this.matrix.clone(),
                        l = this.skew,
                        d = this.node,
                        c = ~t(this.attrs.fill).indexOf("-"),
                        u = !t(this.attrs.fill).indexOf("url(");
                    if ((s.translate(1, 1), u || c || "image" == this.type))
                        if (((l.matrix = "1 0 0 1"), (l.offset = "0 0"), (o = s.split()), (c && o.noRotation) || !o.isSimple)) {
                            d.style.filter = s.toFilter();
                            var p = this.getBBox(),
                                m = this.getBBox(1),
                                g = p.x - m.x,
                                v = p.y - m.y;
                            (d.coordorigin = g * -S + h + v * -S), P(this, 1, 1, g, v, 0);
                        } else(d.style.filter = f), P(this, o.scalex, o.scaley, o.dx, o.dy, o.rotate);
                    else(d.style.filter = f), (l.matrix = t(s)), (l.offset = s.offset());
                    return null !== n && ((this._.transform = n), r._extractTransform(this, n)), this;
                }),
                (E.rotate = function(e, r, a) {
                    if (this.removed) return this;
                    if (null != e) {
                        if (((e = t(e).split(c)), e.length - 1 && ((r = n(e[1])), (a = n(e[2]))), (e = n(e[0])), null == a && (r = a), null == r || null == a)) {
                            var i = this.getBBox(1);
                            (r = i.x + i.width / 2), (a = i.y + i.height / 2);
                        }
                        return (this._.dirtyT = 1), this.transform(this._.transform.concat([
                            ["r", e, r, a]
                        ])), this;
                    }
                }),
                (E.translate = function(e, r) {
                    return this.removed ?
                        this :
                        ((e = t(e).split(c)),
                            e.length - 1 && (r = n(e[1])),
                            (e = n(e[0]) || 0),
                            (r = +r || 0),
                            this._.bbox && ((this._.bbox.x += e), (this._.bbox.y += r)),
                            this.transform(this._.transform.concat([
                                ["t", e, r]
                            ])),
                            this);
                }),
                (E.scale = function(e, r, a, i) {
                    if (this.removed) return this;
                    if (
                        ((e = t(e).split(c)),
                            e.length - 1 && ((r = n(e[1])), (a = n(e[2])), (i = n(e[3])), isNaN(a) && (a = null), isNaN(i) && (i = null)),
                            (e = n(e[0])),
                            null == r && (r = e),
                            null == i && (a = i),
                            null == a || null == i)
                    )
                        var o = this.getBBox(1);
                    return (a = null == a ? o.x + o.width / 2 : a), (i = null == i ? o.y + o.height / 2 : i), this.transform(this._.transform.concat([
                        ["s", e, r, a, i]
                    ])), (this._.dirtyT = 1), this;
                }),
                (E.hide = function() {
                    return !this.removed && (this.node.style.display = "none"), this;
                }),
                (E.show = function() {
                    return !this.removed && (this.node.style.display = f), this;
                }),
                (E.auxGetBBox = r.el.getBBox),
                (E.getBBox = function() {
                    var e = this.auxGetBBox();
                    if (this.paper && this.paper._viewBoxShift) {
                        var t = {},
                            r = 1 / this.paper._viewBoxShift.scale;
                        return (
                            (t.x = e.x - this.paper._viewBoxShift.dx),
                            (t.x *= r),
                            (t.y = e.y - this.paper._viewBoxShift.dy),
                            (t.y *= r),
                            (t.width = e.width * r),
                            (t.height = e.height * r),
                            (t.x2 = t.x + t.width),
                            (t.y2 = t.y + t.height),
                            t
                        );
                    }
                    return e;
                }),
                (E._getBBox = function() {
                    return this.removed ? {} : { x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H };
                }),
                (E.remove = function() {
                    if (!this.removed && this.node.parentNode) {
                        this.paper.__set__ && this.paper.__set__.exclude(this),
                            r.eve.unbind("raphael.*.*." + this.id),
                            r._tear(this, this.paper),
                            this.node.parentNode.removeChild(this.node),
                            this.shape && this.shape.parentNode.removeChild(this.shape);
                        for (var e in this) this[e] = "function" == typeof this[e] ? r._removedFactory(e) : null;
                        this.removed = !0;
                    }
                }),
                (E.attr = function(t, n) {
                    if (this.removed) return this;
                    if (null == t) {
                        var a = {};
                        for (var i in this.attrs) this.attrs[e](i) && (a[i] = this.attrs[i]);
                        return a.gradient && "none" == a.fill && (a.fill = a.gradient) && delete a.gradient, (a.transform = this._.transform), a;
                    }
                    if (null == n && r.is(t, "string")) {
                        if (t == d && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                        for (var o = t.split(c), s = {}, l = 0, p = o.length; l < p; l++)
                            (t = o[l]), t in this.attrs ? (s[t] = this.attrs[t]) : r.is(this.paper.customAttributes[t], "function") ? (s[t] = this.paper.customAttributes[t].def) : (s[t] = r._availableAttrs[t]);
                        return p - 1 ? s : s[o[0]];
                    }
                    if (this.attrs && null == n && r.is(t, "array")) {
                        for (s = {}, l = 0, p = t.length; l < p; l++) s[t[l]] = this.attr(t[l]);
                        return s;
                    }
                    var h;
                    null != n && ((h = {}), (h[t] = n)), null == n && r.is(t, "object") && (h = t);
                    for (var f in h) u("raphael.attr." + f + "." + this.id, this, h[f]);
                    if (h) {
                        for (f in this.paper.customAttributes)
                            if (this.paper.customAttributes[e](f) && h[e](f) && r.is(this.paper.customAttributes[f], "function")) {
                                var m = this.paper.customAttributes[f].apply(this, [].concat(h[f]));
                                this.attrs[f] = h[f];
                                for (var g in m) m[e](g) && (h[g] = m[g]);
                            }
                        h.text && "text" == this.type && (this.textpath.string = h.text), $(this, h);
                    }
                    return this;
                }),
                (E.toFront = function() {
                    return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && r._tofront(this, this.paper), this;
                }),
                (E.toBack = function() {
                    return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), r._toback(this, this.paper)), this);
                }),
                (E.insertAfter = function(e) {
                    return this.removed ?
                        this :
                        (e.constructor == r.st.constructor && (e = e[e.length - 1]),
                            e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node),
                            r._insertafter(this, e, this.paper),
                            this);
                }),
                (E.insertBefore = function(e) {
                    return this.removed ? this : (e.constructor == r.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), r._insertbefore(this, e, this.paper), this);
                }),
                (E.blur = function(e) {
                    var t = this.node.runtimeStyle,
                        n = t.filter;
                    return (
                        (n = n.replace(v, f)),
                        0 !== +e ?
                        ((this.attrs.blur = e), (t.filter = n + h + p + ".Blur(pixelradius=" + (+e || 1.5) + ")"), (t.margin = r.format("-{0}px 0 0 -{0}px", i(+e || 1.5)))) :
                        ((t.filter = n), (t.margin = 0), delete this.attrs.blur),
                        this
                    );
                }),
                (r._engine.path = function(e, t) {
                    var r = B("shape");
                    (r.style.cssText = b), (r.coordsize = S + h + S), (r.coordorigin = t.coordorigin);
                    var n = new I(r, t),
                        a = { fill: "none", stroke: "#000" };
                    e && (a.path = e), (n.type = "path"), (n.path = []), (n.Path = f), $(n, a), t.canvas.appendChild(r);
                    var i = B("skew");
                    return (i.on = !0), r.appendChild(i), (n.skew = i), n.transform(f), n;
                }),
                (r._engine.rect = function(e, t, n, a, i, o) {
                    var s = r._rectPath(t, n, a, i, o),
                        l = e.path(s),
                        d = l.attrs;
                    return (l.X = d.x = t), (l.Y = d.y = n), (l.W = d.width = a), (l.H = d.height = i), (d.r = o), (d.path = s), (l.type = "rect"), l;
                }),
                (r._engine.ellipse = function(e, t, r, n, a) {
                    var i = e.path();
                    i.attrs;
                    return (i.X = t - n), (i.Y = r - a), (i.W = 2 * n), (i.H = 2 * a), (i.type = "ellipse"), $(i, { cx: t, cy: r, rx: n, ry: a }), i;
                }),
                (r._engine.circle = function(e, t, r, n) {
                    var a = e.path();
                    a.attrs;
                    return (a.X = t - n), (a.Y = r - n), (a.W = a.H = 2 * n), (a.type = "circle"), $(a, { cx: t, cy: r, r: n }), a;
                }),
                (r._engine.image = function(e, t, n, a, i, o) {
                    var s = r._rectPath(n, a, i, o),
                        l = e.path(s).attr({ stroke: "none" }),
                        c = l.attrs,
                        u = l.node,
                        p = u.getElementsByTagName(d)[0];
                    return (
                        (c.src = t),
                        (l.X = c.x = n),
                        (l.Y = c.y = a),
                        (l.W = c.width = i),
                        (l.H = c.height = o),
                        (c.path = s),
                        (l.type = "image"),
                        p.parentNode == u && u.removeChild(p),
                        (p.rotate = !0),
                        (p.src = t),
                        (p.type = "tile"),
                        (l._.fillpos = [n, a]),
                        (l._.fillsize = [i, o]),
                        u.appendChild(p),
                        P(l, 1, 1, 0, 0, 0),
                        l
                    );
                }),
                (r._engine.text = function(e, n, a, o) {
                    var s = B("shape"),
                        l = B("path"),
                        d = B("textpath");
                    (n = n || 0),
                    (a = a || 0),
                    (o = o || ""),
                    (l.v = r.format("m{0},{1}l{2},{1}", i(n * S), i(a * S), i(n * S) + 1)),
                    (l.textpathok = !0),
                    (d.string = t(o)),
                    (d.on = !0),
                    (s.style.cssText = b),
                    (s.coordsize = S + h + S),
                    (s.coordorigin = "0 0");
                    var c = new I(s, e),
                        u = { fill: "#000", stroke: "none", font: r._availableAttrs.font, text: o };
                    (c.shape = s),
                    (c.path = l),
                    (c.textpath = d),
                    (c.type = "text"),
                    (c.attrs.text = t(o)),
                    (c.attrs.x = n),
                    (c.attrs.y = a),
                    (c.attrs.w = 1),
                    (c.attrs.h = 1),
                    $(c, u),
                        s.appendChild(d),
                        s.appendChild(l),
                        e.canvas.appendChild(s);
                    var p = B("skew");
                    return (p.on = !0), s.appendChild(p), (c.skew = p), c.transform(f), c;
                }),
                (r._engine.setSize = function(e, t) {
                    var n = this.canvas.style;
                    return (
                        (this.width = e),
                        (this.height = t),
                        e == +e && (e += "px"),
                        t == +t && (t += "px"),
                        (n.width = e),
                        (n.height = t),
                        (n.clip = "rect(0 " + e + " " + t + " 0)"),
                        this._viewBox && r._engine.setViewBox.apply(this, this._viewBox),
                        this
                    );
                }),
                (r._engine.setViewBox = function(e, t, n, a, i) {
                    r.eve("raphael.setViewBox", this, this._viewBox, [e, t, n, a, i]);
                    var o,
                        s,
                        l = this.getSize(),
                        d = l.width,
                        c = l.height;
                    return (
                        i && ((o = c / a), (s = d / n), n * o < d && (e -= (d - n * o) / 2 / o), a * s < c && (t -= (c - a * s) / 2 / s)),
                        (this._viewBox = [e, t, n, a, !!i]),
                        (this._viewBoxShift = { dx: -e, dy: -t, scale: l }),
                        this.forEach(function(e) {
                            e.transform("...");
                        }),
                        this
                    );
                });
                var B;
                (r._engine.initWin = function(e) {
                    var t = e.document;
                    t.styleSheets.length < 31 ? t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : t.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
                    try {
                        !t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                            (B = function(e) {
                                return t.createElement("<rvml:" + e + ' class="rvml">');
                            });
                    } catch (r) {
                        B = function(e) {
                            return t.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                        };
                    }
                }),
                r._engine.initWin(r._g.win),
                    (r._engine.create = function() {
                        var e = r._getContainer.apply(0, arguments),
                            t = e.container,
                            n = e.height,
                            a = e.width,
                            i = e.x,
                            o = e.y;
                        if (!t) throw new Error("VML container not found.");
                        var s = new r._Paper(),
                            l = (s.canvas = r._g.doc.createElement("div")),
                            d = l.style;
                        return (
                            (i = i || 0),
                            (o = o || 0),
                            (a = a || 512),
                            (n = n || 342),
                            (s.width = a),
                            (s.height = n),
                            a == +a && (a += "px"),
                            n == +n && (n += "px"),
                            (s.coordsize = 1e3 * S + h + 1e3 * S),
                            (s.coordorigin = "0 0"),
                            (s.span = r._g.doc.createElement("span")),
                            (s.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;"),
                            l.appendChild(s.span),
                            (d.cssText = r.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", a, n)),
                            1 == t ? (r._g.doc.body.appendChild(l), (d.left = i + "px"), (d.top = o + "px"), (d.position = "absolute")) : t.firstChild ? t.insertBefore(l, t.firstChild) : t.appendChild(l),
                            (s.renderfix = function() {}),
                            s
                        );
                    }),
                    (r.prototype.clear = function() {
                        r.eve("raphael.clear", this),
                            (this.canvas.innerHTML = f),
                            (this.span = r._g.doc.createElement("span")),
                            (this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;"),
                            this.canvas.appendChild(this.span),
                            (this.bottom = this.top = null);
                    }),
                    (r.prototype.remove = function() {
                        r.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
                        for (var e in this) this[e] = "function" == typeof this[e] ? r._removedFactory(e) : null;
                        return !0;
                    });
                var O = r.st;
                for (var k in E)
                    E[e](k) &&
                    !O[e](k) &&
                    (O[k] = (function(e) {
                        return function() {
                            var t = arguments;
                            return this.forEach(function(r) {
                                r[e].apply(r, t);
                            });
                        };
                    })(k));
            }
        })(),
        $.was ? (A.win.Raphael = r) : (Raphael = r),
        "object" == typeof exports && (module.exports = r),
        r
    );
});
var tStrings;
(tStrings = {
    field: { en: "English Label" },
    creditReport_Summary_AccountSummary: { en: "Account Summary" },
    creditReport_Summary_ReportDate: { en: "Credit Report Period" },
    creditReport_Summary_CreditScore: { en: "Score" },
    creditReport_Summary_TotalBalances: { en: "Balances" },
    creditReport_Summary_TotalMonthlyPayments: { en: "Payments" },
    creditReport_Summary_TotalAccounts: { en: "Credit Accounts" },
    creditReport_Summary_OpenAccts: { en: "Open Accounts" },
    creditReport_Summary_CloseAccounts: { en: "Closed Accounts" },
    creditReport_Summary_DelinquentAccounts: { en: "Delinquent" },
    creditReport_Summary_InquirySummary: { en: "Inquiries (6 years)" },
    creditReport_Summary_DerogatoryAccounts: { en: "Derogatory" },
    creditReport_Summary_PublicRecords: { en: "Public Records" },
    creditReport_SI_SummaryReport: { en: "Summary Report", hi: "सारांश रिपोर्ट", ta: "சுருக்க அறிக்கை", te: "సారాంశ నివేదిక", be: "রিপোর্টের সারসংক্ষেপ" },
    creditReport_SI_Name: { en: "Name", hi: "नाम", ta: "பெயர்", te: "పేరు", be: "নাম" },
    creditReport_SI_DOB: { en: "Date of Birth", hi: "जन्म तिथि", ta: "பிறந்த தேதி", te: "జన్మదినం", be: "জন্মতারিখ" },
    creditReport_SI_Gender: { en: "Gender", hi: "लिंग", ta: "பாலினம்", te: "లింగం", be: "লিঙ্গ" },
    creditReport_SI_Address: { en: "Address", hi: "पता", ta: "முகவரி", te: "చిరునామా", be: "ঠিকানা" },
    creditReport_SI_Email: { en: "Email", hi: "ईमेल", ta: "மின்னஞ்சல்", te: "ఇమెయిల్", be: "ইমেল" },
    creditReport_SI_Mobile: { en: "Mobile", hi: "मोबाइल", ta: "மொபைல்", te: "మొబైల్", be: "মোবাইল" },
    creditReport_SI_Score: { en: "Score", hi: "स्कोर", ta: "மதிப்பெண்", te: "స్కోర్", be: "স্কোর" },
    creditReport_SI_AmntDue: { en: "Amount Overdue", hi: "कुल अतिदेय अमाउंट", ta: "தற்போதைய மொத்த இருப்பு", te: "మొత్తం బకాయి", be: "মোট বকেয়া রাশি" },
    creditReport_SI_Cbalance: { en: "Current Balance", hi: "कुल मौजूदा बैलेंस", ta: "தற்போதைய மொத்த பாக்கி", te: "ప్రస్తుత బ్యాలెన్స్ మొత్తం", be: "মোট বর্তমান ব্যালেন্স" },
    creditReport_SI_Accounts: { en: "Accounts", hi: "खाते", ta: "அக்கவுண்ட்டுகள்", te: "ఖాతాలు", be: "অ্যাকাউণ্ট" },
    creditReport_SI_CreditCards: { en: "Credit Cards", hi: "क्रेडिट कार्ड", ta: "கிரெடிட் கார்டுகள்", te: "క్రెడిట్ కార్డ్", be: "টি ক্রেডিট কার্ড" },
    creditReport_SI_Loans: { en: "Loans", hi: "ऋण", ta: "லோன்கள்", te: "లోన్లు", be: "টি ঋণ" },
    creditReport_SI_Open: { en: "Open", hi: "खुले", ta: "திறக்கப்பட்டது", te: "తెరిచినవి", be: "টি খোলা রয়েছে" },
    creditReport_SI_Closed: { en: "Closed", hi: "बंद किए गए", ta: "மூடப்பட்டது", te: "మూసివేసినవి", be: "টি বন্ধ করা হয়েছে" },
    creditReport_SI_LatePayments: { en: "Count of late payments", hi: "देरी से भुगतान करने की घटनाओं की संख्या", ta: "தாமதக் கட்டணங்களின் எண்ணிக்கை", te: "ఆలస్యంగా చెల్లింపు చేసిన పర్యాయాల సంఖ్య,", be: "বিলম্বিত পেমেন্টের সংখ্যা" },
    creditReport_SI_12m: { en: "Last 12 months", hi: "पिछले 12 महीने", ta: "கடந்த 12 மாதங்கள்", te: "గత 12 నెలల్లో", be: "গত 12 মাসে" },
    creditReport_SI_36m: { en: "Last 36 months", hi: "पिछले 36 महीने", ta: "கடந்த 36 மாதங்கள்", te: "గత 36 నెలల్లో", be: "গত 36 মাসে" },
    creditReport_SI_Up30late: { en: "1-30 days late", hi: "1-30 दिन की देरी", ta: "1-30  நாட்கள் தாமதம்", te: "1-30 రోజులు ఆలస్యం చేసినవి", be: "1-30 দিন বিলম্বে" },
    creditReport_SI_Up60late: { en: "31-60 days late", hi: "31-60 दिन की देरी", ta: "31-60 நாட்கள் தாமதம்", te: "31-60 రోజులు ఆలస్యం చేసినవి", be: "31-60 দিন বিলম্বে" },
    creditReport_SI_Up90late: { en: "61-90 days late", hi: "61-90 दिन की देरी", ta: "61-90 நாட்கள் தாமதம்", te: "61-90 రోజులు ఆలస్యం చేసినవి", be: "61-90 দিন বিলম্বে", be: "61-90 দিন বিলম্বে" },
    creditReport_SI_Plus90late: { en: "More than 90 days late", hi: "90 दिन से ज़्यादा की देरी", ta: "90 நாட்களுக்கு மேல் தாமதம்", te: "90 రోజుల కంటే ఆలస్యం చేసినవి", be: "90 দিনের বেশি বিলম্বে" },
    creditReport_SI_SMA: { en: "SMA (Special Mention Accounts)", hi: "SMA (विशेष उल्लिखित खाता)", ta: "SMA (சிறப்பு குறிப்பு அக்கவுண்ட்) ", te: "SMA (స్పెషల్ మెన్షన్ అకౌంట్)", be: "SMA (বিশেষ উল্লেখযুক্ত অ্যাকাউন্ট)" },
    creditReport_SI_DBT: { en: "DBT (Doubtful)", hi: "DBT (संदिग्ध)", ta: "DBT (சந்தேகத்திற்குரியது)", te: "DBT(అనుమానాస్పదం)", be: "DBT(সন্দেহজনক)" },
    creditReport_SI_Loss: { en: "Loss", hi: "LSS (हानि)", ta: "LSS (இழப்பு)", te: "LSS (నష్టం)", be: "LSS (ক্ষতি)" },
    creditReport_SI_SUB: { en: "SUB", hi: "सब", ta: "எஸ்யூபி", te: "సబ్", be: "SUB" },
    creditReport_SI_DerogatoryStatus: { en: "Count of Derogatory Status", hi: "अनादरण की घटनाओं की संख्या", ta: "தரம்குறைந்த நிலையின் எண்ணிக்கை", te: "అప్రతిష్ట స్థితిని పొందిన పర్యాయాల సంఖ్య,", be: "মর্যাদাহানীকর স্থিতির সংখ্যা" },
    creditReport_SI_WritteOff: { en: "Written Off", hi: "अपलिखित किया गया", ta: "தள்ளுபடி செய்யப்பட்டது", te: "మాఫీ చేయబడినవి", be: "টি বাতিল করা হয়েছে" },
    creditReport_SI_WO: { en: "Post (WO) Settled", hi: "निपटान (WO) के बाद", ta: "(WO) தீர்க்கப்பட்டபின்", te: "మాఫీ (WO) అనంతరం సెటిల్ చేసుకున్నవి", be: "টির পরবর্তীতে (WO) নিষ্পত্তি হয়েছে" },
    creditReport_SI_AccountSold: {
        en: "Written off and account sold",
        hi: "अपलिखित किया गया और खाता बेचा गया",
        ta: "தள்ளுபடி செய்யப்பட்டது மற்றும் விற்கப்பட்ட அக்கவுண்ட்",
        te: "మాఫీ చేయబడిన మరియు ఖాతా అమ్మబడినవి",
        be: "টি বাতিল করা হয়েছে ও অ্যাকাউন্ট বিক্রি করা হয়েছে",
    },
    creditReport_SI_SuitFiled: { en: "Suit Filed", hi: "मुकदमा फ़ाइल किया गया", ta: "வழக்கு பதிவு", te: "వ్యాజ్యం దాఖలైనవి", be: "টি মামলা দায়ের করা হয়েছে" },
    creditReport_SI_WillfulDefault: { en: "Willful Default", hi: "स्वैच्छिक डिफ़ॉल्ट", ta: "தன்னிச்சயான தவறுதல்", te: "ఉద్దేశ పూర్వక ఎగవేత", be: "টি ইচ্ছাকৃত ডিফল্ট" },
    creditReport_SI_SFWD: {
        en: "Suit Filed (Willfull Default)",
        hi: "मुकदमा फ़ाइल किया गया (स्वैच्छिक डिफ़ॉल्ट)",
        ta: "வழக்கு பதிவு (தன்னிச்சயான தவறுதல்)",
        te: "వ్యాజ్యం దాఖలైనవి (ఉద్దేశపూర్వక ఎగవేత)",
        be: "টি মামলা দায়ের করা হয়েছে (ইচ্ছাকৃত ডিফল্ট)",
    },
    creditReport_SI_UnderDispute: { en: "Accounts under dispute", hi: "विवाद के अंतर्गत खाते", ta: "சர்ச்சையிலுள்ள அக்கவுண்ட்", te: "వివాదంలో ఉన్న ఖాతాలు", be: "বিতর্কযুক্ত অ্যাকাউন্টগুলি" },
    creditReport_SI_Enquiries: { en: "Enquiries", hi: "पूछताछ", ta: "விசாரணைகள்", te: "విచారణలు", be: "অনুসন্ধানসমূহ" },
    creditReport_SI_Last3year: { en: "Last 3 years", hi: "पिछले 3 वर्ष में", ta: "கடந்த 3 ஆண்டுகளில்", te: "గత 3 సంవత్సరాలలో", be: "গত 3 বছরে " },
    creditReport_SI_Total: { en: "Total", hi: "कुल", ta: "மொத்தம்", te: "మొత్తం", be: "মোট " },
    creditReport_SI_UpgradeMessage: {
        en: "There have been changes to your CIBIL Score & Report in the past ",
        hi: "पिछले दिनों में आपके Cibil स्कोर और रिपोर्ट में बदलाव हुए हैं. ",
        ta: "உங்கள் CIBIL மதிப்பெண் மற்றும் அறிக்கையில் மாற்றங்கள் செய்யப்பட்டுள்ளன ",
        te: "రోజుల్లో మీ CIBIL స్కోర్ మరియు రిపోర్ట్లో మార్పులు చోటుచేసుకున్నాయి ",
        be: "গত আপনার Cibil স্কোর ও রিপোর্টে পরিবর্তন হয়েছে। ",
    },
    creditReport_SI_Day: { en: " day", hi: " दिनों", ta: " நாட்களில்", te: " రోజుల్లో", be: " দিনে" },
    creditReport_SI_Days: { en: " days", hi: " दिनों", ta: " நாட்களில்", te: " రోజుల్లో", be: " দিনে" },
    creditReport_SI_CTAMessage: {
        en: "Upgrade now to see the current details of your CIBIL Score & Report",
        hi: "Cibil स्कोर के मौजूदा विवरण और रिपोर्ट देखने के लिए अभी अपग्रेड करें",
        ta: "இப்போது மேம்படுத்தி CIBIL ஸ்கோர் மற்றும் அறிக்கையின் தற்போதைய விவரங்களைக் காணவும்.",
        te: "Cibil స్కోరు మరియు రిపోర్ట్ ప్రస్తుత వివరాలను చూడటానికి ఇప్పుడే అప్గ్రేడ్ చేసుకోండి.",
        be: "Cibil স্কোর ও রিপোর্টের বর্তমান বিবরণ দেখতে এখনই আপগ্রেড করুন।",
    },
    creditReport_SI_CTA: { en: "Upgrade now", hi: "लिए अभी अपग्रेड करें", ta: "இப்போது மேம்படுத்து ", te: "ఇప్పుడే అప్గ్రేడ్ చేసుకోండి", be: "এখনই আপগ্রেড করুন" },
    creditReport_PI_PersonalInformation: { en: "Personal Information", ta: "தனிப்பட்ட தகவல்", te: "వ్యక్తిగత సమాచారం", be: "ব্যক্তিগত তথ্য" },
    creditReport_PI_Name: { en: "Name", hi: "नाम", ta: "பெயர்", te: "పేరు", be: "নাম" },
    creditReport_PI_DOB: { en: "DOB", hi: "जन्म तिथि", ta: "பிறந்த தேதி", te: "పుట్టినతేదీ", be: "জন্মতারিখv" },
    creditReport_PI_Gender: { en: "Gender", hi: "लिंग", ta: "பாலினம்", te: "లింగము", be: "লিঙ্গ" },
    creditReport_PI_PersonalInformation1: { en: "Personal Information", ta: "தனிப்பட்ட தகவல்", te: "వ్యక్తిగత సమాచారం", be: "ব্যক্তিগত তথ্য" },
    creditReport_PI_IdentificationType_1: { en: "Identification ", hi: "पहचान का ", ta: "அடையாள ", te: "గుర్తింపు ", be: "পরিচয়পত্র " },
    creditReport_PI_IdentificationType_2: { en: "Type", hi: "प्रकार", ta: "வகை", te: "రకం", be: "প্রকার" },
    creditReport_PI_Number: { en: "Number", hi: "संख्या", ta: "எண்", te: "సంఖ్య", be: "নম্বর" },
    creditReport_PI_IssueDate_1: { en: "Issue ", hi: "जारी करने की ", ta: "வழங்கல் ", te: "జారీ ", be: "জারি করা " },
    creditReport_PI_IssueDate_2: { en: "Date", hi: "तारीख", ta: "தேதி", te: "తేదీ", be: "তারিখ" },
    creditReport_PI_ExpirationDate: { en: "Expiration Date", hi: "समाप्ति की तिथि", ta: "காலாவதி தேதி", te: "గడువు ముగిసే తేదీ", be: "মেয়াদ শেষ হওয়ার তারিখ" },
    creditReport_CI_Address: { en: "Address", hi: "पता", ta: "முகவரி", te: "చిరునామా", be: "ঠিকানা" },
    creditReport_CI_Category: { en: "Category", hi: "वर्ग", ta: "வகை", te: "తరగతి", be: "শ্রেণী" },
    creditReport_CI_ResidenceCode_1: { en: "Residence ", hi: "निवास का ", ta: "இருப்பிட ", te: "రెసిడెన్స్ ", be: "বাসস্থান " },
    creditReport_CI_ResidenceCode_2: { en: "Code", hi: "कोड", ta: "குறியீடு", te: "కోడ్", be: "কোড" },
    creditReport_CI_DateReported_1: { en: "Date ", hi: "रिपोर्ट करने ", ta: "அறிவிக்கப்பட்ட ", te: "నివేదించిన ", be: "তারিখ " },
    creditReport_CI_DateReported_2: { en: "Reported", hi: "की तारीख", ta: "தேதி", te: "తేదీ", be: "রিপোর্ট করা হয়েছে" },
    creditReport_CI_TelephoneNumberType: { en: "Telephone Number Type", hi: "टेलीफ़ोन नंबर का प्रकार", ta: "தொலைபேசி எண் வகை", te: "టెలిఫోన్ నంబర్ రకము", be: "টেলিফোন নম্বরের প্রকার" },
    creditReport_CI_TelephoneNumber: { en: "Telephone Number", hi: "टेलीफ़ोन नंबर ", ta: "தொலைபேசி எண்", te: "టెలిఫోన్ నెంబర్", be: "টেলিফোন নম্বর" },
    creditReport_CI_TelephoneExtension: { en: "Telephone Extension", hi: "टेलीफ़ोन एक्सटेंशन", ta: "தொலைபேசி விரிவாக்கம்", te: "టెలిఫోన్ ఎక్స్టెన్షన్", be: "টেলিফোন এক্সটেনশন" },
    creditReport_CI_EmailAddresses: { en: "Email Addresses", hi: "ईमेल पता ", ta: "ஈமெயில் முகவரி ", te: "ఇ-మెయిల్ చిరునామా", be: "ইমেল অ্যাড্রেসগুলি" },
    creditReport_CI_CellPhone: { en: "Cellphone", hi: "सेल फोन", ta: "கைப்பேசி ", te: "సెల్‌ఫోన్", be: "সেলফোন" },
    creditReport_SelectOption: { en: "Please select an option", hi: "कृपया एक विकल्प चुनें", ta: "ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும் ", te: "దయచేసి ఒక ఎంపికను ఎంచుకోండి", be: "অনুগ্রহ করে একটি বিকল্প বেছে নিন" },
    creditReport_validAccount: {
        en: "Enter a valid account number",
        hi: "कोई मान्य अकाउंट नंबर डालें",
        ta: "ஒரு செல்லுபடியாகும் அக்கவுண்ட் எண்ணை உள்ளிடவும்",
        te: "చెల్లుబాటు అయ్యే అకౌంట్ నంబర్ ఎంటర్ చేయండి",
        be: "একটি বৈধ অ্যাকাউন্ট নম্বর লিখুন",
    },
    creditReport_MultipleAccount: {
        en: "Please enter different Loan Account/Credit Card numbers",
        hi: "कृपया अलग-अलग ऋण खाता / क्रेडिट कार्ड नंबर दर्ज करें",
        ta: "வெவ்வேறு கடன் கணக்கு / கிரெடிட் கார்டு எண்களை உள்ளிடவும் ",
        te: "దయచేసి వేరే లోన్ ఖాతా / క్రెడిట్ కార్డ్ నంబర్లను నమోదు చేయండి",
        be: "অনুগ্রহ করে একটি ভিন্ন ঋণ অ্যাকাউন্ট/ক্রেডিট কার্ড নম্বর লিখুন",
    },
    AccountValidation: { en: "Please enter an account number", hi: "कृपया अकाउंट नंबर डालें", ta: "தயவுசெய்து ஒரு அக்கவுண்ட் எண்ணை உள்ளிடவும்", te: "దయచేసి అకౌంట్ నంబర్ ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি অ্যাকাউন্ট নম্বর লিখুন" },
    AccountDetailValidation: {
        en: "Please enter at least 4 characters.",
        hi: "कृपया कम से कम 4 वर्ण दर्ज करें",
        ta: "தயவுசெய்து குறைந்தது 4 எழுத்துக்களை உள்ளிடவும்.",
        te: "దయచేసి కనీసం 4 అక్షరాలను నమోదు చేయండి.",
        be: "অনুগ্রহ করে অন্তত 4টি ক্যারেক্টার লিখুন।",
    },
    numericValidation: {
        en: "Please enter 6 numeric characters.",
        hi: "कृपया 6 अंकीय वर्ण दर्ज करें",
        ta: "தயவுசெய்து 6 எண் எழுத்துக்களை உள்ளிடவும்",
        te: "దయచేసి 6 సంఖ్యా అక్షరాలను నమోదు చేయండి.",
        be: "অনুগ্রহ করে অন্তত 6টি সংখ্যা ক্যারেক্টার লিখুন।",
    },
    passcodeSent: {
        en: "Passcode sent! Please check your inbox.",
        hi: "पासकोड भेजा! कृपया अपना इनबॉक्स जांचें",
        ta: "கடவுக்குறியீடு அனுப்பப்பட்டது! உங்கள் இன்பாக்ஸை சரிபார்க்கவும்.",
        te: "పాస్‌కోడ్ పంపబడింది! దయచేసి మీ ఇన్‌బాక్స్‌ను తనిఖీ చేయండి.",
        be: "পাসকোড পাঠানো হয়েছে! অনুগ্রহ করে আপনার ইনবক্স দেখে নিন।",
    },
    passcodeSentMobile: {
        en: "Passcode sent! Please check your text messages.",
        hi: "पासकोड भेजा! कृपया अपने पाठ संदेश देखें",
        ta: "கடவுக்குறியீடு அனுப்பப்பட்டது! உங்கள் உரை செய்திகளை சரிபார்க்கவும்.",
        te: "పాస్‌కోడ్ పంపబడింది! దయచేసి మీ వచన సందేశాలను తనిఖీ చేయండి.",
        be: "পাসকোড পাঠানো হয়েছে! অনুগ্রহ করে আপনার টেক্সট মেসেজগুলি দেখে নিন। ",
    },
    creditReport_Employer_EmploymentlInformation: { en: "Employment Information", ta: "வேலைவாய்ப்புத் தகவல்", te: "ఉద్యోగ సమాచారం", be: "কর্মসংস্থানের তথ্য" },
    creditReport_Employer_AccountType: { en: "Account Type", hi: "खाता प्रकार", ta: "அக்கவுண்ட் வகை", te: "ఖాతా రకం", be: "অ্যাকাউন্টের প্রকার" },
    creditReport_Employer_DateReported: { en: "Date Reported", hi: "रिपोर्ट करने की तारीख", ta: "அறிவிக்கப்பட்ட தேதி", te: "నివేదించిన తేదీ", be: "রিপোর্ট করার তারিখ" },
    creditReport_Employer_Occupation: { en: "Occupation", hi: "पेशा", ta: "தொழில்", te: "వృత్తి", be: "পেশা" },
    creditReport_Employer_Income: { en: "Income", hi: "आय", ta: "வருமானம்", te: "ఆదాయం", be: "উপার্জন" },
    creditReport_Employer_Frequency: { en: "Monthly / Annual Income Indicator", hi: "मासिक/ वार्षिक आय का संकेतक", ta: "மாதாந்திர/வருடாந்திர வருமானம் சுட்டிக்காட்டி", te: "నెల / వార్షిక ఆదాయ సూచీ", be: "মাসিক / বার্ষিক উপার্জন নির্দেশক" },
    creditReport_Employer_IncomeIndicator: { en: "Net / Gross Income Indicator", hi: "निवल / सकल आय का संकेतक", ta: "நிகர/மொத்த வருமானம் சுட்டிக்காட்டி", te: "నికర / స్థూల ఆదాయ సూచీ", be: "নেট / স্থূল উপার্জন" },
    creditReport_Enquiry_NeverApplied: {
        en: "Never Applied for this Loan / Credit Card",
        hi: "इस ऋण/क्रेडिट कार्ड के लिए कभी भी आवेदन नहीं किया",
        ta: "இந்த கடன் அை்ைது கிபரடிட்கார்டுக்கு நான் ஒருமபாதுே",
        te: "ఈ ఋణం / క్రెడిట్ కార్డ్ కొరకు ఇదివరకెన్నడూ అప్లై చేసియుండలేదు",
        be: "কখনো এই ঋণের / ক্রেডিট কার্ডের জন্য আবেদন করেননি",
    },
    creditReport_Enquiry_MemberName: { en: "Member Name", hi: "सदस्य का नाम", ta: "உறுப்பினர் பெயர்", te: "సభ్యుని పేరు", be: "সদস্যের নাম" },
    creditReport_Enquiry_DateofEnquiry: { en: "Date of Enquiry", hi: "पूछताछ की तारीख", ta: "பங்கு தேதி", te: "విచారణ తేదీ", be: "অনুসন্ধানের তারিখ" },
    creditReport_Enquiry_EnquiryPurpose: { en: "Enquiry Purpose", hi: "पूछताछ का उद्देश्य", ta: "பங்கு நோக்கம்", te: "విచారణ ఉద్దేశం", be: "অনুসন্ধানের উদ্দেশ্য" },
    creditReport_Enquiry_EnquiryAmount: { en: "Enquiry Amount", hi: " पूछताछ की राशि", ta: "பங்குத் தொகை", te: "విచారణ మొత్తం", be: "অনুসন্ধান করা রাশি" },
    creditReport_DisputeRemark_MemberName: { en: "Member Name", hi: "सदस्य का नाम", ta: "உறுப்பினர் பெயர்", te: "సభ్యుని పేరు", be: "   সদস্যের নাম" },
    creditReport_DisputeRemark_AccountNumber: { en: "Account Number", hi: "खाता नंबर", ta: "அக்கவுண்ட் எண்", te: "అకౌంట్ నెంబర్", be: "অ্যাকাউন্ট নম্বর" },
    creditReport_DisputeRemark_DisputeRemark: { en: "Dispute Remark", hi: "विवाद की टिप्पणी", ta: "சர்ச்சைக் குறிப்பு", te: "వివాదాల రిమార్క్", be: "বিরোধিতা করা মন্তব্য" },
    creditReport_Accountinfounderdispute: { en: "Account information under dispute.", hi: "विवादित खाता जानकारी.", ta: "சர்ச்சையில் உள்ள அக்கவுண்ட் தகவல்.", te: "వివాదంలో ఉన్న ఖాతా సమాచారం.", be: "বিরোধিতা করা অ্যাকাউন্টের তথ্য" },
    creditReport_CIBILRemarks: { en: "CIBIL Remarks: ", hi: "CIBIL टिप्पणी: ", ta: "CIBIL குறிப்புகள்:", te: "CIBIL గమనించిన అంశాలు: ", be: " CIBIL মন্তব্যসমূহ: " },
    creditReport_DisputeDate: { en: "Dispute Date: ", hi: "विवाद की तारीख: ", ta: "சர்ச்சை தேதி:", te: "వివాద తేదీ: ", be: "বিরোধের তারিখ: " },
    creditReport_Personalinfounderdispute: {
        en: "Personal Information Under Dispute.",
        hi: "विवादित व्यक्तिगत जानकारी.",
        ta: "தனிப்பட்ட தகவல் சர்ச்சையின் கீழ் உள்ளது.",
        te: "వ్యక్తిగత సమాచారం గురించిన వివాదం.",
        be: "বিরোধিতা করা ব্যক্তিগত তথ্য।",
    },
    creditReport_Employmentinfounderdispute: {
        en: "Employment Information Under Dispute.",
        hi: "विवादित रोज़गार जानकारी.",
        ta: "வேலைவாய்ப்புத் தகவல் சர்ச்சையின் கீழ் உள்ளது.",
        te: "ఉద్యోగ సమాచారం గురించి వివాదం.",
        be: "বিরোধিতা করা কর্মসংস্থানের তথ্য।",
    },
    creditReport_Enquiryinfounderdispute: { en: "Enquiries Information Under Dispute.", hi: "विवादित पूछताछ जानकारी.", ta: "பங்கு தகவல் சர்ச்சையின் கீழ் உள்ளது.", te: "విచారణ సమాచారం గురించి వివాదం.", be: "বিরোধিতা করা অনুসন্ধানের তথ্য।" },
    creditReport_Contactinfounderdispute: {
        en: "Contact Information Under Dispute.",
        hi: "विवादित संपर्क करें जानकारी.",
        ta: "தொடர்பு தகவல் சர்ச்சையின் கீழ் உள்ளது.",
        te: "సంప్రదింపు సమాచారం గురించి వివాదం.",
        be: "বিরোধিতা করা যোগাযোগের তথ্য।",
    },
    creditReport_Inquiries: { en: "Inquiries" },
    creditReport_Inquiries_Unavailable: { en: "Unavailable" },
    creditReport_NewAccount: { en: "New Account" },
    creditReport_AccountRemoved: { en: "Account Removed" },
    creditReport_ShowAll: { en: "Show All" },
    creditReport_PhoneNo: { en: "Phone #" },
    creditReport_AvailableNow: { en: "Available Now" },
    creditReport_LoadMyData: { en: "Load My Data" },
    creditReport_IncreaseDecr: { en: "Increase/Decr" },
    creditReport_Change: { en: "Change" },
    creditReport_MissingData: { en: "Missing Data" },
    creditReport_Oneormorebureaushasnodata: { en: "One or more bureaus has no data for this item." },
    creditReport_DiscrepencyBetweenBureaus: { en: "Discrepency Between Bureaus" },
    creditReport_Accounts: { en: "Accounts" },
    creditReport_Accounts_BankingAccounts: { en: "Banking Accounts" },
    creditReport_Accounts_BankingAccounts_BankName: { en: "Bank Name" },
    creditReport_Accounts_BankingAccounts_BankingType: { en: "Banking Type" },
    creditReport_Accounts_BankingAccounts_AccountNumber: { en: "Account Number" },
    creditReport_Accounts_BankingAccounts_Balance: { en: "Balance" },
    creditReport_Accounts_BankingAccounts_Details: { en: "Account Details" },
    creditReport_Accounts_BankingAccounts_Details_AccountNumber: { en: "Account Number" },
    creditReport_Accounts_BankingAccounts_Details_Responsibility: { en: "Responsibility" },
    creditReport_Accounts_BankingAccounts_Details_Status: { en: "Status" },
    creditReport_Accounts_BankingAccounts_Details_Opened: { en: "Opened" },
    creditReport_Accounts_BankingAccounts_Details_Closed: { en: "Closed" },
    creditReport_Accounts_BankingAccounts_Details_Verified: { en: "Verified" },
    creditReport_Accounts_BankingAccounts_Details_Remarks: { en: "Remarks" },
    creditReport_Accounts_BankingAccounts_PaymentStartDate: { en: "Payment Start Date", hi: "भुगतान प्रारंभ करने की तारीख", ta: "கட்டண தொடக்கத் தேதி", te: "చెల్లింపు ప్రారంభ తేదీ", be: "অর্থপ্রদান আরম্ভের তারিখ" },
    creditReport_Accounts_BankingAccounts_PaymentEndDate: { en: "Payment End Date", hi: "भुगतान समाप्त करने की तारीख", ta: "கட்டண முடிவு தேதி", te: "చెల్లింపు ముగింపు తేదీ", be: "অর্থপ্রদান শেষ হওয়ার তারিখ" },
    creditReport_Accounts_BankingAccounts_PaymentStatus: { en: "Payment Status", hi: "भुगतान स्थिति", ta: "கட்டண நிலை", te: "చెల్లింపు స్థితి", be: "অর্থপ্রদানের স্থিতি" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_PastDueAmount: { en: "Past Due Amount" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_ActualPaymentAmount: { en: "Actual Payment Amount" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_LatePayments: { en: "Late Payments<br />(Last 6 years)" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_LatePayments_ThirtyDays: { en: "30 Days" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_LatePayments_SixtyDays: { en: "60 Days" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_LatePayments_NinetyDays: { en: "90 Days" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_OK: { en: "OK" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_ThirtyDaysLate: { en: "30 days late" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_SixtyDaysLate: { en: "60 days late" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_NinetyDaysLate: { en: "90 days late" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_OneHundredTwentyDaysLate: { en: "120 days late" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_OneHundredFiftyDaysLate: { en: "150+ days late" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_PaymentPlan: { en: "Payment Plan" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_RepossessionForeclosure: { en: "Repossession / Foreclosure" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_CollectionChargeOff: { en: "Collection / Charge-Off" },
    creditReport_Accounts_BankingAccounts_PaymentStatus_Unknown: { en: "Unknown" },
    creditReport_Accounts_BankingAccounts_PaymentHistory_PaymentDue: { en: "Payment Due" },
    creditReport_Accounts_BankingAccounts_PaymentHistory_PastDue: { en: "Past Due" },
    creditReport_Accounts_BankingAccounts_PaymentHistory_RemarksGeneric: { en: "Remarks (Generic)" },
    creditReport_Accounts_BankingAccounts_PaymentHistory_RemarksRating: { en: "Remarks (Rating)" },
    creditReport_Accounts_BankingAccounts_PaymentHistory_RemarksCompliance: { en: "Remarks (Compliance)" },
    creditReport_Accounts_RevolvingAccounts: { en: "Revolving Accounts", hi: "Revolving Accounts", ta: "Revolving Accounts", te: "Revolving Accounts", be: "Revolving Accounts" },
    creditReport_Accounts_NotMine: { en: "Account does not belong to me", hi: "खाता मेरा नहीं है", ta: "அக்கவுண்ட் எனக்கு சொந்தமானது இல்லை", te: "ఖాతా నాది కాదు", be: "অ্যাকাউন্টটি আমার নয়" },
    creditReport_Accounts_ReflectsMultiple: {
        en: "Account reflects multiple times",
        hi: "खाता कई बार प्रतिबिंबित होता है",
        ta: "அக்கவுண்ட் பல முறை பிரதிபலிக்கிறது",
        te: "ఖాతా అనేక పర్యాయాలు కనిపిస్తుంది",
        be: "অ্যাকাউন্টটি একাধিকবার প্রতিফলিত হয়েছে",
    },
    creditReport_Accounts_RevolvingAccounts_AccountName: { en: "Member Name", hi: "सदस्य का नाम", ta: "உறுப்பினர் பெயர்", te: "సభ్యుని పేరు", be: "সদস্যের নাম" },
    creditReport_Accounts_RevolvingAccounts_AccountType: { en: "Account Type", hi: "खाता प्रकार", ta: "அக்கவுண்ட் வகை", te: "ఖాతా రకం", be: "অ্যাকাউন্টের প্রকার" },
    creditReport_Accounts_RevolvingAccounts_AccountNumber: { en: "Account Number", hi: "खाता नंबर", ta: "அக்கவுண்ட் எண்", te: "అకౌంట్ నెంబర్", be: "অ্যাকাউন্ট নম্বর" },
    creditReport_Accounts_RevolvingAccounts_Ownership: { en: "Ownership", hi: "स्वामित्व", ta: "உடைமை", te: "ఓనర్షిప్", be: "মালিকানা" },
    creditReport_Accounts_RevolvingAccounts_Balance: { en: "Balance" },
    creditReport_Accounts_RevolvingAccounts_BalanceDate: { en: "Balance Date" },
    creditReport_Accounts_RevolvingAccounts_Payment: { en: "Payment" },
    creditReport_Accounts_RevolvingAccounts_Term: { en: "Term" },
    creditReport_Accounts_RevolvingAccounts_Unavailable: { en: "Unavailable" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails: { en: "Account Details", hi: "खाता विवरण", ta: "அக்கவுண்ட் தகவல்கள்", te: "ఖాతా వివరాలు", be: "অ্যাকাউন্টের বিবরণ" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_CreditReportPeriod: { en: "Credit Report Period" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_AccountNumber: { en: "Account Number" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Condition: { en: "Condition" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_CreditLimit: { en: "Credit Limit", hi: "क्रेडिट सीमा", ta: "கடன் வரம்பு", te: "క్రెడిట్ లిమిట్", be: "ক্রেডিটের সীমা" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_SanctionedAmount: { en: "Sanctioned Amount", hi: "स्वीकृत राशि", ta: "அனுமதிக்கப்பட்ட தொகை", te: "మంజూరైన మొత్తం", be: "মঞ্জুর করা রাশি" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Currentbalance: { en: "Current Balance", hi: "वर्तमान बैलेंस", ta: "தற்போதைய இருப்பு", te: "ప్రస్తుత బ్యాలెన్స్", be: "বর্তমান ব্যালেন্স" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_CashLimit: {
        en: "Cash Limit",
        hi: "नकद सीमा",
        ta: "ரொக்க வரம்பு",
        te: "నగదు పరిమితి",
        be: "নগদ সীমা",
    },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_AmountOverdue: { en: "Amount Overdue", hi: "अतिदेय राशि", ta: "மிகைத் தொகை", te: "ఓవర్డ్యూ మొత్తం", be: "বাকি পড়া রাশি" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_RateOfInterest: { en: "Rate of Interest", hi: "ब्याज दर", ta: "வட்டிவிகிதம்", te: "వడ్డీరేటు", be: "সুদের হার" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_RepaymentTenure: { en: "Repayment Tenure", hi: "पुनर्भुगतान की अवधि", ta: "திருப்பிச் செலுத்தும் காலம்", te: "తిరిగిచెల్లించే వ్యవధి", be: "পরিশোধের মেয়াদ" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_EmiAmount: { en: "EMI Amount", hi: "EMI राशि", ta: "EMI தொகை", te: "ఈఎంఐ మొత్తం", be: "EMI এর রাশি" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_PaymentFrequency: { en: "Payment Frequency", hi: "भुगतान की आवृत्ति", ta: "கட்டண அடுக்கு நிகழ்வு", te: "చెల్లింపు తరచుదనం", be: "অর্থপ্রদান পুনরাবৃত্তির হার" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_ActualPaymentAmount: { en: "Actual Payment Amount", hi: "वास्तविक भुगतान राशि", ta: "உண்மையான கட்டணத் தொகை", te: "వాస్తవ చెల్లింపు మొత్తం", be: "প্রদত্ত প্রকৃত রাশি" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_DateOpened: {
        en: "Date Opened / Disbursed",
        hi: "खुलने/ संवितरित होने की तारीख",
        ta: "திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி",
        te: "తెరిచిన / పంపిణీ అయిన తేదీ",
        be: "খোলার / বিতরণের তারিখ",
    },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_DateClosed: { en: "Date Closed", hi: "बंद होने की तारीख", ta: "மூடப்பட்ட தேதி", te: "మూసివేసిన తేదీ", be: "বন্ধ করার তারিখ" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_DateOFLastPayment: { en: "Date of Last Payment", hi: "आखिरी भुगतान की तारीख", ta: "கடைசி கட்டணத் தேதி", te: "అఖరిసారి చెల్లింపు చేసిన తేదీ", be: "শেষবার অর্থপ্রদানের তারিখ" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_DateReportedAndCertified: {
        en: "Date Reported And Certified",
        hi: "रिपोर्टिंग और प्रमाणन की तारीख",
        ta: "புகாரளிக்கப்பட்ட மற்றும் சான்றளிக்கப்பட்ட தேதி",
        te: "నివేదించిన మరియు ధృవీకరించిన తేదీ",
        be: "রিপোর্ট ও শংসিত করার তারিখ",
    },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Fied: { en: "Fied" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_ValueOfColleteral: { en: "Value of Collateral", hi: "संपार्श्विक का मूल्य", ta: "இணையின் மதிப்பு", te: "పూచీకత్తు విలువ", be: "জামানতের মূল্য" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_TypeOfColleteral: { en: "Type of Collateral", hi: "संपार्श्विक संपत्ति का प्रकार", ta: "இணையின் வகை", te: "పూచీకత్తు రకం", be: "জামানতের প্রকার" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_SuitFiles: {
        en: "Suit - Filed / Willful Default",
        hi: "दायर मुकदमा/ स्वैच्छिक दिवालिया घोषित करना",
        ta: "வழக்கு - தாக்கல்/விருப்பமான இயல்புநிலை",
        te: "వ్యాజ్యం - దాఖలైన / ఉద్దేశపూర్వక ఎగవేత",
        be: "মামলা দায়ের করা হয়েছে / ইচ্ছাকৃত ডিফল্ট",
    },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_WrittenOfStatus: {
        en: "true" == reqpar["request-params"]["tl.enableWrittenOffNameChange"] ? "Credit Facility Status" : "Written-off Status",
        hi: "true" == reqpar["request-params"]["tl.enableWrittenOffNameChange"] ? "क्रेडिट सुविधा की स्थिति" : "अपलिखित स्थिति",
        ta: "true" == reqpar["request-params"]["tl.enableWrittenOffNameChange"] ? "கடன் வசதி நிலை" : "தள்ளுபடி செய்யப்பட்ட நிலை",
        te: "true" == reqpar["request-params"]["tl.enableWrittenOffNameChange"] ? "క్రెడిట్ సదుపాయపు స్థితి" : "మాఫీ చేయబడిన స్థితి",
        be: "true" == reqpar["request-params"]["tl.enableWrittenOffNameChange"] ? "ঋণ সুবিধার স্থিতি" : "বাতিল করার স্থিতি",
    },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_WrittenOfAmountTotal: {
        en: "Written-off Amount (Total)",
        hi: "अपलिखित राशि (कुल)",
        ta: "தள்ளுபடி செய்யப்பட்ட தொகை (மொத்தம்)",
        te: "మాఫీ చేయబడిన మొత్తం (మొత్తం)",
        be: "বাতিল করা রাশি (মোট)",
    },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_WrittenOfAmountPrincipal: {
        en: "Written-off Amount (Principal)",
        hi: "अपलिखित राशि (मूलधन)",
        ta: "தள்ளுபடி செய்யப்பட்ட தொகை (அசல்)",
        te: "మాఫీ చేయబడిన మొత్తం (అసలు)",
        be: "বাতিল করা রাশি (আসল)",
    },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_SettlementAmount: { en: "Settlement Amount", hi: "निपटान की राशि", ta: "தீர்வுத் தொகை", te: "సెటిల్మెంట్ మొత్తం", be: "নিষ্পত্তির রাশি" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_CurrentBalance: { en: "Current Balance" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_OriginalBalance: { en: "Original Balance" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Limit: { en: "Limit" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Payment: { en: "Payment" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_LastPayment: { en: "Last Payment" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Status: { en: "Status" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Term: { en: "Term" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Opened: { en: "Opened" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Reported: { en: "Reported" },
    creditReport_Accounts_RevolvingAccounts_AccountDetails_Remarks: { en: "Remarks" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus: { en: "Payment Status", hi: "भुगतान स्थिति", ta: "கட்டண நிலை", te: "చెల్లింపు స్థితి", be: "অর্থপ্রদানের স্থিতি" },
    creditReport_Accounts_RevolvingAccounts_36Months: { en: "(up to 36 months)", hi: "(36 महीने तक)", te: "(36 నెలల వరకు)", be: "(36 মাস পর্যন্ত)" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus_PastDueAmount: { en: "Past Due Amount" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus_LatePayments: { en: "Late Payments (Last 6 years)" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus_PaymentHistory: { en: "Payment History", hi: "भुगतान का इतिहास", ta: "கட்டண வரலாறு", te: "చెల్లింపు చరిత్ర", be: "অর্থপ্রদানের ইতিহাস" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus_PaymentHistory_Date: { en: "Date" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus_PaymentHistory_Status: { en: "Status" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus_PaymentHistory_HighCredit: { en: "High Credit" },
    creditReport_Accounts_RevolvingAccounts_PaymentStatus_PaymentHistory_CurrentBalances: { en: "Current Balances" },
    creditReport_Accounts_InstallmentAccounts: { en: "Installment Accounts" },
    creditReport_Accounts_InstallmentAccounts_AccountName: { en: "Account Name" },
    creditReport_Accounts_InstallmentAccounts_Balance: { en: "Balance" },
    creditReport_Accounts_InstallmentAccounts_BalanceDate: { en: "Balance Date" },
    creditReport_Accounts_InstallmentAccounts_Payment: { en: "Payment" },
    creditReport_Accounts_InstallmentAccounts_Term: { en: "Term" },
    creditReport_Accounts_InstallmentAccounts_Unavailable: { en: "Unavailable" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails: { en: "Account Details" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_CreditReportPeriod: { en: "Credit Report Period" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_AccountNumber: { en: "Account Number" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Condition: { en: "Condition" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Responsibility: { en: "Responsibility" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_CurrentBalance: { en: "Current Balance" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Originalbalance: { en: "Original balance" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Limit: { en: "Limit" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Payment: { en: "Payment" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_LastPayment: { en: "Last Payment " },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Status: { en: "Status" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Term: { en: "Term" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_LoanType: { en: "Loan Type" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Opened: { en: "Opened" },
    creditReport_Accounts_InstallmentAccounts_AccountDetails_Reported: { en: "Reported" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus: { en: "Payment Status" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_PastDueAmount: { en: "Past Due Amount" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_ActualPaymentAmount: { en: "Actual Payment Amount" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_LatePayments: { en: "Late Payments (Last 6 years)" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_PaymentHistory: { en: "Payment History", hi: "भुगतान का इतिहास", ta: "கட்டண வரலாறு", te: "చెల్లింపు చరిత్ర", be: "অর্থপ্রদানের ইতিহাস" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_Date: { en: "Date" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_Status: { en: "Status" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_HighCredit: { en: "High Credit" },
    creditReport_Accounts_InstallmentAccounts_PaymentStatus_CurrentBalances: { en: "Current Balances" },
    creditReport_Accounts_CollectionAccounts: { en: "Collection Accounts" },
    creditReport_Accounts_CollectionAccounts_CreditorName: { en: "Creditor Name" },
    creditReport_Accounts_CollectionAccounts_Balance: { en: "Balance" },
    creditReport_Accounts_CollectionAccounts_BalanceDate: { en: "Balance Date" },
    creditReport_Accounts_CollectionAccounts_Payment: { en: "Payment" },
    creditReport_Accounts_CollectionAccounts_Term: { en: "Term" },
    creditReport_Accounts_CollectionAccounts_Vendor_AccountNo: { en: "Account No." },
    creditReport_Accounts_CollectionAccounts_Vendor_OriginalCreditor: { en: "Original Creditor" },
    creditReport_Accounts_CollectionAccounts_Vendor_ActualPaymentAmount: { en: "Actual Payment Amount" },
    creditReport_Accounts_CollectionAccounts_Vendor_Responsibility: { en: "Responsibility" },
    creditReport_Accounts_CollectionAccounts_Vendor_Condition: { en: "Condition" },
    creditReport_Accounts_CollectionAccounts_Vendor_OriginalBalance: { en: "Original Balance" },
    creditReport_Accounts_CollectionAccounts_Vendor_Balance: { en: "Balance" },
    creditReport_Accounts_CollectionAccounts_Vendor_DateOpened: { en: "Date Opened" },
    creditReport_Accounts_CollectionAccounts_Vendor_DateReopened: { en: "Date Reopened" },
    creditReport_Accounts_CollectionAccounts_Vendor_Remarks: { en: "Remarks" },
    creditReport_Accounts_OtherAccounts: { en: "Other Accounts" },
    creditReport_Accounts_OtherAccounts_Unavailable: { en: "Unavailable" },
    creditReport_Accounts_OtherAccounts_AccountName: { en: "Account Name" },
    creditReport_Accounts_OtherAccounts_Balance: { en: "Balance" },
    creditReport_Accounts_OtherAccounts_BalanceDate: { en: "Balance Date" },
    creditReport_Accounts_OtherAccounts_Payment: { en: "Payment" },
    creditReport_Accounts_OtherAccounts_Term: { en: "Term" },
    creditReport_Accounts_OtherAccounts_Vendor_AccountDetails: { en: "Account Details" },
    creditReport_Accounts_OtherAccounts_Vendor_PaymentStatus: { en: "Payment Status" },
    creditReport_Accounts_OtherAccounts_Vendor_CreditReportPeriod: { en: "Credit Report Period" },
    creditReport_Accounts_OtherAccounts_Vendor_AccountNumber: { en: "Account Number" },
    creditReport_Accounts_OtherAccounts_Vendor_Condition: { en: "Condition" },
    creditReport_Accounts_OtherAccounts_Vendor_Responsibility: { en: "Responsibility" },
    creditReport_Accounts_OtherAccounts_Vendor_CurrentBalance: { en: "Current Balance" },
    creditReport_Accounts_OtherAccounts_Vendor_OriginalBalance: { en: "Original Balance" },
    creditReport_Accounts_OtherAccounts_Vendor_Limit: { en: "Limit" },
    creditReport_Accounts_OtherAccounts_Vendor_Payment: { en: "Payment" },
    creditReport_Accounts_OtherAccounts_Vendor_LastPayment: { en: "Last Payment" },
    creditReport_Accounts_OtherAccounts_Vendor_Status: { en: "Status" },
    creditReport_Accounts_OtherAccounts_Vendor_Term: { en: "Term" },
    creditReport_Accounts_OtherAccounts_Vendor_LoanType: { en: "Loan Type" },
    creditReport_Accounts_OtherAccounts_Vendor_Opened: { en: "Opened" },
    creditReport_Accounts_OtherAccounts_Vendor_Reported: { en: "Reported" },
    creditReport_Accounts_OtherAccounts_Vendor_Remarks: { en: "Remarks" },
    creditReport_Accounts_OtherAccounts_Vendor_PaymentStatus: { en: "Payment Status" },
    creditReport_Accounts_OtherAccounts_Vendor_PastDueAmount: { en: "Past Due Amount" },
    creditReport_Accounts_OtherAccounts_Vendor_ActualPaymentAmount: { en: "Actual Payment Amount" },
    creditReport_Accounts_OtherAccounts_Vendor_LatePayments: { en: "Late Payments (Last 6 years)" },
    creditReport_Accounts_OtherAccounts_Vendor_PaymentHistory: { en: "Payment History", hi: "भुगतान का इतिहास", ta: "கட்டண வரலாறு", te: "చెల్లింపు చరిత్ర", be: "অর্থপ্রদানের ইতিহাস" },
    creditReport_Accounts_OtherAccounts_Vendor_PaymentHistory_Date: { en: "Date" },
    creditReport_Accounts_OtherAccounts_Vendor_PaymentHistory_Status: { en: "Status" },
    creditReport_Accounts_OtherAccounts_Vendor_PaymentHistory_HighCredit: { en: "High Credit" },
    creditReport_Accounts_OtherAccounts_Vendor_PaymentHistory_CurrentBalances: { en: "Current Balances" },
    creditReport_Accounts_RealEstateAccounts: { en: "Real Estate Accounts" },
    creditReport_Accounts_bankName: { en: "Bank Name" },
    creditReport_Accounts_bankingType: { en: "Banking Type" },
    creditReport_Accounts_accountNumber: { en: "Account Number" },
    creditReport_Accounts_balance: { en: "Balance" },
    creditReport_Accounts_accountName: { en: "Account Name" },
    creditReport_Accounts_currentBalance: { en: "Balance" },
    creditReport_Accounts_dateAccountStatus: { en: "Balance Date" },
    creditReport_Accounts_monthlyPayment: { en: "Payment" },
    creditReport_Accounts_termMonths: { en: "Term" },
    creditReport_Accounts_creditorName: { en: "Creditor Name" },
    creditReport_PublicRecords_PublicRecords: { en: "Public Records" },
    creditReport_PublicRecords_DateReopened: { en: "Date Reopened" },
    creditReport_PublicRecords_AccountName: { en: "Account Name" },
    creditReport_PublicRecords_BalanceDate: { en: "Balance Date" },
    creditReport_PublicRecords_DateReported: { en: "Date Reported" },
    creditReport_PublicRecords_Condition: { en: "Condition " },
    creditReport_PublicRecords_AccountCondition: { en: "Account Condition" },
    creditReport_PublicRecords_Money: { en: "Money" },
    creditReport_PublicRecords_HighBalance: { en: "High Balance" },
    creditReport_PublicRecords_CreditLimit: { en: "Credit Limit" },
    creditReport_PublicRecords_MonthlyPayment: { en: "Monthly Payment" },
    creditReport_PublicRecords_LastPayment: { en: "Last Payment" },
    creditReport_PublicRecords_DateLastPayment: { en: "Date Last Payment" },
    creditReport_PublicRecords_PayStatus: { en: "Pay Status" },
    creditReport_PublicRecords_TermMonths: { en: "Term Months" },
    creditReport_PublicRecords_LoanType: { en: "Loan Type" },
    creditReport_PublicRecords_AccountType: { en: "Account Type" },
    creditReport_PublicRecords_Open: { en: "Open" },
    creditReport_PublicRecords_Dateopened: { en: "Date opened" },
    creditReport_PublicRecords_Closed: { en: "Closed " },
    creditReport_PublicRecords_DateClosed: { en: "Date Closed" },
    creditReport_PublicRecords_Verified: { en: "Verified" },
    creditReport_PublicRecords_DateVerified: { en: "Date Verified" },
    creditReport_PublicRecords_CreditorInformation: { en: "Creditor Information" },
    creditReport_PublicRecords_FullContact: { en: "Full Contact " },
    creditReport_PublicRecords_Collection: { en: "Collection" },
    creditReport_PublicRecords_AccountNumber: { en: "Account Number" },
    creditReport_PublicRecords_OriginalCreditor: { en: "Original Creditor" },
    creditReport_PublicRecords_ActualPaymentAmount: { en: "Actual Payment Amount" },
    creditReport_PublicRecords_AccountCondition: { en: "Account Condition" },
    creditReport_PublicRecords_DateFiled: { en: "Date Filed" },
    creditReport_PublicRecords_DateReported: { en: "Date Reported" },
    creditReport_PublicRecords_HowFiled: { en: "How Filed" },
    creditReport_PublicRecords_ReferenceNumber: { en: "Reference Number" },
    creditReport_PublicRecords_DateSettled: { en: "Date Settled" },
    creditReport_PublicRecords_DateSatisfied: { en: "Date Satisfied" },
    creditReport_PublicRecords_ClosingDate: { en: "Closing Date" },
    creditReport_PublicRecords_DateResolved: { en: "Date Resolved" },
    creditReport_PublicRecords_ClosingStaisfied: { en: "Closing Staisfied" },
    creditReport_PublicRecords_DateDeferred: { en: "Date Deferred" },
    creditReport_PublicRecords_AssetAmount: { en: "Asset Amount" },
    creditReport_PublicRecords_ReleasedDate: { en: "Released Date" },
    creditReport_PublicRecords_DateReleased: { en: "Date Released" },
    creditReport_PublicRecords_Court: { en: "Court" },
    creditReport_PublicRecords_Amount: { en: "Amount" },
    creditReport_PublicRecords_Garnishee: { en: "Garnishee" },
    creditReport_PublicRecords_ActionAmount: { en: "Action Amount" },
    creditReport_PublicRecords_Liability: { en: "Liability  " },
    creditReport_PublicRecords_LiabilityAmount: { en: "Liability Amount" },
    creditReport_PublicRecords_NameofSpouse: { en: "Name of Spouse" },
    creditReport_PublicRecords_AmountOwed: { en: "Amount Owed" },
    creditReport_PublicRecords_LienAmount: { en: "Lien Amount" },
    creditReport_PublicRecords_DateFiledReported: { en: "Date Filed/Reported" },
    creditReport_PublicRecords_Basis: { en: "Basis" },
    creditReport_PublicRecords_OriginalBalance: { en: "Original Balance" },
    creditReport_PublicRecords_Remarks: { en: "Remarks" },
    creditReport_PublicRecords_Status: { en: "Status" },
    creditReport_PublicRecords_Type: { en: "Type" },
    creditReport_PublicRecords_Plaintiff: { en: "Plaintiff" },
    creditReport_PublicRecords_Security: { en: "Security" },
    creditReport_PublicRecords_Bankruptcy: { en: "Bankruptcy" },
    creditReport_PublicRecords_LegalItem: { en: "Legal Item" },
    creditReport_PublicRecords_MiscPublicRecord: { en: "Misc Public Record" },
    creditReport_PublicRecords_RegisteredItem: { en: "Registered Item" },
    creditReport_PublicRecords_FinancialCounceling: { en: "Financial Counceling" },
    creditReport_PublicRecords_FinancingStatment: { en: "Financing Statment" },
    creditReport_PublicRecords_Foreclosure: { en: "Foreclosure" },
    creditReport_PublicRecords_Garnishment: { en: "Garnishment" },
    creditReport_PublicRecords_MaritalItem: { en: "Marital Item" },
    creditReport_PublicRecords_TaxLien: { en: "Tax Lien" },
    "Score Factors": { en: "Score Factors" },
    DE_MoreDetails: { en: "More Details", hi: "अधिक विवरण", ta: "மேலும் விவரங்கள்", te: "మరిన్ని వివరాలు", be: "আরো বিশদ বিবরণ" },
    DE_Apply: { en: "Apply", hi: "आवेदन करें", ta: "பயன்படுத்து", te: "అప్లై చేయండి", be: "আবেদন করুন" },
    DE_Tentativecreditlimitoffered: { en: "Tentative credit limit offered", hi: "ऑफ़र की गई अनुमानित क्रेडिट सीमा", ta: "வழங்கப்படும் தற்காலிகக் கடன் வரம்பு", te: "అందించబడే క్రెడిట్ లిమిటెడ్ సుమారుగా", be: "পেশ করা সাময়িক ক্রেডিটের সীমা" },
    DE_Monthlyinterestrate: { en: "Monthly interest rate", hi: "मासिक ब्याज दर", ta: "மாதாந்திர வட்டி விகிதம்", te: "నెలవారీ వడ్డీ రేటు", be: "মাসিক সুদের হার" },
    DE_Annualfees: { en: "Annual fees", hi: "वार्षिक शुल्क", ta: "வருடாந்திரக் கட்டணம்", te: "వార్షిక ఫీజు", be: "বার্ষিক ফি" },
    DE_Loanupto: { en: "Loan upto", hi: "ऋण की जानकारी", ta: "வரை லோன்", te: "ఋణ పరిధి", be: "এই রাশি পর্যন্ত ঋণ" },
    DE_Interestrate: { en: "Interest rate (%)", hi: "ब्याज की दर (%)", ta: "வட்டி விகிதம் (%)", te: "వడ్డీ రేటు (%)", be: "সুদের হার (%)" },
    DE_Interesttype: { en: "Interest type", hi: "ब्याज का प्रकार", ta: "வட்டி வகை", te: "వడ్డీ రకము", be: "সুদের প্রকার" },
    DE_Processingfeesupto: { en: "Processing fees upto", hi: "अधिकतम प्रोसेसिंग शुल्क", ta: "வரை பிரஸசிங் ஃபீஸ்", te: "ప్రాసెసింగ్ ఫీజు పరిమితి", be: "এই রাশি পর্যন্ত প্রক্রিয়াকরণের ফি" },
    DE_Benefits: { en: "Benefits", hi: "लाभ", ta: "நன்மைகள்", te: "ప్రయోజనాలు", be: "উপযোগিতাগুলি" },
    DE_NotAvailable: { en: "Not Available", hi: "उपलब्ध नहीं है", ta: "கிடைக்கவில்லை", te: "లభ్యంగా లేదు", be: "পাওয়া যাবে না" },
    DE_Requireddocuments: { en: "Required documents", hi: "आवश्यक दस्तावेज़", ta: "தேவைப்படும் ஆவணங்கள்", te: "కావాల్సిన పత్రాలు", be: "প্রয়োজনীয় নথিপত্র" },
    DE_Fees: { en: "Fees", hi: "शुल्क", ta: "ஃபீஸ்", te: "ఫీజు", be: "ফি" },
    DE_OfferTermsandConditions: { en: "Offer Terms and Conditions", hi: "ऑफ़र के नियम और शर्तें", ta: "சலுகை விதிமுறைகள் மற்றும் நிபந்தனைகள்", te: "ఆఫర్కు వర్తించే నిబంధనలు మరియు షరతులు", be: "অফারের নিয়ম ও শর্তাবলী" },
    DE_Downloads: { en: "Downloads", hi: "डाउनलोड करें", ta: "பதிவிறக்கங்கள்", te: "డౌన్లోడ్లు", be: "ডাউনলোডগুলি" },
    DE_validCity: { en: "Please select a city.", hi: "कृपया कोई शहर चुनें.", ta: "தயவுசெய்து ஒரு நகரத்தை தேர்வு செய்யுங்கள்.", te: "దయచేసి నగరాన్ని ఎంచుకోండి.", be: "অনুগ্রহ করে একটি শহর নির্বাচন করুন।" },
    DE_validIncome: { en: "Please select income type.", hi: "कृपया आय का प्रकार चुनें.", ta: "தயவுசெய்து வருமான வகையைத் தேர்வு செய்யுங்கள்.", te: "దయచేసి ఆదాయ రకం ఎంచుకోండి. ", be: "অনুগ্রহ করে উপার্জনের প্রকার নির্বাচন করুন। " },
    RefreshNow: { en: "Refresh Now", hi: "अभी रीफ़्रेश करें", ta: "இப்போது புதுப்பிக்கவும்", te: "ఇప్పుడే రీఫ్రెష్ చేయండి", be: "এখনই রিফ্রেশ করুন" },
    RefreshDate_Part1: { en: "Your CIBIL Score and Report is ", hi: " आपका CIBIL स्कोर और रिपोर्ट ", ta: "உங்கள் CIBIL மதிப்பெண்கள் மற்றும் அறிக்கைகள் ", te: "మీ CIBIL స్కోర్ మరియు రిపోర్ట్ ", be: "আপনার CIBIL স্কোর ও রিপোর্ট " },
    RefreshDate_Part2_Sing: { en: " day old.", hi: " दिन पुरानी है.", ta: "நாள் பழையவை.", te: "ఒక్కరోజు పాతది.", be: "দিনের পুরোনো।" },
    RefreshDate_Part2_Plur: { en: " days old.", hi: " दिन पुरानी है.", ta: "நாட்கள் பழையவை.", te: "రోజుల క్రితంది.", be: "দিনের পুরোনো।" },
    Refresh_0_Day_Part1: {
        en: "You have your most current CIBIL Score &amp; Report. You will be able to refresh again on",
        hi: "रीफ़्रेश पूरा हुआ अब आपके पास सबसे नवीनतम CIBIL स्कोर और रिपोर्ट है. आप",
        ta: "உங்களுடைய தற்போதைய CIBIL மதிப்பெண் அறிக்கை உங்களிடம் உள்ளது. நீங்கள் மீண்டும் புதுப்பிக்க முடியும்",
        te: "రీఫ్రెష్ సంపూర్తి ఇప్పుడు మీరు మీ అత్యంత ప్రస్తుతపు CIBIL స్కోర్ మరియు రిపోర్ట్ను పొందవచ్చు. మీరు మళ్ళీ ",
        be: "আপনার কাছে আপনার সবচেয়ে সাম্প্রতিক CIBIL স্কোর ও রিপোর্ট রয়েছে। আপনি এই তারিখে আবার রিফ্রেশ করতে পারবেন ",
    },
    Refresh_0_Day_Part2: { en: ".", hi: "पर  पुनः रिफ्रेश करने में सक्षम होंगे." },
    BuyCreditReports: { en: "Buy Credit Reports", hi: "क्रेडिट रिपोर्ट खरीदें", ta: "கடன் அறிக்கைகளை வாங்குங்கள்", te: "క్రెడిట్ రిపోర్టులు కొనండి", be: "ক্রেডিট রিপোর্ট কিনুন" },
    SubscribeMessage: {
        en: "Subscribe to stay connected to the score your lenders check.",
        hi: "आपके ऋणदाता आपके जिस स्कोर को देखते हैं, उससे जुड़े रहने के लिए सदस्यता लें.",
        ta: "உங்கள் கடன் வழங்குநர்கள் சரிபார்க்கும் மதிப்பெண்ணுடன் இணைந்திருக்க பதிவு செய்யுங்கள்.",
        te: "మీకు ఋణమిచ్చే సంస్థలు పరిశీలించే స్కోరును ఎప్పటికప్పుడు తెలుసుకోవడానికి సబ్‌‌స్క్రైబ్ చేసుకోండి.",
        be: "আপনার ঋণদাতাদের দেখে নেওয়া স্কোরের সঙ্গে সংযুক্ত থাকতে সাবস্ক্রাইব করুন।",
    },
    ControlNumber: { en: "Control Number : ", hi: "कंट्रोल नंबर : ", ta: "கட்டுப்பாட்டு எண்: ", te: "కోంటరర ల నోంబర : ", be: " নিয়ন্ত্রণের নম্বর: " },
    Date: { en: "Date : ", hi: "तारीख : ", ta: "தேதி: ", te: "తేదీ: ", be: "তারিখ: " },
    CIBILScoreReport: { en: "CIBIL Score & Report", hi: "CIBIL स्कोर और रिपोर्ट", ta: "CIBIL மதிபெண் மற்றும் அறிக்கை", te: "CIBIL స్కోర్ మరియు రిపోర్ట్", be: "CIBIL স্কোর ও রিপোর্ট  " },
    "Superscript-Desc": {
        en: "(e) INDICATES THE VALUE PROVIDED BY BANK WHEN YOU APPLIED FOR A CREDIT FACILITY.",
        hi: "(e) यह आपके द्वारा क्रेडिट सुविधा के लिए आवेदन करते समय आपको बैंक द्वारा प्रदान किया गया मान इंगित करता है.",
        ta: "(e) கடன் வசதிக்காக நீங்கள் விண்ணப்பித்தபோது வங்கியின் மூலம் வழங்கப்பட்ட மதிப்பைக் குறிக்கிறது.",
        te: "(e) మీరొక ఋణ సదుపాయం కొరకు అప్లై చేసుకున్నప్పుడు బ్యాంకు అందించే విలువను తెలుపుతుంది.",
        be: "(e) আপনি একটি ক্রেডিটের সুবিধার জন্য আবেদন করার সময় ব্যাঙ্কের দ্বারা প্রদত্ত মূল্য নির্দেশ করে।",
    },
    CIBILScore: { en: "CIBIL Score", hi: "CIBIL स्कोर", ta: "CIBIL மதிபெண்", te: "CIBIL స్కోర్", be: "CIBIL স্কোর" },
    GetyourCIBILScore: { en: "Get your CIBIL Score", hi: "अपना CIBIL स्कोर प्राप्त करें", ta: "உங்கள் CIBIL மதிப்பெண்ணைப் பெறுங்கள்", te: "మీ CIBIL స్కోరు పొందండి", be: "আপনার CIBIL স্কোর পান", be: "আপনার CIBIL স্কোর পান" },
    MemberLogin: { en: "Member Login", hi: "सदस्य लॉगिन", ta: "உறுப்பினர் லாக்-இன்", te: "మెంబర్ లాగిన్", be: "সদস্য লগইন" },
    CreditEducation: { en: "Credit Education", hi: "क्रेडिट शिक्षा", ta: "கடன்  பற்றிய கல்வி", te: "క్రెడిట్ విద్య", be: "ক্রেডিট শিক্ষা" },
    Home: { en: "Home", hi: "होम", ta: "ஹோம்", te: "హోమ్", be: "হোম" },
    CreateAccount: { en: "Create your account", hi: "अपना खाता बनाएँ", ta: "உங்கள் அக்கவுண்ட்டை உருவாக்குங்கள்", te: "మీ అకౌంట్ ఏర్పరచుకోండి", be: "আপনার অ্যাকাউন্ট তৈরি করুন" },
    VerifyIdentity: { en: "Verify your identity", hi: "अपनी पहचान सत्यापित करें", ta: "உங்கள் அடையாளத்தை சரிபார்க்கவும்", te: "మీ గుర్తింపును వెరిఫై చేసుకోండి", be: "আপনার পরিচয় যাচাই করুন" },
    Payment: { en: "Payment", hi: "भुगतान", ta: "கட்டணம்", te: "చెల్లింపు", be: "অর্থপ্রদান" },
    TotalAfterDiscount: { en: "Total Price After Discount", hi: "डिस्काउंट के बाद कुल मूल्य", ta: "தள்ளுபடிக்குப் பிறகு மொத்த விலை", te: "డిస్కౌంట్ తరువాత మొత్తం ధర", be: "ছাড় দেওয়ার পর মোট মূল্য" },
    Enterdiscountcode: { en: "Enter discount code", hi: "छूट कोड दर्ज करें", ta: "தள்ளுபடி குறியீட்டை உள்ளிடுங்கள்", te: "డిస్కౌంట్ కోడ్ ఎంటర్ చేయండి", be: "ছাড়ের কোড লিখুন" },
    INVALID_COUPON_CODE: { en: "Discount code is invalid", hi: "छूट का कोड अमान्य है", ta: "தள்ளுபடி குறியீடு தவறானது", te: "డిస్కౌంట్ కోడ్ చెల్లుబాటు కాదు", be: "ছাড়ের কোডটি বৈধ নয়" },
    INVALID_COUPON_OFFER_COMBO: {
        en: "Discount code is not valid for this subscription",
        hi: "छूट का कोड इस सदस्यता के लिए मान्य नहीं है",
        ta: "இந்த சந்தாவிற்கு தள்ளுபடி குறியீடு செல்லுப்படியாகாது",
        te: "డిస్కౌంట్ కోడ్ ఈ సబ్‌‌స్క్రిప్షన్‌‌కు చెల్లుబాటు కాదు",
        be: "ছাড়ের কোডটি এই সাবস্ক্রিপশনের জন্য বৈধ নয় ",
    },
    COUPON_EXPIRED: { en: "Discount code is no longer valid", hi: "छूट का कोड अब मान्य नहीं है", ta: "தள்ளுபடி குறியீடு இனி செல்லுப்படியாகாது", te: "డిస్కౌంట్ కోడ్ కాలం చెల్లిపోయింది", be: "ছাড়ের কোডটি আর বৈধ নয়" },
    COUPON_REDEMPTION_LIMIT: {
        en: "Discount code has reached max number of usage and is no longer valid.",
        hi: "छूट के कोड का अधिकतम संख्या में उपयोग कर लिया गया है और यह अब मान्य नहीं है.",
        ta: "தள்ளுபடி குறியீடு அதிகபட்ச பயன்பாட்டின் எண்ணிக்கையை எட்டியுள்ளது மற்றும் இனி செல்லுப்படியாகாது.",
        te: "స్కౌంట్ కోడ్ గరిష్ట సంఖ్యలో ఉపయోగించబడినది మరియు ఇంకా చెల్లుబాటు కాదు.",
        be: "ছাড়ের কোডটি সর্বাধিক ব্যবহারের সংখ্যা পৌঁছে গেছে এবং আর বৈধ নয়",
    },
    ALPHANUMERIC_PROMO_CODE: {
        en: "Promo code must be alphanumeric and without spaces",
        hi: "Promo code must be alphanumeric and without spaces",
        ta: "Promo code must be alphanumeric and without spaces",
        te: "Promo code must be alphanumeric and without spaces",
        be: "Promo code must be alphanumeric and without spaces",
    },
    Enterpromocode: { en: "Enter Promo code", hi: "Enter Promo code", ta: "Enter Promo code", te: "Enter Promo code", be: "Enter Promo code" },
    INVALID_PROMO_CODE: { en: "Promo code is invalid", hi: "Promo code is invalid", ta: "Promo code is invalid", te: "Promo code is invalid", be: "Promo code is invalid" },
    INVALID_PROMO_OFFER_COMBO: {
        en: "Promo code is not valid for this subscription",
        hi: "Promo code is not valid for this subscription",
        ta: "Promo code is not valid for this subscription",
        te: "Promo code is not valid for this subscription",
        be: "Promo code is not valid for this subscription",
    },
    PROMO_EXPIRED: { en: "Promo code is no longer valid", hi: "Promo code is no longer valid", ta: "Promo code is no longer valid", te: "Promo code is no longer valid", be: "Promo code is no longer valid" },
    PROMO_REDEMPTION_LIMIT: {
        en: "Promo code has reached max number of usage and is no longer valid.",
        hi: "Promo code has reached max number of usage and is no longer valid.",
        ta: "Promo code has reached max number of usage and is no longer valid.",
        te: "Promo code has reached max number of usage and is no longer valid.",
        be: "Promo code has reached max number of usage and is no longer valid.",
    },
    otpValidation: {
        en: "Consumer must submit 6 numeric characters in the text field.",
        hi: "ग्राहक को टेक्स्ट फ़ील्ड में 6 सांख्यिक वर्ण दर्ज करने होंगे.",
        ta: "நுகர்வோர் உரை புலத்தில் 6 இலக்க எழுத்துக்களை சமர்ப்பிக்க வேண்டும்",
        te: "వినియోగదారుడు టెక్స్ట్ ప్రదేశంలో 6 అంకెలను తెలియజేయాలి.",
        be: "উপভোক্তার টেক্সট ফিল্ডে 6টি সংখ্যা ক্যারেক্টার জমা দেওয়া আবশ্যক।",
    },
    alternateNumberValidation: {
        en: "Oops, it looks like you need to enter alternate mobile number.",
        hi: "ओह, ऐसा लगता है कि आपको वैकल्पिक मोबाइल नंबर डालने की ज़रूरत होगी.",
        ta: "அடடா, நீங்கள் மாற்று மொபைல் எண்ணை உள்ளிட வேண்டும் என்று தெரிகிறது.",
        te: "అయ్యో, మీరు వేరొక మొబైల్ నెంబర్ ఎంటర్ చేయవలసి ఉంటుంది.",
        be: "এই যাঃ, মনে হচ্ছে আপনাকে একটি বিকল্প মোবাইল নম্বর লিখতে হবে।",
    },
    KBAvalidation: { en: "Please select an answer.", hi: "कृपया किसी उत्तर का चयन करें.", ta: "தயவுசெய்து ஒரு பதிலைத் தேர்ந்தெடுக்கவும்.", te: "దయచేసి ఒక సమాధానాన్ని ఎంచుకోండి.", be: "অনুগ্রহ করে একটি উত্তর বেছে নিন।" },
    alterMobileValidation: {
        en: "The telephone number you have entered is not valid. Please try again.",
        hi: "आपके द्वारा दर्ज किया गया टेलीफ़ोन नंबर मान्य नहीं है. कृपया दोबारा कोशिश करें.",
        ta: "நீங்கள் உள்ளிட்ட தொலைபேசி எண் செல்லுபடியாகாது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
        te: "మీరు ఎంటర్ చేసిన టెలిఫోన్ నెంబర్ చెల్లదు. దయచేసి తిరిగి ప్రయత్నించండి.",
        be: "আপনার লেখা টেলিফোন নম্বরটি বৈধ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
    panRegexValid: {
        en: "Please enter a valid identity proof number. All letters in your ID number must be in uppercase.",
        hi: "कृपया वैध पहचान प्रमाणपत्र का नंबर डालें. आपकी ID नंबर के सभी अक्षर बड़े अक्षर में ही होने चाहिए.",
        ta: "தயவுசெய்து செல்லுபடியாகும் அடையாள அட்டை எண்ணை உள்ளிடுங்கள். உங்கள் அடையாள எண்ணில் உள்ள அனைத்து எழுத்துக்களும் பெரிய எழுத்தில் இருக்க வேண்டும்.",
        te: "చెల్లుబాటు అయ్యే గుర్తింపు ఋజువు నెంబర్ ఎంచుకోండి. మీ ఐడి నెంబర్ అప్పర్కేస్లో ఉండాలి.",
        be: "অনুগ্রহ করে একটি বৈধ পরিচিতির প্রমাণের নম্বর লিখুন। আপনার আইডি নম্বরের যাবতীয় অক্ষর বড়হাতের হওয়া আবশ্যক।",
    },
    panValid: {
        en: "PAN Number should be 10 characters (For e.g. ACPQD2419D).",
        hi: "पैन नंबर 10 वर्णों का होना चाहिए (उदाहरण के लिए, ACPQD2419D).",
        ta: "PAN பான் எண் 10 எழுத்துகளாக இருக்க வேண்டும் (உதாரணத்திற்கு ACPQD2419D).",
        te: "PAN నంబర్ 10 అక్షరాలు ఉండాలి (ఉదా. ACPQD2419D).",
        be: "PAN নম্বর 10টি ক্যারেক্টারের হতে হবে (উদাহরণস্বরূপ ACPQD2419D).",
    },
    passportRegexValid: {
        en: "Passport Number should be 8 characters (For e.g. A5671234).",
        hi: "पासपोर्ट नंबर 8 वर्णों का होना चाहिए (उदाहरण के लिए, A5671234).",
        ta: "பாஸ்போர்ட் எண் 8 எழுத்துகளாக இருக்க வேண்டும் (உதாரணத்திற்கு A5671234)",
        te: "పాస్‌‌పోర్ట్ నంబర్ 8 అక్షరాలు ఉండాలి (ఉదా. A5671234)",
        be: "পাসপোর্ট নম্বর 8টি ক্যারেক্টারের হতে হবে (উদাহরণস্বরূপ A5671234).",
    },
    passportValid: {
        en: "Please enter 8 characters for a valid PassPort Number(format: A1234567).",
        hi: "कृपया एक वैध पासपार्ट नंबर के लिए 8 वर्ण दर्ज करें (फ़ॉर्मेट: A1234567).",
        ta: "தயவுசெய்து செல்லுப்படியாகும் பாஸ்போர்ட் எண்ணிற்கு 8 எழுத்துக்களை உள்ளிடவும் (வடிவம்: A1234567).",
        te: "చెల్లే పాస్‌‌పోర్ట్ నంబర్ కోసం దయచేసి 8 అక్షరాలు ఎంటర్ చేయండి(ఫార్మాట్: A1234567).",
        be: "অনুগ্রহ করে একটি বৈধ পাসপোর্ট নম্বরের 8টি ক্যারেক্টার লিখুন(ফরম্যাট: A1234567).",
    },
    voterRegexValid: {
        en: "Please enter a valid Voter ID Number  (For e.g. ABC123654).",
        hi: "कृपया एक वैध वोटर ID नंबर दर्ज करें  (उदाहरण के लिए, ABC123654).",
        ta: "தயவுசெய்து செல்லுபடியாகும் வாக்காளர் அடையாள எண்ணை உள்ளிடவும் (உதாரணத்திற்கு ABC123654).",
        te: "దయచేస్క్చెలేుఓటర్ట్ ఐడినోంబర్ట్ ఎోంటర్ట్ చేయోండ",
        te: "దయచేసి చెల్లే వోటర్ ఐడీ నంబర్ ఎంటర్ చేయండి (ఉదా. ABC123654).",
        be: "অনুগ্রহ করে একটি বৈধ ভোটার আইডি নম্বর লিখুন (উদাহরণস্বরূপ ABC123654).",
    },
    voterValid: {
        en: "Please enter minimum 9 characters for a valid Voter ID Number (For e.g. ABC123654).",
        hi: "कृपया मान्य वोटर ID नंबर के न्यूनतम 9 वर्ण दर्ज करें (उदाहरण के लिए ABC1236549).",
        ta: "தயவுசெய்து செல்லுபடியாகும் வாக்காளர் அடையாள எண்ணுக்கு குறைந்தபட்சம் 9 எழுத்துக்களை உள்ளிடவும் (உதாரணத்திற்கு ABC123654).",
        te: "చెల్లే వోటర్ ఐడి నంబర్ కొరకు కనీసం 9 అక్షరాలను ఎంటర్ చేయండి (ఉదా. ABC123654).",
        be: "অনুগ্রহ করে একটি বৈধ ভোটার আইডি নম্বরের অন্তত 9টি ক্যারেক্টার লিখুন (উদাহরণস্বরূপ ABC123654).",
    },
    aadharRegexValid: { en: "Aadhaar Number format is not correct.", hi: "आधार नंबर का फ़ॉर्मेट सही नहीं है.", ta: "ஆதார் எண் வடிவம் தவறானது.", te: "ఆధార్ నంబర్ ఫార్మాట్ తప్పు.", be: "আধার নম্বরের ফরম্যাট সঠিক নয়। " },
    aadharValid: {
        en: "Aadhaar Number should be 12 digits (For e.g. 123456789012).",
        hi: "आधार नंबर 12 अंकों का होना चाहिए (उदाहरण के लिए, 123456789012). ",
        ta: "ஆதார் எண்ணில் 12 இலக்கங்கள் இருக்க வேண்டும் (உதாரணத்திற்கு 123456789012).",
        te: "ఆధార్ నంబర్ 12 అంకెలు ఉండాలి (ఉదా. 123456789012).",
        be: "আধার নম্বর 12টি অঙ্কের হতে হবে (উদাহরণস্বরূপ 123456789012).",
    },
    licenseRegexValid: {
        en: "Please enter a valid Driver's License Number. All letters in your ID number must be in uppercase.",
        hi: "कृपया मान्य ड्राइविंग लाइसेंस नंबर डालें. आपके ID नंबर के सभी अक्षर बड़े अक्षर होने चाहिए.",
        ta: "தயவுசெய்து சரியான ஓட்டுநர் உரிம எண்ணை உள்ளிடவும். உங்கள் அடையாள எண்ணில் உள்ள அனைத்து எழுத்துக்களும் பெரிய எழுத்தில் இருக்க வேண்டும்.",
        te: "దయచేసి చెల్లే డ్రైవింగ్ లైసెన్స్ నంబర్‌‌ ఎంటర్ చేయండి. మీ ID నంబర్ మీద ఉన్న అక్షరాలన్నీ పెద్దబడి అక్షరాలై ఉండాలి.",
        be: "অনুগ্রহ করে একটি বৈধ ড্রাইভিং লাইসেন্স নম্বর লিখুন। আপনার আইডি নম্বরের যাবতীয় অক্ষর বড়হাতের হওয়া আবশ্যক।",
    },
    licenseValid: {
        en: "Please enter a valid Driver's License Number",
        hi: "कृपया मान्य ड्राइविंग लाइसेंस नंबर डालें",
        ta: "தயவுசெய்து செல்லுபடியாகும் ஓட்டுநர் உரிம எண்ணை உள்ளிடவும்.",
        te: "దయచేస్క్చెలేుడెైైవిోంగ్ లెైస్కెన్ె నోంబర్ట్ ఎోంటర్ట్ చేయోండ",
        te: "దయచేసి చెల్లే డ్రైవింగ్ లైసెన్స్ నంబర్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ ড্রাইভিং লাইসেন্স নম্বর লিখুন",
    },
    rationRegexValid: {
        en: "Please enter a valid Ration Card Number. All letters in your ID number must be in uppercase.",
        hi: "कृपया मान्य राशन कार्ड नंबर डालें. आपके ID नंबर के सभी अक्षर बड़े अक्षर होने चाहिए.",
        ta: "தயவுசெய்து செல்லுபடியாகும் ரேஷன் கார்டு எண்ணை உள்ளிடவும். உங்கள் அடையாள எண்ணில் உள்ள அனைத்து எழுத்துக்களும் பெரிய எழுத்தில் இருக்க வேண்டும்.",
        te: "దయచేసి చెల్లే రేషన్ కార్డ్ నంబర్‌‌ను ఎంటర్ చేయండి. మీ ID నంబర్ మీద ఉన్న అక్షరాలన్నీ పెద్దబడి అక్షరాలై ఉండాలి.",
        be: "অনুগ্রহ করে একটি বৈধ রেশন কার্ড নম্বর লিখুন। আপনার আইডি নম্বরের যাবতীয় অক্ষর বড়হাতের হওয়া আবশ্যক।",
    },
    rationValid: {
        en: "Please enter a valid Ration Card Number",
        hi: "कृपया मान्य राशन कार्ड नंबर डालें",
        ta: "தயவுசெய்து செல்லுபடியாகும் ரேஷன் கார்டு எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే రేషన్ కార్డ్ నంబర్‌‌ను ఎంటర్ చేయండి.",
        be: "অনুগ্রহ করে একটি বৈধ রেশন কার্ড নম্বর লিখুন",
    },
    StatePincode: {
        en: "Pincode entered does not belong to the State selected. Please enter a valid Pincode.",
        hi: "दर्ज किया गया पिनकोड राज्य से चयनित नहीं है. कृपया एक मान्य पिनकोड दर्ज करें.",
        ta: "உள்ளிடப்பட்ட அஞ்சல் குறியீடு தேர்ந்தெடுக்கப்பட்ட மாநிலத்திற்கு சொந்தமானது அல்ல. தயவுசெய்து செல்லுபடியாகும் அஞ்சல் குறியீடை உள்ளிடவும்.",
        te: "ఎంటర్ చేసిన పిన్కోడ్, ఎంపిక చేసుకున్న రాష్ట్రానికి చెందినది కాదు. దయచేసి చెల్లే పిన్‌‌కోడ్ ఎంటర్ చేయండి.",
        be: "পিনকোডটি নির্বাচিত রাজ্যের মধ্যে পড়ে না। অনুগ্রহ করে একটি বৈধ পিনকোড লিখুন।",
    },
    ValidPincode: {
        en: "Please enter a valid pincode",
        hi: "कृपया एक मान्य पिनकोड दर्ज करें.",
        ta: "தயவுசெய்து செல்லுபடியாகும் அஞ்சல் குறியீடை உள்ளிடவும்.",
        te: "దయచేసి చెల్లే పిన్‌‌కోడ్ ఎంటర్ చేయండి.",
        be: "অনুগ্রহ করে একটি বৈধ পিনকোড লিখুন",
    },
    enquiryHide: {
        en: "- Hide Credit Application History (Enquiries) older than 3 years",
        hi: "- 3 वर्ष से ज्यादा पुराने पूछताछ के विवरणों को छिपाएं",
        ta: "3 வருடத்திற்கு மேற்பட்ட விசாரணைகளை மறைக்கவும்",
        te: "- 3 సంవత్సరాల కంటే పాత ట్రయల్స్ దాచండి",
        be: "- 3 বছরের বেশি পুরোনো অনুসন্ধানগুলি লুকোন",
    },
    enquiryShow: {
        en: "+ Show Credit Application History (Enquiries) older than 3 years",
        hi: "+ 3 वर्ष से ज्यादा पुराने पूछताछ के विवरणों को दिखाएं",
        ta: "3 வருடத்திற்கு மேற்பட்ட விசாரணைகளைக் காட்டவும்.",
        te: "+ 3 సంవత్సరాల కంటే పాత విచారణలు చూపించు",
        be: "+ 3 বছরের বেশি পুরোনো অনুসন্ধানগুলি দেখান",
    },
    accountsHide: { en: "- Hide Closed Accounts", hi: "- बंद किए गए खाते छिपाएं", ta: "மூடப்பட்ட அக்கவுண்ட்களை மறைக்கவும்", te: "- మూసివేసిన ఖాతాలను దాచండి", be: "- বন্ধ অ্যাকাউন্টগুলি লুকোন" },
    accountsShow: { en: "+ Show Closed Accounts", hi: "+ बंद किए गए खाते दिखाएं", ta: "மூடப்பட்ட அக்கவுண்ட்களைக் காட்டவும்", te: "+ మూసివేసిన ఖాతాలు చూపించు", be: "+ বন্ধ অ্যাকাউন্টগুলি দেখান" },
    disputesHide: { en: "- Hide", hi: "– छिपाएं", ta: "– மறை", te: "– దాచు", be: "- লুকোন" },
    disputesShow: { en: "+ Show", hi: "+ दिखाएं ", ta: "+ காட்டு", te: "+ చూపించు", be: "+ দেখান" },
    disputeStatus_DisputeID: { en: "Dispute ID", hi: "विवाद ID", ta: "சர்ச்சை ஐடி", te: "వివాదపు ఐడి", be: "বিতর্কের আইডি" },
    disputeStatus_DateInit: { en: "Date Initiated", hi: "शुरू होने की तारीख", ta: "தொடங்கிய தேதி", te: "దాఖలు చేసిన తేదీ", be: "আরম্ভ করার তারিখ" },
    disputeStatus_Status: { en: "Status", hi: "स्थिति", ta: "நிலை", te: "స్థితి", be: "স্থিতি" },
    disputeStatus_DateClosed: { en: "Date Closed", hi: "समाप्त होने की तारीख", ta: "மூடப்பட்ட தேதி", te: "మూసివేసిన తేదీ", be: "বন্ধ করার তারিখ" },
    disputeStatus_noRecords: { en: "No records available", hi: "No records available", ta: "No records available", te: "No records available", be: "No records available" },
    disputeStatus_Section: { en: "Section", hi: "अनुभाग", ta: "பிரிவு", te: "విభాగం", be: "বিভাগ" },
    disputeStatus_fieldName: { en: "Field name", hi: "फ़ील्ड का नाम", ta: "புலத்தின் பெயர்", te: "ఫీల్డ్ పేరు", be: "ফিল্ডের নাম" },
    disputeStatus_Description: { en: "Description", hi: "विवरण ", ta: "விளக்கம்", te: "వివరణ", be: "বর্ণনা" },
    Dispute_NameRegex: { en: "Please enter a valid Name", hi: "कृपया कोई मान्य नाम दर्ज करें", ta: "தயவுசெய்து சரியான பெயரை உள்ளிடவும்", te: "దయచేసి చెల్లే పేరును ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ নাম লিখুন" },
    Dispute_NameLeng: {
        en: "This field should have at least 3 characters",
        hi: "इस फ़ील्ड में कम से कम 3 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் குறைந்தபட்சம் 3 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో కనీసం 3 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে অন্তত 3টি ক্যারেক্টার থাকতে হবে",
    },
    Dispute_Gender: {
        en: "Please enter a valid Gender",
        hi: "कृपया मान्य लिंग दर्ज करें.",
        ta: "பிழை செய்தி: தயவுசெய்து செல்லுபடியாகும் பாலினத்தை உள்ளிடவும்.",
        te: "దయచేసి చెల్లే లింగాన్ని ఎంటర్ చేయండి.",
        be: "অনুগ্রহ করে একটি বৈধ লিঙ্গ লিখুন",
    },
    Dispute_Voter: {
        en: "Please enter a valid Voter ID Number",
        hi: "कृपया मान्य वोटर ID नंबर डालें",
        ta: "தயவுசெய்து சரியான வாக்காளர் எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఓటర్ ఐడి నంబర్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ ভোটার আইডি নম্বর লিখুন",
    },
    Dispute_VoterMax: {
        en: "This field should have maximum 30 characters",
        hi: "इस फ़ील्ड में अधिकतम 30 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் அதிகபட்சம் 30 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో గరిష్టంగా 30 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে সর্বাধিক 30টি অঙ্ক থাকতে পারবে",
    },
    Dispute_VoterMin1: { en: "This field should have at least ", hi: "इस फ़ील्ड में कम से कम  ", ta: "இந்த புலத்தில் குறைந்தபட்சம் இருக்க வேண்டியது ", te: "ఈ స్థలం కనీసం ఉండాలి", be: "এই ফিল্ডে অন্তত থাকতে হবে " },
    Dispute_VoterMin2: { en: " characters", hi: "वर्ण होने चाहिए", ta: "எழுத்துக்கள்", te: "అంకెలు పొడవు", be: "গুলি ক্যারেক্টার" },
    Dispute_PassportMin: {
        en: "This field should have at least 7 characters",
        hi: "इस फ़ील्ड में कम से कम 7 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் குறைந்தபட்சம் 7 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో కనీసం 7 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে অন্তত 7টি ক্যারেক্টার থাকতে হবে",
    },
    Dispute_Passport: {
        en: "Please enter a valid Passport number",
        hi: "कृपया मान्य पासपोर्ट नंबर डालें",
        ta: "தயவுசெய்து சரியான பாஸ்போர்ட் எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే పాస్పోర్ట్ నంబర్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ পাসপোর্ট নম্বর লিখুন",
    },
    Dispute_PassportMax: {
        en: "This field should have maximum 10 characters",
        hi: "इस फ़ील्ड में अधिकतम 10 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் அதிகபட்சம் 10 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో గరిష్టంగా 10 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে সর্বাধিক 10টি অঙ্ক থাকতে পারবে",
    },
    Dispute_Pan: { en: "Please enter a valid PAN Number", hi: "कृपया मान्य पैन नंबर डालें", ta: "தயவுசெய்து சரியான PAN எண்ணை உள்ளிடவும்", te: "దయచేసి చెల్లే PAN నంబర్ ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ PAN নম্বর লিখুন" },
    Dispute_PanMin: {
        en: "This field should have at least 10 characters",
        hi: "इस फ़ील्ड में अधिकतम 10 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் குறைந்தபட்சம் 10 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో కనీసం 10 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে অন্তত 10টি ক্যারেক্টার থাকতে হবে",
    },
    Dispute_PanMax: {
        en: "This field should have maximum 30 characters",
        hi: "इस फ़ील्ड में अधिकतम 30 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் அதிகபட்சம் 30 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో గరిష్టంగా 30 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে সর্বাধিক 30টি অঙ্ক থাকতে পারবে",
    },
    Dispute_License: {
        en: "Please enter a valid Driver License Number",
        hi: "कृपया मान्य ड्राइविंग लाइसेंस नंबर डालें",
        ta: "தயவுசெய்து சரியான ஓட்டுநர் உரிம எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే డ్రైవింగ్ లైసెన్స్ నంబర్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ ড্রাইভিং লাইসেন্স নম্বর লিখুন",
    },
    Dispute_LicenseMin: {
        en: "This field should have at least 2 characters",
        hi: "इस फ़ील्ड में कम से कम 2 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் குறைந்தபட்சம் 2 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో కనీసం 2 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে অন্তত 2টি ক্যারেক্টার থাকতে হবে",
    },
    Dispute_Ration: {
        en: "Please enter a valid Ration Card Number",
        hi: "कृपया मान्य राशन कार्ड नंबर डालें",
        ta: "தயவுசெய்து சரியான ரேஷன் கார்டு எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే రేషన్ కార్డ్ నంబర్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ রেশন কার্ড নম্বর লিখুন",
    },
    Dispute_Aadhar: {
        en: "Please enter a valid Aadhaar Number",
        hi: "कृपया मान्य आधार कार्ड नंबर डालें",
        ta: "தயவுசெய்து சரியான ஆதார் எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఆధార్ నంబర్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ আধার নম্বর লিখুন",
    },
    Dispute_AadharLen: { en: "This field should have 12 digits", hi: "इस फ़ील्ड में 12 अंक होने चाहिए", ta: "இந்த புலத்தில் 12 எழுத்துக்கள் இருக்க வேண்டும்", te: "ఈ ప్రదేశంలో 12 అంకెలు ఉండాలి", be: "এই ফিল্ডে 12টি অঙ্ক থাকতে হবে" },
    Dispute_Address: { en: "Please enter a valid Address", hi: "कृपया कोई मान्य पता दर्ज करें", ta: "தயவுசெய்து சரியான முகவரியை உள்ளிடவும்", te: "దయచేసి చెల్లే చిరునామా ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ লিখুন " },
    Dispute_Email: {
        en: "Please enter a valid Email Address",
        hi: "कृपया मान्य ईमेल पता दर्ज करें",
        ta: "தயவுசெய்து சரியான ஈமெயில் முகவரியை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఇమెయిల్ అడ్రస్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ ইমেল অ্যাড্রেস লিখুন",
    },
    Dispute_EmailMin: {
        en: "This field should have at least 10 characters",
        hi: "इस फ़ील्ड में कम से कम 10 वर्ण होने चाहिए",
        ta: "இந்த புலத்தில் குறைந்தபட்சம் 10 எழுத்துக்கள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో గరిష్టంగా 10 క్యారెక్టర్లు ఉండాలి",
        be: "এই ফিল্ডে অন্তত 10টি ক্যারেক্টার থাকতে হবে",
    },
    Dispute_Category: { en: "Please enter a valid Category", hi: "कृपया मान्य श्रेणी दर्ज करें ", ta: "தயவுசெய்து சரியான வகையை உள்ளிடவும் ", te: "దయచేసి చెల్లే వర్గం ఎంటర్ చేయండి ", be: "অনুগ্রহ করে একটি বৈধ শ্রেণী লিখুন" },
    Dispute_Residence: {
        en: "Please enter a valid Residence Code",
        hi: "कृपया कोई मान्य निवास कोड दर्ज करें",
        ta: "தயவுசெய்து சரியான இருப்பிட குறியீட்டை உள்ளிடவும்",
        te: "దయచేసి చెల్లే రెసిడెన్స్ కోడ్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ বাসস্থান কোড লিখুন",
    },
    Dispute_Phone: { en: "Please enter a valid Phone number", hi: "कृपया मान्य फ़ोन नंबर डालें", ta: "தயவுசெய்து சரியான தொலைபேசி எண்ணை உள்ளிடவும்", te: "దయచేసి చెల్లే ఫోన్ నంబర్ ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ ফোন নম্বর লিখুন" },
    Dispute_PhoneMin: {
        en: "This field should have at least 5 digits",
        hi: "इस फ़ील्ड में कम से कम 5 अंक होने चाहिए",
        ta: "இந்த புலத்தில் குறைந்தபட்சம் 5 இலக்குகள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో కనీసం 5 అంకెలు ఉండా",
        be: "এই ফিল্ডে অন্তত 5টি অঙ্ক থাকতে হবে",
    },
    Dispute_PhoneMax: {
        en: "This field should have maximum 20 digits",
        hi: "इस फ़ील्ड में अधिकतम 20 अंक होने चाहिए",
        ta: "இந்த புலத்தில் அதிகபட்சம் 20 இலக்குகள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో గరిష్టంగా 20 అంకెలు ఉండాలి",
        be: "এই ফিল্ডে সর্বাধিক 20টি অঙ্ক থাকতে পারবে",
    },
    Dispute_MobileMin: {
        en: "This field should have at least 10 digits",
        hi: "इस फ़ील्ड में कम से कम 10 अंक होने चाहिए",
        ta: "இந்த புலத்தில் குறைந்தபட்சம் 10 இலக்குகள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో కనీసం 10 అంకెలు ఉండాలి",
        be: "এই ফিল্ডে অন্তত 10টি অঙ্ক থাকতে হবে",
    },
    Dispute_Mobile: {
        en: "Please enter a valid Mobile Phone",
        hi: "कृपया कोई मान्य मोबाइल फ़ोन दर्ज करें.",
        ta: "தயவுசெய்து சரியான மொபைல் எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే మొబైల్ ఫోన్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ মোবাইল ফোন নম্বর লিখুন",
    },
    Dispute_HomePhone: {
        en: "Please enter a valid Home phone",
        hi: "कृपया घर का वैध फ़ोन नंबर डालें",
        ta: "தயவுசெய்து சரியான வீட்டுத் தொலைபேசி எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఇంటి ఫోన్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ বাড়ির ফোন নম্বর লিখুন",
    },
    Dispute_OffPhone: {
        en: "Please enter a valid Office Phone",
        hi: "कृपया कार्यालय का वैधफ़ोन नंबर डालें",
        ta: "தயவுசெய்து சரியான அலுவலக தொலைபேசி எண்ணை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఆఫీస్ ఫోన్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ দপ্তরের ফোন নম্বর লিখুন",
    },
    Dispute_Account: {
        en: "Please enter a valid Account Type",
        hi: "कृपया वैध खाता प्रकार दर्ज करें",
        ta: "தயவுசெய்து சரியான அக்கவுண்ட் வகையை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఖాతా రకం ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ অ্যাকাউন্টের প্রকার লিখুন",
    },
    Dispute_Occupation: { en: "Please enter a valid Occupation", hi: "कृपया वैध पेशा दर्ज करें", ta: "தயவுசெய்து சரியான தொழிலை உள்ளிடவும்", te: "దయచేసి చెల్లే వృత్తిని ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ পেশা লিখুন" },
    Dispute_Income: { en: "Please enter a valid Income", hi: "कृपया वैध आय दर्ज करें", ta: "தயவுசெய்து சரியான வருமானத்தை உள்ளிடவும்", te: "దయచేసి చెల్లే ఆదాయం ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ উপার্জন লিখুন" },
    Dispute_IncomeMax: { en: "This field should have maximum ", hi: "इस फ़ील्ड में अधिकतम  ", ta: "இந்த புலத்தில் அதிகபட்சம் இருக்க வேண்டியது ", te: "ఈ ప్రదేశంలో గరిష్టంగా ", be: "এই ফিল্ডে সর্বাধিক থাকতে পারবে " },
    Dispute_digits: { en: " digits", hi: " अंक होने चाहिए", ta: " இலக்குகள் ", te: " అంకెలు ఉండాలి", be: "অঙ্ক" },
    Dispute_Payment: {
        en: "Please enter a valid Payment Frequency",
        hi: "कृपया वैध भुगतान आवृत्ति दर्ज करें",
        ta: "தயவுசெய்து சரியான கட்டண அடுக்கு நிகழ்வுகளை உள்ளிடவும்",
        te: "దయచేసి చెల్లే చెల్లింపు తరచుదనం ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ অর্থপ্রদান পুনরাবৃত্তির হার লিখুন ",
    },
    Dispute_IncomeIndicator: {
        en: "Please enter a valid Income Indicator",
        hi: "कृपया वैध आय संकेतक दर्ज करें",
        ta: "தயவுசெய்து சரியான வருமான சுட்டிக்காட்டியை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఆదాయ సూచీ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি উপার্জন নির্দেশক লিখুন",
    },
    Dispute_Ownership: { en: "Please enter a valid Ownership", hi: "कृपया वैध स्वामित्व दर्ज करें", ta: "தயவுசெய்து சரியான உடைமையை உள்ளிடவும்", te: "దయచేసి చెల్లే ఓనర్షిప్ ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ মালিকানা লিখুন" },
    Dispute_CreditLimit: {
        en: "Please enter a valid Credit Limit",
        hi: "कृपया वैध क्रेडिट सीमा दर्ज करें",
        ta: "தயவுசெய்து சரியான கடன் வரம்பை உள்ளிடவும்",
        te: "దయచేసి చెల్లే క్రెడిట్ పరిమితి ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ ক্রেডিটের সীমা লিখুন",
    },
    Dispute_SanctionedAmt: {
        en: "Please enter a valid Sanctioned Amount",
        hi: "कृपया वैध स्वीकृत राशि दर्ज करें",
        ta: "தயவுசெய்து சரியான அனுமதிக்கப்பட்ட தொகையை உள்ளிடவும்",
        te: "దయచేసి చెల్లే మంజూరు చేయబడ్డ మొత్తం ఎంటర్ చేయండి",
        be: "   অনুগ্রহ করে একটি বৈধ মঞ্জুর করা রাশি লিখুন",
    },
    Dispute_HighCredit: {
        en: "Please enter a valid High Credit",
        hi: "कृपया वैध उच्च क्रेडिट दर्ज करें",
        ta: "தயவுசெய்து சரியான உயர் கடனை உள்ளிடவும்",
        te: "దయచేసి చెల్లుబాటు అయ్యే హై క్రెడిట్‌‌ను ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ উচ্চ ক্রেডিট লিখুন",
    },
    Dispute_CurrentBal: {
        en: "Please enter a valid Current Balance",
        hi: "कृपया वैध मौजूदा बैलेंस दर्ज करें",
        ta: "தயவுசெய்து சரியான தற்போதைய இருப்பை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ప్రస్తుత బ్యాలెన్స్ ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ বর্তমান ব্যালেন্স লিখুন",
    },
    Dispute_CashLimit: { en: "Please enter a valid Cash Limit", hi: "कृपया वैध नकद सीमा दर्ज करें", ta: "தயவுசெய்து சரியான ரொக்க வரம்பை உள்ளிடவும்", te: "దయచేసి చెల్లే నగదు పరిమితి ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ নগদ সীমা লিখুন" },
    Dispute_AmountOverdue: {
        en: "Please enter a valid Amount Overdue",
        hi: "कृपया वैध अतिदेय राशि दर्ज करें",
        ta: "தயவுசெய்து சரியான மிகைத் தொகையை உள்ளிடவும்",
        te: "దయచేసి చెల్లే ఓవర్డ్యూ మొత్తం ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ বাকি পড়া রাশি লিখুন",
    },
    Dispute_ROI: {
        en: "Please enter a valid Rate of Interest",
        hi: "कृपया वैध ब्याज दर दर्ज करें",
        ta: "தயவுசெய்து சரியான வட்டி விகிதத்தை உள்ளிடவும்",
        te: "దయచేసి చెల్లే వడ్డీ రేటు ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ সুদের হার লিখুন",
    },
    Dispute_Max8Digits: {
        en: "This field should have maximum 8 digits",
        hi: "इस फ़ील्ड में अधिकतम 8 अंक होने चाहिए",
        ta: "இந்த புலத்தில் அதிகபட்சம் 8 இலக்குகள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో గరిష్టంగా 8 అంకెలు ఉండాలి",
        be: "এই ফিল্ডে সর্বাধিক 8টি অঙ্ক থাকতে পারবে",
    },
    Dispute_RepaymentTenure: {
        en: "Please enter a valid Repayment Tenure",
        hi: "कृपया वैध पुनर्भुगतान अवधि दर्ज करें",
        ta: "தயவுசெய்து சரியான திருப்பிச் செலுத்தும் காலத்தை உள்ளிடவும்",
        te: "దయచేసి చెల్లే తిరిగి చెల్లించే వ్యవధి ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ ফেরত দেওয়ার মেয়াদ লিখুন",
    },
    Dispute_Max3Digits: {
        en: "This field should have maximum 3 digits",
        hi: "इस फ़ील्ड में अधिकतम 3 अंक होने चाहिए",
        ta: "இந்த புலத்தில் அதிகபட்சம் 3 இலக்குகள் இருக்க வேண்டும்",
        te: "ఈ ప్రదేశంలో గరిష్టంగా 3 అంకెలు ఉండాలి",
        be: "এই ফিল্ডে সর্বাধিক 3টি অঙ্ক থাকতে পারবে",
    },
    Dispute_EMIAmt: { en: "Please enter a valid EMI Amount", hi: "कृपया वैध EMI राशि दर्ज करें", ta: "தயவுசெய்து சரியான EMI தொகையை உள்ளிடவும்", te: "దయచేసి చెల్లే ఇఎంఐ మొత్తం ఎంటర్ చేయండి", be: "অনুগ্রহ করে একটি বৈধ EMI এর রাশি লিখুন" },
    Dispute_PaymentAmt: {
        en: "Please enter a valid Actual Payment Amount",
        hi: "कृपया वैध वास्तविक भुगतान राशि दर्ज करें",
        ta: "தயவுசெய்து சரியான உண்மை கட்டண தொகையை உள்ளிடவும்",
        te: "దయచేసి చెల్లే అసలు చెల్లింపు ఎంటర్ చేయండి",
        be: " অনুগ্রহ করে একটি বৈধ প্রকৃত প্রদত্ত রাশি লিখুন",
    },
    Dispute_DateOpened1: {
        en: "Date Opened/Disbursed cannot be before Date of Birth ",
        hi: "खुलने/संवितरित होने की तारीख जन्म दिनांक के पहले की नहीं हो सकती ",
        ta: "திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி பிறந்த தேதிக்கு முன் இருக்க முடியாது ",
        te: "తెరిచిన / పంపిణీ అయిన తేదీ, మీ జన్మదినం కంటే క్రితంది అయి ఉండకూడదు ",
        be: "খোলার/বিতরণের তারিখ জন্মতারিখের আগে হতে পারে না",
    },
    Dispute_DateOpened2: {
        en: "Date Opened/Disbursed cannot be after Date of Last Payment and Date Closed",
        hi: "खुलने/संवितरित होने की तारीख आखिरी भुगतान की तारीख और बंद होने की तारीख के बाद की नहीं हो सकती",
        ta: "திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி கடைசி கட்டண தேதி மற்றும் மூடப்பட்ட தேதிக்கு பின் இருக்க முடியாது",
        te: "తెరిచిన / పంపిణీ అయిన తేదీ, ఆఖరిసారి చెల్లింపు చేసిన తేదీకి మరియు మూసివేసిన తేదీకి తర్వాతదై ఉండకూడదు",
        be: "খোলার/বিতরণের তারিখ শেষবার অর্থপ্রদানের তারিখ ও বন্ধ করার তারিখের পরে হতে পারে না",
    },
    Dispute_DateOpened3: {
        en: "Date Opened/Disbursed cannot be after Date Closed",
        hi: "खुलने/संवितरित होने की तारीख, बंद होने की तारीख के बाद नही हो सकती",
        ta: "திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி மூடப்பட்ட தேதிக்கு பின் இருக்க முடியாது",
        te: "తెరిచిన / పంపిణీ అయిన తేదీ, మూసివేసిన తేదీకి తర్వాతదై ఉండకూడదు",
        be: "খোলার/বিতরণের তারিখ বন্ধ করার তারিখের পরে হতে পারে না",
    },
    Dispute_DateOpened4: {
        en: "Date Opened/Disbursed cannot be after Date of Last Payment",
        hi: "खुलने/संवितरित होने की तारीख, आखिरी भुगतान के बाद की तारीख नहीं हो सकती",
        ta: "திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி கடைசி கட்டண தேதிக்கு பின் இருக்க முடியாது",
        te: "తెరిచిన / పంపిణీ అయిన తేదీ, ఆఖరిసారి చెల్లింపు చేసిన తేదీకి తర్వాతదై ఉండకూడదు",
        be: "   খোলার/বিতরণের তারিখ শেষবার অর্থপ্রদানের তারিখের পরে হতে পারে না",
    },
    Dispute_DateOpened5: {
        en: "Date Opened/Disbursed cannot be after Date Reported and Certified",
        hi: "खुलने/संवितरित होने की तारीख, रिपोर्ट करने और प्रमाणन की तारीख के बाद की नहीं हो सकती",
        ta: "திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி புகாரளிக்கப்பட்ட மற்றும் சான்றளிக்கப்பட்ட தேதிக்கு பின் இருக்க முடியாது",
        te: "తెరిచిన / పంపిణీ అయిన తేదీ, నివేదించబడి, ధృవీకరించబడిన తేదీకి తర్వాతదై ఉండకూడదు",
        be: "Date Opened/Disbursed cannot be after Date Reported and Certified",
    },
    Dispute_DateClosed1: {
        en: "Date Closed cannot be before Date of Birth",
        hi: "बंद होने की तारीख, जन्म तारीख के पहले की नहीं हो सकती",
        ta: "மூடப்பட்ட தேதி பிறந்த தேதிக்கு முன் இருக்க முடியாது",
        te: "మూసివేసిన తేదీ, మీ జన్మదినం కంటే క్రితంది అయి ఉండకూడదు",
        be: "বন্ধ করার তারিখ জন্মতারিখের আগে হতে পারে না",
    },
    Dispute_DateClosed2: {
        en: "Date Closed cannot be before Date Opened/Disbursed and Date of Last Payment",
        hi: "बंद होने की तारीख, खोलने/संवितरित होने की तारीख और अंतिम भुगतान की तारीख के पहले की नहीं हो सकती",
        ta: "மூடப்பட்ட தேதி திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி மற்றும் கடைசி கட்டண தேதிக்கு முன் இருக்க முடியாது",
        te: "మూసివేసిన తేదీ, తెరిచిన / పంపిణీ అయిన తేదీ మరియు ఆఖరిసారి చెల్లింపు చేసిన తేదీకి క్రితంది అయి ఉండకూడదు",
        be: "বন্ধ করার তারিখ খোলার/বিতরণের তারিখ ও শেষবার অর্থপ্রদানের তারিখের আগে হতে পারে না",
    },
    Dispute_DateClosed3: {
        en: "Date Closed cannot be before Date Opened/Disbursed",
        hi: "बंद होने की तारीख, खोलने/संवितरित होने की तारीख से पहले की नहीं हो सकती",
        ta: "மூடப்பட்ட தேதி திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதிக்கு முன் இருக்க முடியாது",
        te: "మూసివేసిన తేదీ, తెరిచిన / పంపిణీ అయిన తేదీకి క్రితంది అయి ఉండకూడదు",
        be: "বন্ধ করার তারিখ খোলার/বিতরণের তারিখের আগে হতে পারে না",
    },
    Dispute_DateClosed4: {
        en: "Date Closed cannot be after Date Reported and Certified",
        hi: "बंद होने की तारीख, रिपोर्टिंग की तारीख और प्रमाणन की तारीख के बाद की नहीं हो सकती",
        ta: "மூடப்பட்ட தேதி புகாரளிக்கப்பட்ட மற்றும் சான்றளிக்கப்பட்ட தேதிக்கு பின் இருக்க முடியாது",
        te: "మూసివేసిన తేదీ, నివేదించబడి ధృవీకరించబడిన తేదీకి తర్వాతదై ఉండకూడదు",
        be: "বন্ধ করার তারিখ রিপোর্ট ও শংসিত করার তারিখের পরে হতে পারে না",
    },
    Dispute_DateClosed5: {
        en: "Date Closed cannot be before Date of Last Payment",
        hi: "बंद करने की तारीख, अंतिम भुगतान की तारीख के पहले की नहीं हो सकती",
        ta: "மூடப்பட்ட தேதி கடைசி கட்டண தேதிக்கு முன் இருக்க முடியாது",
        te: "మూసివేసిన తేదీ, ఆఖరిసారి చెల్లింపు చేసిన తేదీకి క్రితంది అయి ఉండకూడదు",
        be: "বন্ধ করার তারিখ শেষবার অর্থপ্রদানের তারিখের আগে হতে পারে না",
    },
    Dispute_DateLastPay1: {
        en: "Date of Last Payment cannot be before Date of Birth",
        hi: "अंतिम भुगतान की तारीख, जन्म तारीख के पहले की नहीं हो सकती",
        ta: "கடைசி கட்டண தேதி பிறந்த தேதிக்கு முன் இருக்க முடியாது",
        te: "అఖరిసారి చెల్లింపు చేసిన తేదీ, మీ జన్మదినం కంటే క్రితంది అయి ఉండకూడదు",
        be: "শেষবার অর্থপ্রদানের তারিখ জন্মতারিখের আগে হতে পারে না",
    },
    Dispute_DateLastPay2: {
        en: "Date of Last Payment cannot be after Date Closed",
        hi: "अंतिम भुगतान की तारीख, बंद होने की तारीख के बाद की नहीं हो सकती है  अंतिम भुगतान की तारीख, ",
        ta: "கடைசி கட்டண தேதி பிறந்த தேதிக்கு பின் இருக்க முடியாது",
        te: "అఖరిసారి చెల్లింపు చేసిన తేదీ, మూసివేసిన తేదీకి తర్వాతదై ఉండకూడదు",
        be: "শেষবার অর্থপ্রদানের তারিখ বন্ধ করার তারিখের পরে হতে পারে না",
    },
    Dispute_DateLastPay3: {
        en: "Date of Last Payment cannot be before Date Opened/Disbursed",
        hi: "खोलने/संवितरित होने की तारीख के पहले की नहीं हो सकती",
        ta: "கடைசி கட்டண தேதி மூடப்பட்ட தேதி திறக்கப்பட்ட/பட்டுவாடா செய்யப்பட்ட தேதி முன் இருக்க முடியாது",
        te: "అఖరిసారి చెల్లింపు చేసిన తేదీ, తెరిచిన / పంపిణీ చేసిన తేదీ కంటే క్రితంది అయి ఉండకూడదు",
        be: " শেষবার অর্থপ্রদানের তারিখ খোলার/বিতরণের তারিখের আগে হতে পারে না",
    },
    Dispute_DateLastPay4: {
        en: "Date of Last Payment cannot be after Date Reported and Certified",
        hi: "अंतिम भुगतान की तारीख, रिपोर्टिंग की तारीख और प्रमाणन की तारीख के बाद की नहीं हो सकती",
        ta: "கடைசி கட்டண தேதி புகாரளிக்கப்பட்ட மற்றும் சான்றளிக்கப்பட்ட தேதிக்கு பின் இருக்க முடியாது",
        te: "ఆఖరిసారి తేదీ, నివేదించబడి ధృవీకరించబడిన తేదీకి తర్వాతదై ఉండకూడదు",
        be: "শেষবার অর্থপ্রদানের তারিখ রিপোর্ট ও শংসিত করার তারিখের পরে হতে পারে না",
    },
    Dispute_CollateralValue: {
        en: "Please enter a valid Value of Collateral",
        hi: "कृपया अपनी संपार्श्व संपत्ति का वैध नंबर डालें",
        ta: "தயவுசெய்து சரியான இணை மதிப்பை உள்ளிடவும்",
        te: "దయచేసి చెల్లే పూచీకత్తు విలువ ఎంటర్ చేయండి",
        be: "  অনুগ্রহ করে একটি বৈধ জামানতের রাশি লিখুন",
    },
    Dispute_CollateralType: {
        en: "Please enter a valid Type of Collateral",
        hi: "कृपया अपनी संपार्श्व संपत्ति का वैध प्रकार डालें",
        ta: "தயவுசெய்து சரியான இணை வகையை உள்ளிடவும்",
        te: "దయచేసి చెల్లే పూచీకత్తు రకం ఎంటర్ చేయండి",
        be: "  অনুগ্রহ করে একটি বৈধ জামানতের প্রকার লিখুন",
    },
    Dispute_Suitfiled: {
        en: "Please enter a valid Suit - Filed / Willful Default",
        hi: "कृपया कोई वैध दायर मुकदमा/ स्वैच्छिक दिवालिया घोषित मामला डालें",
        ta: "தயவுசெய்து சரியான வழக்கு - தாக்கல்/விருப்பமான இயல்புநிலையை உள்ளிடவும்",
        te: "దయచేసి ఒక చెల్లే వ్యాజ్యం - దాఖలైన / ఉద్దేశపూర్వక ఎగవేతను ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ দায়ের করা মামলা / ইচ্ছাকৃত ডিফল্ট লিখুন",
    },
    Dispute_WrittenOffStatus: {
        en: "Please enter a valid Credit Facility Status",
        hi: "कृपया क्रेडिट सुविधा की मान्य स्थिति डालें",
        ta: "தயவுசெய்து ஒரு செல்லுபடியாகும் கடன் வசதி நிலையை உள்ளிடவும்",
        te: "దయచేసి చెల్లుబాటయ్యే క్రెడిట్ సౌలభ్యతా స్థితిని ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ ক্রেডিট ফেসিলিটির স্থিতি লিখুন",
    },
    Dispute_WrittebOffAmt: {
        en: "Please enter a valid Written-off Amount (Total)",
        hi: "कृपया वैध अपलिखित राशि (कुल) डालें",
        ta: "தயவுசெய்து சரியான தள்ளுபடி தொகையை (மொத்தம்) உள்ளிடவும்",
        te: "దయచేసి చెల్లే మాఫీ చేయబడిన మొత్తం (మొత్తం) ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ বাতিল করা রাশি (মোট) লিখুন",
    },
    Dispute_WOAmountLesser: {
        en: "Written-off Amount (Total) cannot be lesser than Written-off Amount (Principal)",
        hi: "अपलिखित राशि (कुल) अपलिखित राशि (मूलधन) से कम नहीं हो सकती है",
        ta: "தள்ளுபடி தொகை (மொத்தம்) தள்ளுபடி தொகையை (அசல்) விட குறைவாக இருக்க முடியாது",
        te: "మాఫీ చేయబడిన మొత్తం (మొత్తం), మాఫీ చేయబడిన మొత్తం (అసలు) కంటే తక్కువ ఉండకూడదు",
        be: "বাতিল করা রাশি (আসল) এর থেকে বাতিল করা রাশি (মোট) কম হতে পারবে না",
    },
    Dispute_WOAmtPrincipal: {
        en: "Please enter a valid Written-off Amount (Principal)",
        hi: "कृपया वैध अपलिखित राशि (मूलधन) डालें",
        ta: "தயவுசெய்து சரியான தள்ளுபடி தொகையை (அசல்) உள்ளிடவும்",
        te: "దయచేసి చెల్లే మాఫీ చేయబడిన మొత్తం (అసలు) ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ বাতিল করা রাশি (আসল) লিখুন",
    },
    Dispute_WOAmtGreater: {
        en: "Written-off Amount (Principal) cannot be greater than Written-off Amount (Total)",
        hi: "अपलिखित राशि (मूलधन) अपलिखित राशि (कुल) से अधिक नहीं हो सकती है",
        ta: "தள்ளுபடி தொகை (அசல்) தள்ளுபடி தொகையை (மொத்தம்) விட அதிகமாக இருக்க முடியாது",
        te: "మాఫీ చేయబడిన మొత్తం (అసలు), మాఫీ చేయబడిన మొత్తం (అసలు) కంటే ఎక్కువ ఉండకూడదు",
        be: "বাতিল করা রাশি (মোট) এর থেকে বাতিল করা রাশি (আসল) বেশি হতে পারবে না",
    },
    Dispute_SettlementAmt: {
        en: "Please enter a valid Settlement Amount",
        hi: "कृपया वैध निपटान की राशि दर्ज करें",
        ta: "தயவுசெய்து சரியான தீர்வுத் தொகையை உள்ளிடவும்",
        te: "దయచేసి చెల్లే సెటిల్మెంట్ మొత్తం ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ নিষ্পত্তির রাশি লিখুন",
    },
    Dispute_PaymentStatus: {
        en: "Please enter a valid Payment Status",
        hi: "कृपया वैध भुगतान स्थिति दर्ज करें",
        ta: "தயவுசெய்து சரியான கட்டண நிலையை உள்ளிடவும்",
        te: "దయచేసి చెల్లే చెల్లింపు స్థితి ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ অর্থপ্রদানের স্থিতি লিখুন",
    },
    Dispute_Frequency: {
        en: "Please enter a valid Frequency",
        hi: "कृपया वैध आवृत्ति दर्ज करें",
        ta: "தயவுசெய்து சரியான அடுக்கு நிகழ்வை உள்ளிடவும்",
        te: "దయచేసి చెల్లుబాటు అయ్యే ఫ్రీక్వెన్సీని నమోదు చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ পুনরাবৃত্তির হার লিখুন",
    },
    Dispute_State: {
        en: "State field is mandatory to raise dispute.",
        hi: "विवाद बढ़ाने के लिए राज्य क्षेत्र अनिवार्य है.",
        ta: "சர்ச்சையை எழுப்ப மாநிலப் புலம் கட்டாயமாகும்",
        te: "వివాదం సమర్పించడానికి రాష్ట్రాన్ని తప్పనిసరిగా నింపాలి",
        be: "বিরোধ উত্থাপন করতে রাজ্য ফিল্ডটি বাধ্যতামূলক।",
    },
    Dispute_StateValid: {
        en: "Please enter a valid State",
        hi: "कृपया एक मान्य स्थिति दर्ज करें",
        ta: "தயவுசெய்து செல்லுபடியாகும் மாநிலத்தை உள்ளிடவும்",
        te: "దయచేసి చెల్లే రాష్ట్రాన్ని ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ রাজ্যের নাম লিখুন",
    },
    Dispute_StateSBI: {
        en: "Please raise dispute against a field under SBI.",
        hi: "कृपया एसबीआई के तहत एक क्षेत्र के खिलाफ विवाद बढ़ाएं.",
        ta: "தயவுசெய்து எஸ்பிஐ கீழ் ஒரு புலனிற்கு எதிராக சர்ச்சையை எழுப்புங்கள்",
        te: "SBI క్రింద ఒక ప్రదేశంపై దయచేసి వివాదం సమర్పించండి",
        be: "অনুগ্রহ করে SBI এর অধীনে একটি ফিল্ডের বিরুদ্ধে বিরোধ উত্থাপন করুন।",
    },
    Dispute_DOB: {
        en: "Date of Birth should be 16 years prior to the oldest account Date Opened / Disbursed",
        hi: "सबसे पुरानी खाता खोलने की तिथि / संवितरित होने से पहले जन्म तिथि 16 वर्ष होनी चाहिए",
        ta: "பிறந்த தேதி பழைய  அக்கவுண்ட் திறக்கப்பட்ட/வழங்கப்பட்ட தேதிக்கு 16 ஆண்டுகளுக்கு முன்னதாக இருக்க வேண்டும்",
        te: "జన్మదినం తెరిచిన/పంపిణీ అయిన అత్యంత పాత ఖాతాకు కనీసం 16 సంవత్సరాల క్రితంది అయి ఉండాలి",
        be: "জন্মতারিখ সবচেয়ে পুরোনো অ্যাকাউন্ট খোলার / বিতরণের তারিখের 16 বছর আগের হতে হবে",
    },
    Dispute_EnquiryAmt: {
        en: "Please enter a valid Enquiry Amount",
        hi: "कृपया एक वैध पूछताछ राशि दर्ज करें",
        ta: "தயவுசெய்து செல்லுபடியாகும் விசாரணை தொகையை உள்ளிடவும்",
        te: "దయచేసి ఒక చెల్లే విచారణ మొత్తం ఎంటర్ చేయండి",
        be: "অনুগ্রহ করে একটি বৈধ অনুসন্ধানের রাশি লিখুন",
    },
    Dispute_Max9digits: {
        en: "This field should have maximum 9 digits",
        hi: "इस फ़ील्ड में अधिकतम 9 अंक होने चाहिए",
        ta: "இந்த புலத்தில் அதிகபட்சம் 9 இலக்குகள் இருக்க வேண்டும்",
        ta: "ఈ ప్రదేశంలో గరిష్టంగా 9 అంకెలు ఉండాలి",
        be: "এই ফিল্ডে সর্বাধিক 9টি অঙ্ক থাকতে পারবে",
    },
    Dispute_DisputeSubmit: { en: "Submit Dispute", hi: "विवाद सबमिट करें", ta: "சர்ச்சையைச் சமர்ப்பிக்கவும்", te: "వివాదం సమర్పించండిడ", be: "বিরোধিতা জমা দিন" },
    Dispute_DisputeReset: { en: "Reset All Fields", hi: "सभी फ़ील्ड रीसेट करें", ta: "அனைத்து புலங்களையும் மறுசீரமைக்கவும்", te: "అన్ని ప్రదేశాలను రీసెట్ చేయండి", be: "যাবতীয় ফিল্ড রিসেট করুন" },
    Dispute_DisputeBack: { en: "Back to Credit Report", hi: "क्रेडिट रिपोर्ट पर वापस जाएं", ta: "கடன் அறிக்கைக்குத் திரும்பவும்", te: "తిరిగి క్రెడిట్ రిపోర్ట్", be: "ক্রেডিট রিপোর্টে ফেরত যান" },
    debtoptions: { en: "options", hi: "विकल्प", ta: "விருப்பத்தேர்வுகள் ", te: "ఎంపికలు", be: "বিকল্পগুলি" },
    Lender: { en: "Lender", hi: "ऋणदाता", ta: "கடனளிப்பவர்", te: "ఋణదాత", be: "ঋণদাতা" },
    AccountNumber: { en: "Account Number", hi: "अकाउंट  नंबर", ta: "அக்கவுண்ட் எண்", te: "అకౌంట్ నెంబర్", be: "অ্যাকাউন্ট নম্বর" },
    Status: { en: "Status", hi: "स्थिति", ta: "நிலை", te: "స్థితి", be: "স্থিতি" },
    debtNegative: {
        en: "This negative status factor into your credit score. Settling this debt, could resolve this status.",
        hi: "यह नेगेटिव स्थिति आपके क्रेडिट स्कोर को प्रभावित करती है. इस ऋण का निपटान करने से इस स्थिति का समाधान हो सकता है.",
        ta: "உங்கள் கடன் மதிப்பெண்ணில் உள்ள இந்த எதிர்மறை நிலைக் காரணி, இந்தக் கடனைத் தீர்ப்பதால், இந்த நிலையைத் தீர்க்கும்.",
        te: "ఈ నెగటివ్ స్థితి మీ క్రెడిట్ స్కోర్‌పై ప్రభావం చూపుతుంది. ఈ ఋణాన్ని సెటిల్ చేసుకోవడంవల్ల, మీ స్థితిని పరిష్కరించవచ్చు.",
        be: "এই নেতিবাচক স্থিতি আপনার ক্রেডিট স্কোরের উপাদান হবে। এই ঋণটির নিষ্পত্তি করলে এই স্থিতির সমাধান হতে পারে।",
    },
    SettleDEBT: { en: "Settle THIS DEBT", hi: "इस ऋण का निपटान करें", ta: "இந்தக் கடனைத் தீர்க்கவும்", te: "ఈ డెట్‌ను సెటిల్ చేసుకోండి", be: "এই ঋণটির নিষ্পত্তি করুন" },
    scoreFactors_NameOfSimulator: { en: "CIBIL Score Version 1.0" },
    RBC_SupportHours: { en: "Monday through Friday, 8:30 a.m. - 5:00 p.m. ET" },
    creditReport_Changesinyourcreditdata: {
        en: "Changes in your credit data can have a positive or negative impact on your credit profile.  For example, an increase in balances may be considered either positive or negative depending on what else in your report has changed.",
    },
}),
void 0 !== reqpar["request-params"]["tl.language"] &&
    (("hi" != reqpar["request-params"]["tl.language"] && "hiIN" != reqpar["request-params"]["tl.language"]) || sessionStorage.setItem("userLangPref", "hi"),
        ("ta" != reqpar["request-params"]["tl.language"] && "taIN" != reqpar["request-params"]["tl.language"]) || sessionStorage.setItem("userLangPref", "ta"),
        ("te" != reqpar["request-params"]["tl.language"] && "teIN" != reqpar["request-params"]["tl.language"]) || sessionStorage.setItem("userLangPref", "te"),
        "be" == reqpar["request-params"]["tl.language"] || "beIN" == reqpar["request-params"]["tl.language"] ?
        sessionStorage.setItem("userLangPref", "be") :
        ("en" != reqpar["request-params"]["tl.language"] && "enUS" != reqpar["request-params"]["tl.language"]) || sessionStorage.setItem("userLangPref", "en")),
    Handlebars.registerHelper("localizedString", function(e, t) {
        var r = localizedString(e, t);
        return new Handlebars.SafeString(r);
    }),
    document.documentElement.setAttribute("data-useragent", navigator.userAgent),
    document.documentElement.setAttribute("data-platform", navigator.platform);
var today = new Date();
(Date.prototype.getJulian = function() {
    return Math.floor(this / 864e5 - this.getTimezoneOffset() / 1440 + 2440587.5);
}),
(Date.prototype.getDayOfYear = function() {
    var e = new Date(this.getFullYear(), 0, 0),
        t = this - e,
        r = 864e5;
    return Math.floor(t / r);
});
var msInOneYear = 31536e6,
    msInOneLeapYear = 316224e5,
    msInTwoYears = 63072e6,
    thisMonth = today.getMonth() + 1,
    thisYear = today.getFullYear(),
    thisDay = today.getDate(),
    isLeapYear = thisYear % 4 == 0;
var locale = locale || "en";
$("body").addClass("lang-" + locale);
var month = [
        {},
        { max: 31, abbr: "Jul", name: "Jul", abbr_hi: "जन" },
        { max: isLeapYear ? 29 : 28, abbr: "Aug", name: "Aug", abbr_hi: "फ़र" },
        { max: 31, abbr: "Sept", name: "01", abbr_hi: "मार्च" },
        { max: 30, abbr: "Oct", name: "Oct", abbr_hi: "अप्रैल" },
        { max: 31, abbr: "Nov", name: "Nov", abbr_hi: "मई" },
        { max: 30, abbr: "Dec", name: "Dec", abbr_hi: "जून" },
        { max: 31, abbr: "Jan", name: "Jan", abbr_hi: "जुलाई" },
        { max: 31, abbr: "Feb", name: "Feb", abbr_hi: "अगस्त" },
        { max: 30, abbr: "Mar", name: "Mar", abbr_hi: "सितं" },
        { max: 31, abbr: "Apr", name: "Apr", abbr_hi: "अक्टू" },
        { max: 30, abbr: "May", name: "May", abbr_hi: "नवं" },
        { max: 31, abbr: "June", name: "June", abbr_hi: "दिसं" },
    ],
    pinCodeValidator = {
        "01": { startCode: 18, endCode: 19 },
        "02": { startCode: 17, endCode: 17 },
        "03": { startCode: 14, endCode: 16 },
        "04": { startCode: 14, endCode: 16 },
        "05": { startCode: 24, endCode: 26 },
        "06": { startCode: 12, endCode: 13 },
        "07": { startCode: 11, endCode: 11 },
        "08": { startCode: 30, endCode: 34 },
        "09": { startCode: 20, endCode: 28 },
        10: { startCode: 80, endCode: 85 },
        11: { startCode: 73, endCode: 73 },
        12: { startCode: 78, endCode: 79 },
        13: { startCode: 78, endCode: 79 },
        14: { startCode: 78, endCode: 79 },
        15: { startCode: 78, endCode: 79 },
        16: { startCode: 72, endCode: 79 },
        17: { startCode: 79, endCode: 79 },
        18: { startCode: 78, endCode: 79 },
        19: { startCode: 70, endCode: 74 },
        20: { startCode: 81, endCode: 83 },
        21: { startCode: 75, endCode: 77 },
        22: { startCode: 46, endCode: 49 },
        23: { startCode: 45, endCode: 48 },
        24: { startCode: 36, endCode: 39 },
        26: { startCode: 36, endCode: 39 },
        27: { startCode: 40, endCode: 44 },
        28: { startCode: 50, endCode: 56 },
        29: { startCode: 53, endCode: 59 },
        30: { startCode: 40, endCode: 40 },
        31: { startCode: 67, endCode: 68 },
        32: { startCode: 67, endCode: 69 },
        33: { startCode: 53, endCode: 66 },
        34: { startCode: 53, endCode: 67 },
        35: { startCode: 74, endCode: 74 },
        36: { startCode: 50, endCode: 56 },
        38: { startCode: 18, endCode: 19 },
        99: { startCode: 90, endCode: 99 },
    };
var CCVD = {
        queryString: function() {
            var e = {};
            if (window.location.search.length > 1)
                for (var t, r = 0, n = window.location.search.substr(1).split("&"); r < n.length; r++)(t = n[r].split("=")), (e[unescape(t[0])] = t.length > 1 ? unescape(t[1]) : "");
            return e;
        },
        rules: {
            "tl.username": {
                regex: new RegExp(/^[a-zA-Z0-9\-\\_\\@\\*\\.]{5,64}$/),
                required: "Please enter a username.",
                password: "Your username cannot contain your password.",
                format: 'Please try again using only numbers, letters or one of the following characters: underscore (_), dash (-), "at" sign (@), period (.), and asterisk (*)',
                minlength: "Your username must be at least 5 characters.",
                required_hi: "कृपया उपयोगकर्ता नाम डालें.",
                password_hi: " आपके उपयोगकर्ता नाम में आपका पासवर्ड शामिल नहीं हो सकता है.",
                format_hi: 'कृपया सिर्फ़ अंकों, अक्षरों या इनमें से किसी वर्ण, का उपयोग करके दोबारा कोशिश करें: अंडरस्कोर (_), डैश (-), "एट" प्रतीक (@), पीरियड (.), और सितारा(*)',
                minlength_hi: "आपका उपयोगकर्ता नाम कम से कम 5 वर्णों का ज़रूर होना चाहिये.",
                required_ta: "தயவுசெய்து ஒரு யூசர்நேம்மை உள்ளிடுங்கள்.",
                password_ta: "உங்கள் யூசர்நேம்மில் உங்கள் பாஸ்வேர்ட் இருக்கக்கூடாது.",
                format_ta: 'எண்கள், எழுத்துக்கள் அல்லது பின்வரும் எழுத்துக்களில் ஒன்றை மட்டும் பயன்படுத்தி மீண்டும் முயற்சிக்கவும்: அண்டர்ஸ்கோர் (_), டேஷ் (-), "அட்" சைன் (@), பீரியட் (.) மற்றும் நட்சத்திரக் குறியீடு (*)',
                minlength_ta: "உங்கள் யூசர்நேம் குறைந்தது 5 எழுத்துக்களாக இருக்க வேண்டும்.",
                required_te: "దయచేసి ఒక యూజర్నేమ్ ఎంటర్ చేయండి.",
                password_te: "మీ యూజర్నేమ్లో పాస్వర్డ్ ఉండరాదు.",
                format_te: 'దయచేసి కేవలం అంకెలు, అక్షరాలు లేదా కింద ఇవ్వబడిన సంజ్ఞలను ఉపయోగించండి: అండర్స్కోర్ (_), డాష్ (-), "ఎట్" గుర్తు (@), పీరియడ్ (.) మరియు ఆస్టెరిక్ (*).',
                minlength_te: "మీ యూజర్నేమ్ కనీసం 5 అక్షరాలు కలిగివుండాలి.",
                required_be: "অনুগ্রহ করে একটি ইউজারনেম লিখুন।",
                password_be: "আপনার ইউজারনেমের মধ্যে আপনার পাসওয়ার্ড থাকতে পারবে না।",
                format_be: "অনুগ্রহ করে কেবলমাত্র সংখ্যা, অক্ষর বা নিম্নলিখিত ক্যারেক্টারগুলির একটি ব্যবহার করে চেষ্টা করুন: আন্ডারস্কোর (_), ড্যাশ (-), 'অ্যাট' চিহ্ন (@), পিরিয়ড (.), ও তারকাচিহ্ন (*)",
                minlength_be: "আপনার ইউজারনেম অন্তত 5টি ক্যারেক্টারের হওয়া আবশ্যক।",
            },
            "tl.email-address": {
                regex: new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?){5,64}$/),
                required: "Please enter your email address.",
                format: "The email address you have entered is invalid. Please try again.",
                required_hi: "कृपया अपना ईमेल पता दर्ज करें.",
                format_hi: "आपके द्वारा दर्ज किया गया ईमेल पता अमान्य है. कृपया दोबारा कोशिश करें.",
                required_ta: "தயவுசெய்து உங்கள் ஈமெயில் முகவரியை உள்ளிடுங்கள்.",
                format_ta: "நீங்கள் உள்ளிட்ட மின்னஞ்சல் முகவரி தவறானது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                required_te: "దయచేసి మీ ఇ-మెయిల్ చిరునామా ఎంటర్ చేయండి",
                format_te: "మీరు ఎంటర్ చేసిన ఇ-మెయిల్ చిరునామా చెల్లదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে একটি ইমেল অ্যাড্রেস লিখুন।",
                format_be: "আপনার লেখা এই ইমেল অ্যাড্রেসটি অবৈধ। অনুগ্রহ করে আবার চেষ্টা করুন",
            },
            "tl.dbEmailAU": {
                regex: new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?){5,64}$/),
                required: "Please enter your email address.",
                format: "The email address you have entered is invalid. Please try again.",
                required_hi: "कृपया अपना ईमेल पता दर्ज करें.",
                format_hi: "आपके द्वारा दर्ज किया गया ईमेल पता अमान्य है. कृपया दोबारा कोशिश करें.",
                required_ta: "தயவுசெய்து உங்கள் ஈமெயில் முகவரியை உள்ளிடுங்கள்.",
                format_ta: "நீங்கள் உள்ளிட்ட மின்னஞ்சல் முகவரி தவறானது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                required_te: "దయచేసి మీ ఇ-మెయిల్ చిరునామా ఎంటర్ చేయండి",
                format_te: "మీరు ఎంటర్ చేసిన ఇ-మెయిల్ చిరునామా చెల్లదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে একটি ইমেল অ্যাড্রেস লিখুন।",
                format_be: "আপনার লেখা এই ইমেল অ্যাড্রেসটি অবৈধ। অনুগ্রহ করে আবার চেষ্টা করুন",
            },
            "tl.login-password": {
                regex: "",
                required: "Please enter a password.",
                format: "Please enter 8-15 characters using at least 3 of the following: uppercase alphabetical character, lowercase alphabetical character, numeric character, special character. Spaces are not allowed.",
                username: "Your password cannot contain your username.",
                minlength: "Password must be at least 8 characters.",
                maxlength: "Oops, your password must be 15 characters or less.",
                required_hi: "कृपया कोई पासवर्ड डालें.",
                format_hi: "कृपया आगे दिए गए कम से कम 3 का उपयोग करके 8-15 वर्ण डालें: बड़े वर्णाक्षर, छोटे वर्णाक्षर, सांख्यिक वर्ण, विशिष्ट वर्ण. रिक्तियों की अनुमति नहीं है.",
                username_hi: "आपके पासवर्ड में आपका उपयोगकर्ता नाम शामिल नहीं हो सकता है.",
                minlength_hi: "पासवर्ड कम से कम 8 अक्षर का अवश्य होना चाहिये.",
                maxlength_hi: "ओह, आपके पासवर्ड में कम से कम 15 वर्ण या उससे कम होने चाहिए.",
                required_ta: "தயவுசெய்து ஒரு பாஸ்வேர்டை உள்ளிடுங்கள்.",
                format_ta: "பின்வருபவற்றில் குறைந்தது 3-ஐ பயன்படுத்தி 8- 15 எழுத்துக்களை உள்ளிடவும்: பெரிய எழுத்துக்கள், சிறிய எழுத்துக்கள், எண் எழுத்துக்கள், சிறப்பு எழுத்துக்கள். இடைவெளிகள் அனுமதிக்கப்படாது.",
                username_ta: "உங்கள் பாஸ்வேர்டில் உங்கள் யூசர்நேம் இருக்கக்கூடாது.",
                minlength_ta: "பாஸ்வேர்டில் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.",
                maxlength_ta: "அடடா, உங்கள் பாஸ்வேர்டில் 15 எழுத்துக்கள் அல்லது அதற்கும் குறைவாக இருக்க வேண்டும்.",
                required_te: "దయచేసి పాస్వర్డ్ ఎంటర్ చేయండి.",
                format_te: "కిందతెలిపిన వాటిలో కనీసం 3 ఉపయోగించి, 8-15 అక్షరాలను ఎంటర్ చేయండి: అక్షరాల అప్పర్కేస్, అక్షరాల లోయర్కేస్, అంకె, ప్రత్యేక చిహ్నం. అక్షరాల మధ్యలో స్పేస్ అనుమతించబడదు.",
                username_te: "మీ పాస్వర్డ్లో యూజర్నేమ్ ఉండరాదు.",
                minlength_te: "పాస్వర్డ్లో కనీసం 8 అక్షరాలు ఉండాలి.",
                maxlength_te: "అయ్యో, మీ పాస్వర్డ్ కనీసం 15 అక్షరాలు లేదా అంతకంటే తక్కువ ఉండాలి.",
                required_be: "অনুগ্রহ করে একটি পাসওয়ার্ড দিন",
                format_be: "অনুগ্রহ করে নিম্নলিখিতগুলি অন্তত 3 বার করে ব্যবহার করে 8টি থেকে 15টি ক্যারেক্টার লিখুন: বর্ণমালার বড়হাতের ক্যারেক্টার, বর্ণমালার ছোটহাতের ক্যারেক্টার, সংখ্যা ক্যারেক্টার, স্পেশাল ক্যারেক্টার। ফাঁক দেওয়ার অনুমতি নেই।",
                username_be: "আপনার পাসওয়ার্ডে আপনার ইউজারনেম থাকতে পারবে না।",
                minlength_be: "পাসওয়ার্ড অন্ততঃ 8 ক্যারেক্টারের হওয়া আবশ্যক",
                maxlength_be: "এই যাঃ, আপনার পাসওয়ার্ড 15 বা তার কম ক্যারেক্টারের হওয়া আবশ্যক",
            },
            "tl.webPassword": {
                regex: "",
                required: "Please enter a password.",
                format: "Please enter 8-15 characters using at least 3 of the following: uppercase alphabetical character, lowercase alphabetical character, numeric character, special character. Spaces are not allowed.",
                username: "Your password cannot contain your username.",
                minlength: "Password must be at least 8 characters.",
                maxlength: "Oops, your password must be 15 characters or less.",
                required_ta: "தயவுசெய்து ஒரு பாஸ்வேர்டை உள்ளிடுங்கள்.",
                format_ta: "பின்வருபவற்றில் குறைந்தது 3-ஐ பயன்படுத்தி 8- 15 எழுத்துக்களை உள்ளிடவும்: பெரிய எழுத்துக்கள், சிறிய எழுத்துக்கள், எண் எழுத்துக்கள், சிறப்பு எழுத்துக்கள். இடைவெளிகள் அனுமதிக்கப்படாது.",
                username_ta: "உங்கள் பாஸ்வேர்டில் உங்கள் யூசர்நேம் இருக்கக்கூடாது.",
                minlength_ta: "பாஸ்வேர்டில் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.",
                maxlength_ta: "அடடா, உங்கள் பாஸ்வேர்டில் 15 எழுத்துக்கள் அல்லது அதற்கும் குறைவாக இருக்க வேண்டும்.",
                required_be: "অনুগ্রহ করে একটি পাসওয়ার্ড দিন।",
                format_be: "অনুগ্রহ করে নিম্নলিখিতগুলি অন্তত 3 বার করে ব্যবহার করে 8টি থেকে 15টি ক্যারেক্টার লিখুন: বর্ণমালার বড়হাতের ক্যারেক্টার, বর্ণমালার ছোটহাতের ক্যারেক্টার, সংখ্যা ক্যারেক্টার, স্পেশাল ক্যারেক্টার। ফাঁক দেওয়ার অনুমতি নেই।",
                username_be: "আপনার পাসওয়ার্ডে আপনার ইউজারনেম থাকতে পারবে না।",
                minlength_be: "পাসওয়ার্ড অন্ততঃ 8 ক্যারেক্টারের হওয়া আবশ্যক।",
                maxlength_be: "এই যাঃ, আপনার পাসওয়ার্ড 15 বা তার কম ক্যারেক্টারের হওয়া আবশ্যক।",
            },
            "tl.password": {
                regex: new RegExp(/^(?!.*[\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,15}$/),
                required: "Please enter a password.",
                format: "Please enter 8-15 characters using at least one of each of the following: uppercase alphabetical character, lowercase alphabetical character, numeric character, special character. Spaces are not allowed.",
                username: "Your password cannot contain your username.",
                minlength: "Password must be at least 8 characters.",
                maxlength: "Oops, your password must be 15 characters or less.",
                invalidCurrPass: "Current password entered cannot be verified. Please try again",
                required_hi: "कृपया कोई पासवर्ड डालें.",
                format_hi: "कृपया निम्न में से प्रत्येक के कम से कम एक का उपयोग करके 8-15 वर्ण दर्ज करें: अपरकेस वर्णमाला वर्ण, वर्णमाला वर्ण, संख्यात्मक वर्ण, विशेष वर्ण कम करें। रिक्त स्थान की अनुमति नहीं है",
                username_hi: "आपके पासवर्ड में आपका उपयोगकर्ता नाम शामिल नहीं हो सकता है.",
                minlength_hi: "पासवर्ड कम से कम 8 अक्षर का अवश्य होना चाहिये.",
                maxlength_hi: "ओह, आपके पासवर्ड में कम से कम 15 वर्ण या उससे कम होने चाहिए.",
                invalidCurrPass_hi: " डाला गया मौजूदा पासवर्ड स सत्यापित नहीं किया जा सकता है. कृपया दोबारा कोशिश करें",
                required_ta: "தயவுசெய்து ஒரு பாஸ்வேர்டை உள்ளிடுங்கள்.",
                format_ta: "பின்வருபவற்றில் குறைந்தது 3-ஐ பயன்படுத்தி 8- 15 எழுத்துக்களை உள்ளிடவும்: பெரிய எழுத்துக்கள், சிறிய எழுத்துக்கள், எண் எழுத்துக்கள், சிறப்பு எழுத்துக்கள். இடைவெளிகள் அனுமதிக்கப்படாது.",
                username_ta: "உங்கள் பாஸ்வேர்டில் உங்கள் யூசர்நேம் இருக்கக்கூடாது.",
                minlength_ta: "பாஸ்வேர்டில் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.",
                maxlength_ta: "அடடா, உங்கள் பாஸ்வேர்டில் 15 எழுத்துக்கள் அல்லது அதற்கும் குறைவாக இருக்க வேண்டும்.",
                invalidCurrPass_ta: "உள்ளிடப்பட்ட தற்போதைய பாஸ்வேர்டை சரிபார்க்க முடியாது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்",
                required_te: "దయచేసి పాస్వర్డ్ ఎంటర్ చేయండి.",
                format_te: "కిందతెలిపిన వాటిలో కనీసం 3 ఉపయోగించి, 8-15 అక్షరాలను ఎంటర్ చేయండి: అక్షరాల అప్పర్కేస్, అక్షరాల లోయర్కేస్, అంకె, ప్రత్యేక చిహ్నం. అక్షరాల మధ్యలో స్పేస్ అనుమతించబడదు.",
                username_te: "మీ పాస్వర్డ్లో యూజర్నేమ్ ఉండరాదు.",
                minlength_te: "పాస్వర్డ్లో కనీసం 8 అక్షరాలు ఉండాలి.",
                maxlength_te: "అయ్యో, మీ పాస్వర్డ్ కనీసం 15 అక్షరాలు లేదా అంతకంటే తక్కువ ఉండాలి.",
                invalidCurrPass_te: "ప్రస్తుతం ఎంటర్ చేసిన పాస్వర్డ్ వెరిఫై చేయబడలేదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে একটি পাসওয়ার্ড দিন।",
                format_be: "অনুগ্রহ করে নিম্নলিখিতগুলির প্রতিটি অন্তত একবার করে ব্যবহার করে 8টি থেকে 15টি ক্যারেক্টার লিখুন: বর্ণমালার বড়হাতের ক্যারেক্টার, বর্ণমালার ছোটহাতের ক্যারেক্টার, সংখ্যা ক্যারেক্টার, স্পেশাল ক্যারেক্টার। ফাঁক দেওয়ার অনুমতি নেই।",
                username_be: "আপনার পাসওয়ার্ডে আপনার ইউজারনেম থাকতে পারবে না।",
                minlength_be: "পাসওয়ার্ড অন্ততঃ 8 ক্যারেক্টারের হওয়া আবশ্যক।",
                maxlength_be: "এই যাঃ, আপনার পাসওয়ার্ড 15 বা তার কম ক্যারেক্টারের হওয়া আবশ্যক।",
                invalidCurrPass_be: "বর্তমানে লেখা পাসওয়ার্ড যাচাই করা যাবে না। অনুগ্রহ করে আবার চেষ্টা করুন",
            },
            "tl.tempPassword": {
                regex: new RegExp(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])|(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[A-Z])|(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*[a-z]))(?=^(?:(?!\s).)*$).{8,15}$/),
                required: "Please enter a password.",
                format: "Please enter 8-15 characters using at least 3 of the following: uppercase alphabetical character, lowercase alphabetical character, numeric character, special character. Spaces are not allowed.",
                username: "Your password cannot contain your username.",
                minlength: "Password must be at least 8 characters.",
                maxlength: "Oops, your password must be 15 characters or less.",
                invalidCurrPass: "Current password entered cannot be verified. Please try again",
                required_hi: "कृपया कोई पासवर्ड डालें.",
                format_hi: "कृपया आगे दिए गए कम से कम 3 का उपयोग करके 8-15 वर्ण डालें: बड़े वर्णाक्षर, छोटे वर्णाक्षर, सांख्यिक वर्ण, विशिष्ट वर्ण. रिक्तियों की अनुमति नहीं है.",
                username_hi: "आपके पासवर्ड में आपका उपयोगकर्ता नाम शामिल नहीं हो सकता है.",
                minlength_hi: "पासवर्ड कम से कम 8 अक्षर का अवश्य होना चाहिये.",
                maxlength_hi: "ओह, आपके पासवर्ड में कम से कम 15 वर्ण या उससे कम होने चाहिए.",
                invalidCurrPass_hi: " डाला गया मौजूदा पासवर्ड स सत्यापित नहीं किया जा सकता है. कृपया दोबारा कोशिश करें",
                required_ta: "தயவுசெய்து ஒரு பாஸ்வேர்டை உள்ளிடுங்கள்.",
                format_ta: "பின்வருபவற்றில் குறைந்தது 3-ஐ பயன்படுத்தி 8- 15 எழுத்துக்களை உள்ளிடவும்: பெரிய எழுத்துக்கள், சிறிய எழுத்துக்கள், எண் எழுத்துக்கள், சிறப்பு எழுத்துக்கள். இடைவெளிகள் அனுமதிக்கப்படாது.",
                username_ta: "உங்கள் பாஸ்வேர்டில் உங்கள் யூசர்நேம் இருக்கக்கூடாது.",
                minlength_ta: "பாஸ்வேர்டில் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.",
                maxlength_ta: "அடடா, உங்கள் பாஸ்வேர்டில் 15 எழுத்துக்கள் அல்லது அதற்கும் குறைவாக இருக்க வேண்டும்.",
                invalidCurrPass_ta: "உள்ளிடப்பட்ட தற்போதைய பாஸ்வேர்டை சரிபார்க்க முடியாது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்",
                required_te: "దయచేసి పాస్వర్డ్ ఎంటర్ చేయండి.",
                format_te: "కిందతెలిపిన వాటిలో కనీసం 3 ఉపయోగించి, 8-15 అక్షరాలను ఎంటర్ చేయండి: అక్షరాల అప్పర్కేస్, అక్షరాల లోయర్కేస్, అంకె, ప్రత్యేక చిహ్నం. అక్షరాల మధ్యలో స్పేస్ అనుమతించబడదు.",
                username_te: "మీ పాస్వర్డ్లో యూజర్నేమ్ ఉండరాదు.",
                minlength_te: "పాస్వర్డ్లో కనీసం 8 అక్షరాలు ఉండాలి.",
                maxlength_te: "అయ్యో, మీ పాస్వర్డ్ కనీసం 15 అక్షరాలు లేదా అంతకంటే తక్కువ ఉండాలి.",
                invalidCurrPass_te: "ప్రస్తుతం ఎంటర్ చేసిన పాస్వర్డ్ వెరిఫై చేయబడలేదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে একটি পাসওয়ার্ড দিন।",
                format_be: "অনুগ্রহ করে নিম্নলিখিতগুলি অন্তত 3 বার করে ব্যবহার করে 8টি থেকে 15টি ক্যারেক্টার লিখুন: বর্ণমালার বড়হাতের ক্যারেক্টার, বর্ণমালার ছোটহাতের ক্যারেক্টার, সংখ্যা ক্যারেক্টার, স্পেশাল ক্যারেক্টার। ফাঁক দেওয়ার অনুমতি নেই।",
                username_be: "আপনার পাসওয়ার্ডে আপনার ইউজারনেম থাকতে পারবে না।",
                minlength_be: "পাসওয়ার্ড অন্ততঃ 8 ক্যারেক্টারের হওয়া আবশ্যক।",
                maxlength_be: "এই যাঃ, আপনার পাসওয়ার্ড 15 বা তার কম ক্যারেক্টারের হওয়া আবশ্যক।",
                invalidCurrPass_be: "বর্তমানে লেখা পাসওয়ার্ড যাচাই করা যাবে না। অনুগ্রহ করে আবার চেষ্টা করুন",
            },
            "tl.first-name": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s'-]{1,26}$/),
                required: "Please enter your first name.",
                format: "First name can contain only Letters, and Spaces.",
                minlength: "Your first name must be a minimum 1 character.",
                duplicate: "Names cannot be duplicated within or between the first, middle and/or last name fields.",
                required_hi: "कृपया अपना प्रथम नाम डालें.",
                format_hi: "प्रथम नाम में सिर्फ़ अक्षर, रिक्तियां, एपॉस्ट्रॉफ़ और हाइफ़न शामिल हो सकते हैं.",
                minlength_hi: "आपका प्रथम नाम कम से कम 1 वर्ण का ज़रूर होना चाहिये.",
                duplicate_hi: "नामों को पहले, मध्य और/या अंतिम नाम के फ़ील्ड में डुप्लिकेट नहीं किया जा सकता है.",
                required_ta: "தயவுசெய்து உங்கள் முதல் பெயரை உள்ளிடுங்கள்.",
                format_ta: "முதல் பெயரில் எழுத்துக்கள், இடைவெளிகள், அப்போஸ்ட்ரோப்கள் மற்றும் ஹைபன்கள் மட்டுமே இருக்க முடியும்.",
                minlength_ta: "உங்கள் முதல் பெயர் குறைந்தபட்சம் 1 எழுத்தாக இருக்க வேண்டும்.",
                duplicate_ta: "பெயர்களை முதல், நடு மற்றும்/அல்லது கடைசி பெயர் புலங்களுக்குள் அல்லது இடையில் நகலாக்க முடியாது.",
                required_te: "దయచేసి మీ మొదటిపేరు ఎంటర్ చేయండి.",
                format_te: "మొదటిపేరులో కేవలం అక్షరాలు, స్పేస్లు, అపోస్ట్రోఫ్స్, మరియు హైఫన్లు ఉండవచ్చు.",
                minlength_te: "మీ మొదటిపేరులో కనీసం 1 అక్షరమైనా ఉండాలి.",
                duplicate_te: "మొదటి, మధ్య, మరియు/లేదా చివరి పేర్లలోని ఫీల్డ్లమధ్య డూప్లికేట్ చేయబడరాదు.",
                required_be: "অনুগ্রহ করে আপনার প্রথম নাম লিখুন।",
                format_be: "প্রথম নামে কেবল অক্ষর ও ফাঁক থাকতে পারবে। ",
                minlength_be: "আপনার প্রথম নাম অন্তত 1 ক্যারেক্টারের হওয়া আবশ্যক।",
                duplicate_be: "নামগুলি প্রথম, মাঝের এবং/অথবা পদবির ফিল্ডগুলিতে বা তাদের মাঝে নকল করা যাবে না।",
            },
            "tl.dbFNameAU": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s'-]{1,26}$/),
                required: "Please enter your first name.",
                format: "First name can contain only Letters, and Spaces.",
                minlength: "Your first name must be a minimum 1 character.",
                duplicate: "Names cannot be duplicated within or between the first, middle and/or last name fields.",
                required_hi: "कृपया अपना प्रथम नाम डालें.",
                format_hi: "प्रथम नाम में सिर्फ़ अक्षर, रिक्तियां, एपॉस्ट्रॉफ़ और हाइफ़न शामिल हो सकते हैं.",
                minlength_hi: "आपका प्रथम नाम कम से कम 1 वर्ण का ज़रूर होना चाहिये.",
                duplicate_hi: "नामों को पहले, मध्य और/या अंतिम नाम के फ़ील्ड में डुप्लिकेट नहीं किया जा सकता है.",
                required_ta: "தயவுசெய்து உங்கள் முதல் பெயரை உள்ளிடுங்கள்.",
                format_ta: "முதல் பெயரில் எழுத்துக்கள், இடைவெளிகள், அப்போஸ்ட்ரோப்கள் மற்றும் ஹைபன்கள் மட்டுமே இருக்க முடியும்.",
                minlength_ta: "உங்கள் முதல் பெயர் குறைந்தபட்சம் 1 எழுத்தாக இருக்க வேண்டும்.",
                duplicate_ta: "பெயர்களை முதல், நடு மற்றும்/அல்லது கடைசி பெயர் புலங்களுக்குள் அல்லது இடையில் நகலாக்க முடியாது.",
                required_te: "దయచేసి మీ మొదటిపేరు ఎంటర్ చేయండి.",
                format_te: "మొదటిపేరులో కేవలం అక్షరాలు, స్పేస్లు, అపోస్ట్రోఫ్స్, మరియు హైఫన్లు ఉండవచ్చు.",
                minlength_te: "మీ మొదటిపేరులో కనీసం 1 అక్షరమైనా ఉండాలి.",
                duplicate_te: "మొదటి, మధ్య, మరియు/లేదా చివరి పేర్లలోని ఫీల్డ్లమధ్య డూప్లికేట్ చేయబడరాదు.",
                required_be: "অনুগ্রহ করে আপনার প্রথম নাম লিখুন।",
                format_be: "প্রথম নামে কেবল অক্ষর ও ফাঁক থাকতে পারবে। ",
                minlength_be: "আপনার প্রথম নাম অন্তত 1 ক্যারেক্টারের হওয়া আবশ্যক।",
                duplicate_be: "নামগুলি প্রথম, মাঝের এবং/অথবা পদবির ফিল্ডগুলিতে বা তাদের মাঝে নকল করা যাবে না।",
            },
            "tl.middle-name": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s]{1,26}$/),
                required: "",
                duplicate: "Names cannot be duplicated within or between the first, middle and/or last name fields.",
                format: "Middle name can contain only Letters, and Spaces.",
                duplicate_ta: "பெயர்களை முதல், நடு மற்றும்/அல்லது கடைசி பெயர் புலங்களுக்குள் அல்லது இடையில் நகலாக்க முடியாது.",
                format_ta: "நடு பெயரில் எழுத்துக்கள், இடைவெளிகள், அப்போஸ்ட்ரோப்கள் மற்றும் ஹைபன்கள் மட்டுமே இருக்க முடியும்.",
                duplicate_te: "మొదటి, మధ్య, మరియు/లేదా చివరి పేర్లలోని ఫీల్డ్లమధ్య డూప్లికేట్ చేయబడరాదు.",
                format_te: "మధ్యపేరులో కేవలం అక్షరాలు, స్పేస్లు, అపోస్ట్రోఫ్స్, మరియు హైఫన్లు ఉండవచ్చు.",
                duplicate_be: "নামগুলি প্রথম, মাঝের এবং/অথবা পদবির ফিল্ডগুলিতে বা তাদের মাঝে নকল করা যাবে না।",
                format_be: "মাঝের নামে কেবল অক্ষর ও ফাঁক থাকতে পারবে। ",
            },
            "tl.last-name": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s'-]{1,26}$/),
                required: "Please enter your last name.",
                duplicate: "Names cannot be duplicated within or between the first, middle and/or last name fields.",
                format: "Last name can contain only Letters, and Spaces.",
                required_hi: "कृपया अपना अंतिम नाम डालें.",
                duplicate_hi: "नामों को पहले, मध्य और/या अंतिम नाम के फ़ील्ड में डुप्लिकेट नहीं किया जा सकता है. ",
                format_hi: "अंतिम नाम में सिर्फ़ अक्षर, रिक्तियां, एपॉस्ट्रॉफ़ और हाइफ़न शामिल हो सकते हैं.",
                required_ta: "தயவுசெய்து உங்கள் கடைசி பெயரை உள்ளிடுங்கள்.",
                duplicate_ta: "பெயர்களை முதல், நடு மற்றும்/அல்லது கடைசி பெயர் புலங்களுக்குள் அல்லது இடையில் நகலாக்க முடியாது. ",
                format_ta: "கடைசி பெயரில் எழுத்துக்கள், இடைவெளிகள், அப்போஸ்ட்ரோப்கள் மற்றும் ஹைபன்கள் மட்டுமே இருக்க முடியும்.",
                required_te: "దయచేసి మీ చివరిపేరు ఎంటర్ చేయండి.",
                duplicate_te: "మొదటి, మధ్య, మరియు/లేదా చివరి పేర్లలోని ఫీల్డ్లమధ్య డూప్లికేట్ చేయబడరాదు. ",
                format_te: "చివరిపేరులో కేవలం అక్షరాలు, స్పేస్లు, అపోస్ట్రోఫ్స్, మరియు హైఫన్లు ఉండవచ్చు.",
                required_be: "অনুগ্রহ করে আপনার পদবি লিখুন।",
                duplicate_be: "নামগুলি প্রথম, মাঝের এবং/অথবা পদবির ফিল্ডগুলিতে বা তাদের মাঝে নকল করা যাবে না",
                format_be: "পদবিতে কেবল অক্ষর ও ফাঁক থাকতে পারবে।",
            },
            "tl.dbLNameAU": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s'-]{1,26}$/),
                required: "Please enter your last name.",
                duplicate: "Names cannot be duplicated within or between the first, middle and/or last name fields.",
                format: "Last name can contain only Letters, and Spaces.",
                required_hi: "कृपया अपना अंतिम नाम डालें.",
                duplicate_hi: "नामों को पहले, मध्य और/या अंतिम नाम के फ़ील्ड में डुप्लिकेट नहीं किया जा सकता है. ",
                format_hi: "अंतिम नाम में सिर्फ़ अक्षर, रिक्तियां, एपॉस्ट्रॉफ़ और हाइफ़न शामिल हो सकते हैं.",
                required_ta: "தயவுசெய்து உங்கள் கடைசி பெயரை உள்ளிடுங்கள்.",
                duplicate_ta: "பெயர்களை முதல், நடு மற்றும்/அல்லது கடைசி பெயர் புலங்களுக்குள் அல்லது இடையில் நகலாக்க முடியாது. ",
                format_ta: "கடைசி பெயரில் எழுத்துக்கள், இடைவெளிகள், அப்போஸ்ட்ரோப்கள் மற்றும் ஹைபன்கள் மட்டுமே இருக்க முடியும்.",
                required_te: "దయచేసి మీ చివరిపేరు ఎంటర్ చేయండి.",
                duplicate_te: "మొదటి, మధ్య, మరియు/లేదా చివరి పేర్లలోని ఫీల్డ్లమధ్య డూప్లికేట్ చేయబడరాదు. ",
                format_te: "చివరిపేరులో కేవలం అక్షరాలు, స్పేస్లు, అపోస్ట్రోఫ్స్, మరియు హైఫన్లు ఉండవచ్చు.",
                required_be: "অনুগ্রহ করে আপনার পদবি লিখুন।",
                duplicate_be: "নামগুলি প্রথম, মাঝের এবং/অথবা পদবির ফিল্ডগুলিতে বা তাদের মাঝে নকল করা যাবে না",
                format_be: "পদবিতে কেবল অক্ষর ও ফাঁক থাকতে পারবে।",
            },
            "tl.secret-question": {
                regex: new RegExp(/^(SchoolMascot|TeacherLastName|FirstCar|MotherMiddleName|FatherMiddleName|BirthCity|GrandmotherFirstName|GrandfatherFirstName)$/),
                required: "Oops, it looks like you need to select your secret question.",
                format: "Oops, you tried to provide an invalid secret question.",
            },
            "tl.secret-answer": {
                regex: new RegExp(/^[a-zA-Z0-9]+$/),
                required: "Oops, it looks like you need to enter your secret answer.",
                format: "Oops, sorry we can only accept letters and numbers for your secret answer. Please re-enter.",
                password: "Sorry, but your answer cannot contain your password.",
            },
            "tl.phoneNumber": {
                regex: new RegExp(/^(?!9876543210)(?!([\d])\1{5,9})[6-9][\d]{9}$/),
                required: "Please enter your telephone number.",
                format: "The telephone number you have entered is not valid. Please try again.",
                minlength: "Please enter a valid mobile telephone number.",
                required_hi: "कृपया अपना टेलीफ़ोन नंबर डालें.",
                format_hi: "आपके द्वारा दर्ज किया गया टेलीफ़ोन नंबर मान्य नहीं है. कृपया दोबारा कोशिश करें.",
                minlength_hi: "कृपया कोई मान्य टेलीफ़ोन नंबर दर्ज करें.",
                required_ta: "தயவுசெய்து உங்கள் தொலைபேசி எண்ணை உள்ளிடுங்கள்.",
                format_ta: "நீங்கள் உள்ளிட்ட தொலைபேசி எண் செல்லுபடியாகாது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                minlength_ta: "தயவுசெய்து செல்லுபடியாகும் மொபைல் எண்ணை உள்ளிடுங்கள்.",
                required_te: "దయచేసి మీ టెలిఫోన్ నెంబర్ ఎంటర్ చేయండి.",
                format_te: "మీరు ఎంటర్ చేసిన టెలిఫోన్ నెంబర్ చెల్లదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                minlength_te: "దయచేసి చెల్లుబాటు అయ్యే ఒక మొబైల్ టెలిఫోన్ నెంబర్ ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার টেলিফোন নম্বর লিখুন।",
                format_be: "আপনার লেখা টেলিফোন নম্বরটি বৈধ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
                minlength_be: "অনুগ্রহ করে একটি বৈধ মোবাইল টেলিফোন নম্বর লিখুন।",
            },
            "tl.phoneNumberAU": {
                regex: new RegExp(/^(?!9876543210)(?!([\d])\1{5,9})[6-9][\d]{9}$/),
                required: "Please enter your telephone number.",
                format: "The telephone number you have entered is not valid. Please try again.",
                minlength: "Please enter a valid mobile telephone number.",
                required_hi: "कृपया अपना टेलीफ़ोन नंबर डालें.",
                format_hi: "आपके द्वारा दर्ज किया गया टेलीफ़ोन नंबर मान्य नहीं है. कृपया दोबारा कोशिश करें.",
                minlength_hi: "कृपया कोई मान्य टेलीफ़ोन नंबर दर्ज करें.",
                required_ta: "தயவுசெய்து உங்கள் தொலைபேசி எண்ணை உள்ளிடுங்கள்.",
                format_ta: "நீங்கள் உள்ளிட்ட தொலைபேசி எண் செல்லுபடியாகாது. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                minlength_ta: "தயவுசெய்து செல்லுபடியாகும் மொபைல் எண்ணை உள்ளிடுங்கள்.",
                required_te: "దయచేసి మీ టెలిఫోన్ నెంబర్ ఎంటర్ చేయండి.",
                format_te: "మీరు ఎంటర్ చేసిన టెలిఫోన్ నెంబర్ చెల్లదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                minlength_te: "దయచేసి చెల్లుబాటు అయ్యే ఒక మొబైల్ టెలిఫోన్ నెంబర్ ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার টেলিফোন নম্বর লিখুন।",
                format_be: "আপনার লেখা টেলিফোন নম্বরটি বৈধ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
                minlength_be: "অনুগ্রহ করে একটি বৈধ মোবাইল টেলিফোন নম্বর লিখুন।",
            },
            "tl.dobMonth": {
                regex: new RegExp(/^(([0]?[1-9])|(1[0-2]))$/),
                required: "Please enter date of birth.",
                format: "Date of birth can only contain numbers.",
                invalid: "Sorry, the date you entered is not a valid date. Please try again.",
                required_hi: "कृपया जन्म की तारीख डालें.",
                format_hi: "जन्म की तारीख में सिर्फ़ अंक ही शामिल हो सकते हैं.",
                invalid_hi: "क्षमा करें, आपने जो तारीख दर्ज की है, वह मान्य तारीख नहीं है. कृपया दोबारा कोशिश करें.",
                required_ta: "தயவுசெய்து பிறந்த தேதியை உள்ளிடுங்கள்.",
                format_ta: "பிறந்த தேதியில் எண்கள் மட்டுமே இருக்க வேண்டும்.",
                invalid_ta: "மன்னிக்கவும், நீங்கள் உள்ளிட்ட தேதி சரியானது அல்ல. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                required_te: "దయచేసి పుట్టినతేదీ ఎంటర్ చేయండి.",
                format_te: "పుట్టినతేదీలో కేవలం అంకెలు ఉండాలి.",
                invalid_te: "మన్నించండి, మీరు ఎంటర్ చేసిన తేదీ ఒక చెల్లుబాటు అయ్యే తేదీ కాదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে জন্মতারিখ লিখুন।",
                format_be: "জন্মতারিখে কেবল সংখ্যা থাকতে পারবে।",
                invalid_be: "দুঃখিত, আপনার লেখা তারিখটি কোনও বৈধ তারিখ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
            },
            "tl.dobMonthAU": {
                regex: new RegExp(/^(([0]?[1-9])|(1[0-2]))$/),
                required: "Please enter date of birth.",
                format: "Date of birth can only contain numbers.",
                invalid: "Sorry, the date you entered is not a valid date. Please try again.",
                required_hi: "कृपया जन्म की तारीख डालें.",
                format_hi: "जन्म की तारीख में सिर्फ़ अंक ही शामिल हो सकते हैं.",
                invalid_hi: "क्षमा करें, आपने जो तारीख दर्ज की है, वह मान्य तारीख नहीं है. कृपया दोबारा कोशिश करें.",
                required_ta: "தயவுசெய்து பிறந்த தேதியை உள்ளிடுங்கள்.",
                format_ta: "பிறந்த தேதியில் எண்கள் மட்டுமே இருக்க வேண்டும்.",
                invalid_ta: "மன்னிக்கவும், நீங்கள் உள்ளிட்ட தேதி சரியானது அல்ல. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                required_te: "దయచేసి పుట్టినతేదీ ఎంటర్ చేయండి.",
                format_te: "పుట్టినతేదీలో కేవలం అంకెలు ఉండాలి.",
                invalid_te: "మన్నించండి, మీరు ఎంటర్ చేసిన తేదీ ఒక చెల్లుబాటు అయ్యే తేదీ కాదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে জন্মতারিখ লিখুন।",
                format_be: "জন্মতারিখে কেবল সংখ্যা থাকতে পারবে।",
                invalid_be: "দুঃখিত, আপনার লেখা তারিখটি কোনও বৈধ তারিখ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
            },
            "tl.dobDay": {
                regex: new RegExp(/^(([0]?[1-9])|([1-2][0-9])|(3[01]))$/),
                required: "Please enter date of birth.",
                format: "Date of birth can only contain numbers.",
                invalid: "Sorry, the date you entered is not a valid date. Please try again.",
                required_hi: "कृपया जन्म की तारीख डालें.",
                format_hi: "जन्म की तारीख में सिर्फ़ अंक ही शामिल हो सकते हैं.",
                invalid_hi: "क्षमा करें, आपने जो तारीख दर्ज की है, वह मान्य तारीख नहीं है. कृपया दोबारा कोशिश करें.",
                required_ta: "தயவுசெய்து பிறந்த தேதியை உள்ளிடுங்கள்.",
                format_ta: "பிறந்த தேதியில் எண்கள் மட்டுமே இருக்க வேண்டும்.",
                invalid_ta: "மன்னிக்கவும், நீங்கள் உள்ளிட்ட தேதி சரியானது அல்ல. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                required_te: "దయచేసి పుట్టినతేదీ ఎంటర్ చేయండి.",
                format_te: "పుట్టినతేదీలో కేవలం అంకెలు ఉండాలి.",
                invalid_te: "మన్నించండి, మీరు ఎంటర్ చేసిన తేదీ ఒక చెల్లుబాటు అయ్యే తేదీ కాదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে জন্মতারিখ লিখুন।",
                format_be: "জন্মতারিখে কেবল সংখ্যা থাকতে পারবে।",
                invalid_be: "দুঃখিত, আপনার লেখা তারিখটি কোনও বৈধ তারিখ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
            },
            "tl.dobDayAU": {
                regex: new RegExp(/^(([0]?[1-9])|([1-2][0-9])|(3[01]))$/),
                required: "Please enter date of birth.",
                format: "Date of birth can only contain numbers.",
                invalid: "Sorry, the date you entered is not a valid date. Please try again.",
                required_hi: "कृपया जन्म की तारीख डालें.",
                format_hi: "जन्म की तारीख में सिर्फ़ अंक ही शामिल हो सकते हैं.",
                invalid_hi: "क्षमा करें, आपने जो तारीख दर्ज की है, वह मान्य तारीख नहीं है. कृपया दोबारा कोशिश करें.",
                required_ta: "தயவுசெய்து பிறந்த தேதியை உள்ளிடுங்கள்.",
                format_ta: "பிறந்த தேதியில் எண்கள் மட்டுமே இருக்க வேண்டும்.",
                invalid_ta: "மன்னிக்கவும், நீங்கள் உள்ளிட்ட தேதி சரியானது அல்ல. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                required_te: "దయచేసి పుట్టినతేదీ ఎంటర్ చేయండి.",
                format_te: "పుట్టినతేదీలో కేవలం అంకెలు ఉండాలి.",
                invalid_te: "మన్నించండి, మీరు ఎంటర్ చేసిన తేదీ ఒక చెల్లుబాటు అయ్యే తేదీ కాదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                required_be: "অনুগ্রহ করে জন্মতারিখ লিখুন।",
                format_be: "জন্মতারিখে কেবল সংখ্যা থাকতে পারবে।",
                invalid_be: "দুঃখিত, আপনার লেখা তারিখটি কোনও বৈধ তারিখ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
            },
            "tl.dobYear": {
                regex: new RegExp(/^\d{4}$/),
                required: "Please enter date of birth.",
                format: "Date of birth can only contain numbers.",
                underage: "You need to be at least 16 years old to request your credit report.",
                overage: "Sorry, but it looks like the year for your date of birth might have been entered incorrectly. Please re-enter.",
                invalid: "Sorry, the date you entered is not a valid date. Please try again.",
                notfull: "You need to enter date of birth in DD-MM-YYYY format.",
                required_hi: "कृपया जन्म की तारीख डालें.",
                format_hi: "जन्म की तारीख में सिर्फ़ अंक ही शामिल हो सकते हैं.",
                underage_hi: "अपनी क्रेडिट रिपोर्ट का अनुरोध करने के लिए आपकी उम्र कम से कम 16 वर्ष की होनी चाहिए.",
                overage_hi: "क्षमा करें, लेकिन ऐसा लगता है कि आपकी जन्म की तारीख का वर्ष गलत रूप से दर्ज किया गया है. कृपया इसे दोबारा दर्ज करें.",
                invalid_hi: "क्षमा करें, आपने जो तारीख दर्ज की है, वह मान्य तारीख नहीं है. कृपया दोबारा कोशिश करें.",
                notfull_hi: "आपको DD-MM-YYYY फ़ॉर्मेट में जन्म की तारीख दर्ज करनी होगी.",
                required_ta: "தயவுசெய்து பிறந்த தேதியை உள்ளிடுங்கள்.",
                format_ta: "பிறந்த தேதியில் எண்கள் மட்டுமே இருக்க வேண்டும்.",
                underage_ta: "நீங்கள் உங்கள் கடன் அறிக்கையைக் கோருவதற்கு உங்களுக்கு குறைந்தபட்சம் 16 வயது இருக்க வேண்டும்.",
                overage_ta: "மன்னிக்கவும், உங்கள் பிறந்த தேதிக்கான ஆண்டு தவறாக உள்ளிடப்பட்டிருக்கலாம் என்று தெரிகிறது. தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                invalid_ta: "மன்னிக்கவும், நீங்கள் உள்ளிட்ட தேதி சரியானது அல்ல. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                notfull_ta: "நீங்கள் பிறந்த தேதியை நாநா-மாமா-வவவவ வடிவில் உள்ளிட வேண்டும்.",
                required_te: "దయచేసి పుట్టినతేదీ ఎంటర్ చేయండి.",
                format_te: "పుట్టినతేదీలో కేవలం అంకెలు ఉండాలి.",
                underage_te: "మీ క్రెడిట్ నివేదికను కోరడానికి మీ వయస్సు కనీసం 16 సంవత్సరాలు ఉండాలి.",
                overage_te: "మన్నించండి, మీ పుట్టినతేదీకి సంబంధించి మీరు ఎంటర్ చేసిన సంవత్సరం తప్పు అయివుండవచ్చు. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                invalid_te: "మన్నించండి, మీరు ఎంటర్ చేసిన తేదీ ఒక చెల్లుబాటు అయ్యే తేదీ కాదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                notfull_te: "పుట్టినతేదీని రోరో-నెనె-సంసంసంసం ఫార్మాట్లో ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে জন্মতারিখ লিখুন।",
                format_be: "জন্মতারিখে কেবল সংখ্যা থাকতে পারবে।",
                underage_be: "আপনার ক্রেডিট রিপোর্টের অনুরোধ করতে আপনার বয়স অন্তত 16 বছর হতে হবে।",
                overage_be: "দুঃখিত, কিন্তু দেখে মনে হচ্ছে আপনার জন্মতারিখের বছর বেঠিকভাবে লেখা হয়ে থাকতে পারে। অনুগ্রহ করে আবার লিখুন।",
                invalid_be: "দুঃখিত, আপনার লেখা তারিখটি কোনও বৈধ তারিখ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
                notfull_be: "আপনাকে জন্মতারিখ দিন-মাস-বৎসর ফরম্যাটে লিখতে হবে।",
            },
            "tl.dobYearAU": {
                regex: new RegExp(/^\d{4}$/),
                required: "Please enter date of birth.",
                format: "Date of birth can only contain numbers.",
                underage: "You need to be at least 16 years old to request your credit report.",
                overage: "Sorry, but it looks like the year for your date of birth might have been entered incorrectly. Please re-enter.",
                invalid: "Sorry, the date you entered is not a valid date. Please try again.",
                notfull: "You need to enter date of birth in DD-MM-YYYY format.",
                required_hi: "कृपया जन्म की तारीख डालें.",
                format_hi: "जन्म की तारीख में सिर्फ़ अंक ही शामिल हो सकते हैं.",
                underage_hi: "अपनी क्रेडिट रिपोर्ट का अनुरोध करने के लिए आपकी उम्र कम से कम 16 वर्ष की होनी चाहिए.",
                overage_hi: "क्षमा करें, लेकिन ऐसा लगता है कि आपकी जन्म की तारीख का वर्ष गलत रूप से दर्ज किया गया है. कृपया इसे दोबारा दर्ज करें.",
                invalid_hi: "क्षमा करें, आपने जो तारीख दर्ज की है, वह मान्य तारीख नहीं है. कृपया दोबारा कोशिश करें.",
                notfull_hi: "आपको DD-MM-YYYY फ़ॉर्मेट में जन्म की तारीख दर्ज करनी होगी.",
                required_ta: "தயவுசெய்து பிறந்த தேதியை உள்ளிடுங்கள்.",
                format_ta: "பிறந்த தேதியில் எண்கள் மட்டுமே இருக்க வேண்டும்.",
                underage_ta: "நீங்கள் உங்கள் கடன் அறிக்கையைக் கோருவதற்கு உங்களுக்கு குறைந்தபட்சம் 16 வயது இருக்க வேண்டும்.",
                overage_ta: "மன்னிக்கவும், உங்கள் பிறந்த தேதிக்கான ஆண்டு தவறாக உள்ளிடப்பட்டிருக்கலாம் என்று தெரிகிறது. தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                invalid_ta: "மன்னிக்கவும், நீங்கள் உள்ளிட்ட தேதி சரியானது அல்ல. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
                notfull_ta: "நீங்கள் பிறந்த தேதியை நாநா-மாமா-வவவவ வடிவில் உள்ளிட வேண்டும்.",
                required_te: "దయచేసి పుట్టినతేదీ ఎంటర్ చేయండి.",
                format_te: "పుట్టినతేదీలో కేవలం అంకెలు ఉండాలి.",
                underage_te: "మీ క్రెడిట్ నివేదికను కోరడానికి మీ వయస్సు కనీసం 16 సంవత్సరాలు ఉండాలి.",
                overage_te: "మన్నించండి, మీ పుట్టినతేదీకి సంబంధించి మీరు ఎంటర్ చేసిన సంవత్సరం తప్పు అయివుండవచ్చు. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                invalid_te: "మన్నించండి, మీరు ఎంటర్ చేసిన తేదీ ఒక చెల్లుబాటు అయ్యే తేదీ కాదు. దయచేసి తిరిగి ప్రయత్నించండి.",
                notfull_te: "పుట్టినతేదీని రోరో-నెనె-సంసంసంసం ఫార్మాట్లో ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে জন্মতারিখ লিখুন।",
                format_be: "জন্মতারিখে কেবল সংখ্যা থাকতে পারবে।",
                underage_be: "আপনার ক্রেডিট রিপোর্টের অনুরোধ করতে আপনার বয়স অন্তত 16 বছর হতে হবে।",
                overage_be: "দুঃখিত, কিন্তু দেখে মনে হচ্ছে আপনার জন্মতারিখের বছর বেঠিকভাবে লেখা হয়ে থাকতে পারে। অনুগ্রহ করে আবার লিখুন।",
                invalid_be: "দুঃখিত, আপনার লেখা তারিখটি কোনও বৈধ তারিখ নয়। অনুগ্রহ করে আবার চেষ্টা করুন।",
                notfull_be: "আপনাকে জন্মতারিখ দিন-মাস-বৎসর ফরম্যাটে লিখতে হবে।",
            },
            "tl.curr-street1": {
                regex: new RegExp(/^[a-zA-Z0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]*(?:[a-zA-Z]){3,}[a-zA-Z0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]*$/),
                required: "Please enter your address.",
                minlength: "Please enter an address of more than 3 characters.",
                format: "Your address must be more than one word and cannot contain the special characters < > \" ' &. One word must include only alphabetic characters only. Please re-enter.",
                required_hi: "कृपया अपना पता दर्ज करें.",
                minlength_hi: "कृपया 3 से ज़्यादा वर्णों का पता दर्ज करें.",
                format_hi: "आपके पते में एक से ज़्यादा वर्ण होने चाहिए और उसमें विशिष्ट वर्ण < > \" ' & शामिल नहीं हो सकते हैं. एक शब्द में सिर्फ़ अल्फ़ाबेटिक वर्ण शामिल होना आवश्यक है. कृपया इसे दोबारा दर्ज करें",
                required_ta: "தயவுசெய்து உங்கள் முகவரியை உள்ளிடுங்கள்",
                minlength_ta: "தயவுசெய்து 3 எழுத்துக்களுக்கு மேல் ஒரு முகவரியை உள்ளிடுங்கள்.",
                format_ta: "உங்கள் முகவரி ஒன்றுக்கு மேற்பட்ட எழுத்துக்களை கொண்டிருக்க வேண்டும் மற்றும் சிறப்பு எழுத்துக்கள் <> \" '& ஐ கொண்டிருக்கக்கூடாது. ஒரு வார்த்தையில் அகரவரிசை எழுத்துக்கள் மட்டுமே இருக்க வேண்டும். தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                required_te: "దయచేసి మీ చిరునామా ఎంటర్ చేయండి.",
                minlength_te: "దయచేసి 3 అక్షరాలకంటే ఎక్కువ ఉన్న చిరునామాను ఎంటర్ చేయండి.",
                format_te: "మీ చిరునామా ఒకటి కంటే ఎక్కువ పదాలను కలిగివుండాలి మరియు < > \" ' & వంటి ప్రత్యేక చిహ్నాలు కలిగివుండరాదు. ఒకపదంలో కేవలం అక్షరాలు మాత్రమే ఉండాలి. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার ঠিকানা লিখুন।",
                minlength_be: "অনুগ্রহ করে এমন একটি ঠিকানা লিখুন যাতে 3টির বেশি ক্যারেক্টার রয়েছে।",
                format_be: "আপনার ঠিকানায় একটির বেশি শব্দ থাকা আবশ্যক এবং সেগুলিতে < > \" ' & এর মতো স্পেশাল ক্যারেক্টারগুলি থাকতে পারবে না। একটি শব্দে কেবলমাত্র বর্ণমালার ক্যারেক্টার থাকা আবশ্যক। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.curr-street2": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]{0,40}$/),
                minlength: "Please enter an address of more than 3 characters.",
                format: "Your address cannot contain the special characters < > \" ' &",
                minlength_hi: "कृपया 3 से ज़्यादा वर्णों का पता दर्ज करें.",
                format_hi: "आपके पते में विशिष्ट वर्ण <> \" ' & शामिल नहीं हो सकते हैं",
                minlength_ta: "தயவுசெய்து 3 எழுத்துக்களுக்கு மேல் ஒரு முகவரியை உள்ளிடுங்கள்.",
                format_ta: "உங்கள் முகவரியில் சிறப்பு எழுத்துக்கள் <> \" '& இருக்கக்கூடாது",
                minlength_te: "దయచేసి 3 అక్షరాలకంటే ఎక్కువ ఉన్న చిరునామాను ఎంటర్ చేయండి.",
                format_te: "మీ చిరునామా < > \" ' & వంటి ప్రత్యేక చిహ్నాలు కలిగివుండరాదు.",
                minlength_be: "অনুগ্রহ করে এমন একটি ঠিকানা লিখুন যাতে 3টির বেশি ক্যারেক্টার রয়েছে।",
                format_be: "আপনার ঠিকানায় < > \" ' & এর মতো স্পেশাল ক্যারেক্টারগুলি থাকলে চলবে না।",
            },
            "tl.curr-street3": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]{0,40}$/),
                minlength: "Please enter an address of more than 3 characters.",
                format: "Your address cannot contain the special characters < > \" ' &",
                minlength_hi: "कृपया 3 से ज़्यादा वर्णों का पता दर्ज करें.",
                format_hi: "आपके पते में विशिष्ट वर्ण <> \" ' & शामिल नहीं हो सकते हैं",
                minlength_ta: "தயவுசெய்து 3 எழுத்துக்களுக்கு மேல் ஒரு முகவரியை உள்ளிடுங்கள்.",
                format_ta: "உங்கள் முகவரியில் சிறப்பு எழுத்துக்கள் <> \" '& இருக்கக்கூடாது",
                minlength_te: "దయచేసి 3 అక్షరాలకంటే ఎక్కువ ఉన్న చిరునామాను ఎంటర్ చేయండి.",
                format_te: "మీ చిరునామా < > \" ' & వంటి ప్రత్యేక చిహ్నాలు కలిగివుండరాదు.",
                minlength_be: "অনুগ্রহ করে এমন একটি ঠিকানা লিখুন যাতে 3টির বেশি ক্যারেক্টার রয়েছে।",
                format_be: "আপনার ঠিকানায় < > \" ' & এর মতো স্পেশাল ক্যারেক্টারগুলি থাকলে চলবে না।",
            },
            "tl.dbAddressAU1": {
                regex: new RegExp(/^[a-zA-Z0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]*(?:[a-zA-Z]){3,}[a-zA-Z0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]*$/),
                required: "Please enter your address.",
                minlength: "Please enter an address of more than 3 characters.",
                format: "Your address must be more than one word and cannot contain the special characters < > \" ' &. One word must include only alphabetic characters only. Please re-enter.",
                required_hi: "कृपया अपना पता दर्ज करें.",
                minlength_hi: "कृपया 3 से ज़्यादा वर्णों का पता दर्ज करें.",
                format_hi: "आपके पते में एक से ज़्यादा वर्ण होने चाहिए और उसमें विशिष्ट वर्ण < > \" ' & शामिल नहीं हो सकते हैं. एक शब्द में सिर्फ़ अल्फ़ाबेटिक वर्ण शामिल होना आवश्यक है. कृपया इसे दोबारा दर्ज करें",
                required_ta: "தயவுசெய்து உங்கள் முகவரியை உள்ளிடுங்கள்",
                minlength_ta: "தயவுசெய்து 3 எழுத்துக்களுக்கு மேல் ஒரு முகவரியை உள்ளிடுங்கள்.",
                format_ta: "உங்கள் முகவரி ஒன்றுக்கு மேற்பட்ட எழுத்துக்களை கொண்டிருக்க வேண்டும் மற்றும் சிறப்பு எழுத்துக்கள் <> \" '& ஐ கொண்டிருக்கக்கூடாது. ஒரு வார்த்தையில் அகரவரிசை எழுத்துக்கள் மட்டுமே இருக்க வேண்டும். தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                required_te: "దయచేసి మీ చిరునామా ఎంటర్ చేయండి.",
                minlength_te: "దయచేసి 3 అక్షరాలకంటే ఎక్కువ ఉన్న చిరునామాను ఎంటర్ చేయండి.",
                format_te: "మీ చిరునామా ఒకటి కంటే ఎక్కువ పదాలను కలిగివుండాలి మరియు < > \" ' & వంటి ప్రత్యేక చిహ్నాలు కలిగివుండరాదు. ఒకపదంలో కేవలం అక్షరాలు మాత్రమే ఉండాలి. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার ঠিকানা লিখুন।",
                minlength_be: "অনুগ্রহ করে এমন একটি ঠিকানা লিখুন যাতে 3টির বেশি ক্যারেক্টার রয়েছে।",
                format_be: "আপনার ঠিকানায় একটির বেশি শব্দ থাকা আবশ্যক এবং সেগুলিতে < > \" ' & এর মতো স্পেশাল ক্যারেক্টারগুলি থাকতে পারবে না। একটি শব্দে কেবলমাত্র বর্ণমালার ক্যারেক্টার থাকা আবশ্যক। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.dbAddressAU2": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]{0,40}$/),
                minlength: "Please enter an address of more than 3 characters.",
                format: "Your address cannot contain the special characters < > \" ' &",
                minlength_hi: "कृपया 3 से ज़्यादा वर्णों का पता दर्ज करें.",
                format_hi: "आपके पते में विशिष्ट वर्ण <> \" ' & शामिल नहीं हो सकते हैं",
                minlength_ta: "தயவுசெய்து 3 எழுத்துக்களுக்கு மேல் ஒரு முகவரியை உள்ளிடுங்கள்.",
                format_ta: "உங்கள் முகவரியில் சிறப்பு எழுத்துக்கள் <> \" '& இருக்கக்கூடாது",
                minlength_te: "దయచేసి 3 అక్షరాలకంటే ఎక్కువ ఉన్న చిరునామాను ఎంటర్ చేయండి.",
                format_te: "మీ చిరునామా < > \" ' & వంటి ప్రత్యేక చిహ్నాలు కలిగివుండరాదు.",
                minlength_be: "অনুগ্রহ করে এমন একটি ঠিকানা লিখুন যাতে 3টির বেশি ক্যারেক্টার রয়েছে।",
                format_be: "আপনার ঠিকানায় < > \" ' & এর মতো স্পেশাল ক্যারেক্টারগুলি থাকলে চলবে না।",
            },
            "tl.dbAddressAU3": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ0-9\s-!$%^*()_+|~=`{}[\]:\/;?,.@#\\]{0,40}$/),
                minlength: "Please enter an address of more than 3 characters.",
                format: "Your address cannot contain the special characters < > \" ' &",
                minlength_hi: "कृपया 3 से ज़्यादा वर्णों का पता दर्ज करें.",
                format_hi: "आपके पते में विशिष्ट वर्ण <> \" ' & शामिल नहीं हो सकते हैं",
                minlength_ta: "தயவுசெய்து 3 எழுத்துக்களுக்கு மேல் ஒரு முகவரியை உள்ளிடுங்கள்.",
                format_ta: "உங்கள் முகவரியில் சிறப்பு எழுத்துக்கள் <> \" '& இருக்கக்கூடாது",
                minlength_te: "దయచేసి 3 అక్షరాలకంటే ఎక్కువ ఉన్న చిరునామాను ఎంటర్ చేయండి.",
                format_te: "మీ చిరునామా < > \" ' & వంటి ప్రత్యేక చిహ్నాలు కలిగివుండరాదు.",
                minlength_be: "অনুগ্রহ করে এমন একটি ঠিকানা লিখুন যাতে 3টির বেশি ক্যারেক্টার রয়েছে।",
                format_be: "আপনার ঠিকানায় < > \" ' & এর মতো স্পেশাল ক্যারেক্টারগুলি থাকলে চলবে না।",
            },
            "tl.deSalary": {
                regex: new RegExp(/[0-9,]{4,12}$/),
                required: "Please enter your Monthly Income.",
                format: "Monthly Income should be greater than 1000 and accepts only numbers. Please re-enter.",
                required_hi: "कृपया अपनी मासिक आय दर्ज करें.",
                format_hi: "मासिक आय 1000 से अधिक होनी चाहिए और केवल संख्या को स्वीकार करना चाहिए. कृपया पुनः प्रवेश करें.",
                required_ta: "உங்கள் மாத வருமானத்தை உள்ளிடுங்கள்",
                format_ta: "மாத வருமானம் 1000 ஐ விட அதிகமாக இருக்க வேண்டும் மற்றும் எண்களை மட்டுமே ஏற்றுக்கொள்கிறது. மீண்டும் உள்ளிடவும்.",
                required_te: "దయచేసి మీ నెలవారీ వేతనం ఎంటర్ చేయండి.",
                format_te: "నెలవారీ ఆదాయం 1000 కంటే ఎక్కువగా ఉండాలి మరియు సంఖ్యలను మాత్రమే అంగీకరిస్తుంది. దయచేసి తిరిగి నమోదు చేయండి.",
                required_be: "অনুগ্রহ করে আপনার মাসিক উপার্জন লিখুন।",
                format_be: "মাসিক উপার্জন 1000 এর বেশি হতে হবে এবং কেবলমাত্র সংখ্যা গ্রহণ করবে। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.deUpdateSalary": {
                regex: new RegExp(/[0-9,]{4,12}$/),
                required: "Please enter your Monthly Income.",
                format: "Monthly Income should be greater than 1000 and accepts only numbers. Please re-enter.",
                required_hi: "कृपया अपनी मासिक आय दर्ज करें.",
                format_hi: "मासिक आय 1000 से अधिक होनी चाहिए और केवल संख्या को स्वीकार करना चाहिए. कृपया पुनः प्रवेश करें.",
                required_ta: "உங்கள் மாத வருமானத்தை உள்ளிடுங்கள்",
                format_ta: "மாத வருமானம் 1000 ஐ விட அதிகமாக இருக்க வேண்டும் மற்றும் எண்களை மட்டுமே ஏற்றுக்கொள்கிறது. மீண்டும் உள்ளிடவும்.",
                required_te: "దయచేసి మీ నెలవారీ వేతనం ఎంటర్ చేయండి.",
                format_te: "నెలవారీ ఆదాయం 1000 కంటే ఎక్కువగా ఉండాలి మరియు సంఖ్యలను మాత్రమే అంగీకరిస్తుంది. దయచేసి తిరిగి నమోదు చేయండి.",
                required_be: "অনুগ্রহ করে আপনার মাসিক উপার্জন লিখুন।",
                format_be: "মাসিক উপার্জন 1000 এর বেশি হতে হবে এবং কেবলমাত্র সংখ্যা গ্রহণ করবে। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.curr-city": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ0-9\s'-]{2,40}$/),
                required: "Please enter your city.",
                format: "Sorry, but we can only accept letters, spaces, apostrophes, and hyphens for your city. Please re-enter.",
                required_hi: "कृपया अपना शहर दर्ज करें.",
                format_hi: "क्षमा करें, लेकिन हम आपके शहर के लिए सिर्फ़ अक्षर, रिक्तियां, एपॉस्ट्रॉफ़ और हाइफ़न ही स्वीकार कर सकते हैं. कृपया इसे दोबारा दर्ज करें.",
                required_ta: "தயவுசெய்து உங்கள் நகரத்தை உள்ளிடுங்கள்.",
                format_ta: "மன்னிக்கவும், உங்கள் நகரத்திற்கான எழுத்துக்கள், இடைவெளிகள், அப்போஸ்ட்ரோப்கள் மற்றும் ஹைபன்களை மட்டுமே நாங்கள் ஏற்க முடியும். தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                required_te: "దయచేసి మీ నగరం పేరు ఎంటర్ చేయండి.",
                format_te: "మన్నించండి, మీ నగరం కోసం మేము అక్షరాలు, స్పేస్లు, అపోస్ట్రోఫ్స్, మరియు హైఫన్స్ మాత్రమే అంగీకరిస్తాము. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার শহরের নাম লিখুন।",
                format_be: "দুঃখিত, তবে আমরা আপনার শহরের নামে কেবল অক্ষর, ফাঁক, অ্যাপোস্ট্রফি ও হাইফেন গ্রহণ করবো। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.dbCityAU": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ0-9\s'-]{2,40}$/),
                required: "Please enter your city.",
                format: "Sorry, but we can only accept letters, spaces, apostrophes, and hyphens for your city. Please re-enter.",
                required_hi: "कृपया अपना शहर दर्ज करें.",
                format_hi: "क्षमा करें, लेकिन हम आपके शहर के लिए सिर्फ़ अक्षर, रिक्तियां, एपॉस्ट्रॉफ़ और हाइफ़न ही स्वीकार कर सकते हैं. कृपया इसे दोबारा दर्ज करें.",
                required_ta: "தயவுசெய்து உங்கள் நகரத்தை உள்ளிடுங்கள்.",
                format_ta: "மன்னிக்கவும், உங்கள் நகரத்திற்கான எழுத்துக்கள், இடைவெளிகள், அப்போஸ்ட்ரோப்கள் மற்றும் ஹைபன்களை மட்டுமே நாங்கள் ஏற்க முடியும். தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                required_te: "దయచేసి మీ నగరం పేరు ఎంటర్ చేయండి.",
                format_te: "మన్నించండి, మీ నగరం కోసం మేము అక్షరాలు, స్పేస్లు, అపోస్ట్రోఫ్స్, మరియు హైఫన్స్ మాత్రమే అంగీకరిస్తాము. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার শহরের নাম লিখুন।",
                format_be: "দুঃখিত, তবে আমরা আপনার শহরের নামে কেবল অক্ষর, ফাঁক, অ্যাপোস্ট্রফি ও হাইফেন গ্রহণ করবো। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.curr-state": {
                regex: new RegExp(/^01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|26|27|28|29|30|31|32|33|34|35|36|38|99$/),
                required: "Please select a state.",
                required_hi: "कृपया कोई राज्य चुनें.",
                required_ta: "தயவுசெய்து ஒரு மாநிலத்தை தேர்வு செய்யுங்கள்.",
                required_te: "దయచేసి ఒక రాష్ట్రాన్ని ఎంచుకోండి.",
                required_be: "অনুগ্রহ করে একটি রাজ্যের নাম নির্বাচন করুন।",
            },
            "tl.dbRegionCodeAU": {
                regex: new RegExp(/^01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|26|27|28|29|30|31|32|33|34|35|36|38|99$/),
                required: "Please select a state.",
                required_hi: "कृपया कोई राज्य चुनें.",
                required_ta: "தயவுசெய்து ஒரு மாநிலத்தை தேர்வு செய்யுங்கள்.",
                required_te: "దయచేసి ఒక రాష్ట్రాన్ని ఎంచుకోండి.",
                required_be: "অনুগ্রহ করে একটি রাজ্যের নাম নির্বাচন করুন।",
            },
            "tl.identifierName": {
                regex: new RegExp(/^[a-zA-Z]*$/),
                required: "Please select an identity proof type.",
                required_hi: "कृपया पहचान प्रमाणपत्र का कोई प्रकार चुनें. ",
                required_ta: "தயவுசெய்து அடையாள அட்டை வகையைத் தேர்வு செய்யுங்கள். ",
                required_te: "మీ గుర్తింపు ఋజువు నెంబర్ ఎంచుకోండి.",
                required_be: "অনুগ্রহ করে পরিচিতির প্রমাণের একটি প্রকার নির্বাচন করুন।",
            },
            "tl.dbidentifierNameAU": {
                regex: new RegExp(/^[a-zA-Z]*$/),
                required: "Please select an identity proof type.",
                required_hi: "कृपया पहचान प्रमाणपत्र का कोई प्रकार चुनें. ",
                required_ta: "தயவுசெய்து அடையாள அட்டை வகையைத் தேர்வு செய்யுங்கள். ",
                required_te: "మీ గుర్తింపు ఋజువు నెంబర్ ఎంచుకోండి.",
                required_be: "অনুগ্রহ করে পরিচিতির প্রমাণের একটি প্রকার নির্বাচন করুন।",
            },
            "tl.identifierId": {
                regex: new RegExp(/^[A-Z0-9 ]+$/),
                required: "Please enter your identity proof number.",
                format: "Please enter a valid identity proof number. All letters in your ID number must be in uppercase.",
                panValidation: "Invalid PAN Number",
                required_hi: "कृपया अपने पहचान प्रमाणपत्र का नंबर डालें.",
                format_hi: "कृपया अपने पहचान प्रमाणपत्र का मान्य नंबर डालें. आपके ID नंबर के सभी अक्षर बड़े अक्षर होने चाहिए.",
                panValidation_hi: "अमान्य पैन नंबर",
                required_ta: "தயவுசெய்து உங்கள் அடையாள அட்டை எண்ணை உள்ளிடுங்கள்.",
                format_ta: "தயவுசெய்து செல்லுபடியாகும் அடையாள அட்டை எண்ணை உள்ளிடுங்கள். உங்கள் அடையாள எண்ணில் உள்ள அனைத்து எழுத்துக்களும் பெரிய எழுத்தில் இருக்க வேண்டும்.",
                panValidation_ta: "செல்லுப்படியாகாத PAN எண்",
                required_te: "మీ గుర్తింపు ఋజువు నెంబర్ ఎంచుకోండి.",
                format_te: "చెల్లుబాటు అయ్యే గుర్తింపు ఋజువు నెంబర్ ఎంచుకోండి. మీ ఐడి నెంబర్ అప్పర్కేస్లో ఉండాలి.",
                panValidation_te: "చెల్లుబాటు కాని పాన్ నంబర్",
                required_be: "অনুগ্রহ করে আপনার পরিচিতির প্রমাণের নম্বর লিখুন।",
                format_be: "অনুগ্রহ করে একটি বৈধ পরিচিতির প্রমাণের নম্বর লিখুন। আপনার আইডি নম্বরের যাবতীয় অক্ষর বড়হাতের হওয়া আবশ্যক।",
                panValidation_be: "অবৈধ PAN নম্বর",
            },
            "tl.dbIdentifierIdAU": {
                regex: new RegExp(/^[A-Z0-9 ]+$/),
                required: "Please enter your identity proof number.",
                format: "Please enter a valid identity proof number. All letters in your ID number must be in uppercase.",
                panValidation: "Invalid PAN Number",
                required_hi: "कृपया अपने पहचान प्रमाणपत्र का नंबर डालें.",
                format_hi: "कृपया अपने पहचान प्रमाणपत्र का मान्य नंबर डालें. आपके ID नंबर के सभी अक्षर बड़े अक्षर होने चाहिए.",
                panValidation_hi: "अमान्य पैन नंबर",
                required_ta: "தயவுசெய்து உங்கள் அடையாள அட்டை எண்ணை உள்ளிடுங்கள்.",
                format_ta: "தயவுசெய்து செல்லுபடியாகும் அடையாள அட்டை எண்ணை உள்ளிடுங்கள். உங்கள் அடையாள எண்ணில் உள்ள அனைத்து எழுத்துக்களும் பெரிய எழுத்தில் இருக்க வேண்டும்.",
                panValidation_ta: "செல்லுப்படியாகாத PAN எண்",
                required_te: "మీ గుర్తింపు ఋజువు నెంబర్ ఎంచుకోండి.",
                format_te: "చెల్లుబాటు అయ్యే గుర్తింపు ఋజువు నెంబర్ ఎంచుకోండి. మీ ఐడి నెంబర్ అప్పర్కేస్లో ఉండాలి.",
                panValidation_te: "చెల్లుబాటు కాని పాన్ నంబర్",
                required_be: "অনুগ্রহ করে আপনার পরিচিতির প্রমাণের নম্বর লিখুন।",
                format_be: "অনুগ্রহ করে একটি বৈধ পরিচিতির প্রমাণের নম্বর লিখুন। আপনার আইডি নম্বরের যাবতীয় অক্ষর বড়হাতের হওয়া আবশ্যক।",
                panValidation_be: "অবৈধ PAN নম্বর",
            },
            "tl.curr-zip-code": {
                regex: new RegExp(/^([1-9]{1}[0-9]{2}[-]{1}[0-9]{3}$)+|^([1-9]\d{5})$/),
                required: "Please enter your pincode",
                format: "Pincode should contain exactly 6 digits and only numbers. Please re-enter.",
                required_hi: "कृपया अपना पिनकोड दर्ज करें ",
                format_hi: "पिनकोड में सटीक रूप से 6 अंक होने चाहिए और वे सिर्फ़ नंबर होने चाहिए. कृपया इसे दोबारा दर्ज करें.",
                required_ta: "தயவுசெய்து உங்கள் அஞ்சல் குறியீட்டை உள்ளிடுங்கள் ",
                format_ta: "அஞ்சல் குறியீட்டில் சரியாக 6 இலக்க எண்கள் மட்டுமே இருக்க வேண்டும். தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                required_te: "దయచేసి మీ పిన్కోడ్ ఎంటర్ చేయండి. ",
                format_te: "పిన్కోడ్లో ఖచ్చితంగా 6 అంకెలు మాత్రమే ఉండాలి. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার পিনকোড লিখুন",
                format_be: "পিনকোডে সবসময় ঠিক 6টি অঙ্ক ও কেবলমাত্র সংখ্যা থাকতে পারবে। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.dbPostalCodeAU": {
                regex: new RegExp(/^([1-9]{1}[0-9]{2}[-]{1}[0-9]{3}$)+|^([1-9]\d{5})$/),
                required: "Please enter your pincode",
                format: "Pincode should contain exactly 6 digits and only numbers. Please re-enter.",
                required_hi: "कृपया अपना पिनकोड दर्ज करें ",
                format_hi: "पिनकोड में सटीक रूप से 6 अंक होने चाहिए और वे सिर्फ़ नंबर होने चाहिए. कृपया इसे दोबारा दर्ज करें.",
                required_ta: "தயவுசெய்து உங்கள் அஞ்சல் குறியீட்டை உள்ளிடுங்கள் ",
                format_ta: "அஞ்சல் குறியீட்டில் சரியாக 6 இலக்க எண்கள் மட்டுமே இருக்க வேண்டும். தயவுசெய்து மறு-உள்ளீடு செய்யுங்கள்.",
                required_te: "దయచేసి మీ పిన్కోడ్ ఎంటర్ చేయండి. ",
                format_te: "పిన్కోడ్లో ఖచ్చితంగా 6 అంకెలు మాత్రమే ఉండాలి. దయచేసి తిరిగి ఎంటర్ చేయండి.",
                required_be: "অনুগ্রহ করে আপনার পিনকোড লিখুন",
                format_be: "পিনকোডে সবসময় ঠিক 6টি অঙ্ক ও কেবলমাত্র সংখ্যা থাকতে পারবে। অনুগ্রহ করে আবার লিখুন।",
            },
            "tl.prev-city": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s'-]{2,40}$/),
                required: "Oops, it looks like you need to enter the name of your city or town.",
                format: "Sorry, but we can only accept letters, numbers, apostrophes, spaces, hyphens, periods, and ‘#’ for this field. Please re-enter.",
            },
            "tl.prev-state": {
                regex: new RegExp(/^AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT$/),
                required: "Oops, it looks like you need to select your province.",
                format: "Sorry, but we only accept the official abbreviation for your province. Please re-enter.",
            },
            "tl.prev-zip-code": {
                regex: new RegExp(/^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$/),
                required: "Oops, it looks like you need to enter your postal code.",
                format: "Sorry, but we can only accept numbers and letters for your postal code and it must be 6 characters long. Please re-enter.",
            },
            "tl.sin": { regex: new RegExp(/^\d{9}?$/), format: "Sorry, but we can only accept numbers for your social insurance number.", minlength: "Sorry, but the social insurance number you entered needs to be nine digits long." },
            "tl.newCreditCard": { regex: new RegExp(/^([0-9]{1,11})$/), required: "Oops, you need to enter a value for the credit card limit.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.loanType": { regex: new RegExp(/^creditCardLoan|autoLoan|homeLoan|personalLoan$/), required: "Please Select Loan type.", required_be: "অনুগ্রহ করে ঋণের প্রকার নির্বাচন করুন।" },
            "tl.dueInDays": { required: "Please Select Past due date." },
            "tl.estimatedLoanAmount": {
                regex: new RegExp(/^([0-9]{1,11})$/),
                required: "Oops, you need to enter a value for the loan.",
                format: "Oops, you haven’t entered a valid loan amount. Please try again.",
                type: "Oops, you haven’t entered a valid loan type. Please try again.",
            },
            "tl.creditInquiries": { regex: new RegExp(/^([1]{1}\d{9})|(\d)$/), required: "", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.creditLineIncrease": { regex: new RegExp(/^([0-9]{1,11})$/), required: "Oops, you need to enter a value for the credit card limit increase amount.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.allowOneMonthAccPastDue": { regex: new RegExp(/^(30|60|90)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.isPayAllCreditCardBal": { regex: new RegExp(/^(true|false)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.isTaxlien": { regex: new RegExp(/^(true|false)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.isForeclossure": { regex: new RegExp(/^(true|false)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.isOneAccountCollection": { regex: new RegExp(/^(true|false)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.increaseBalance": { regex: new RegExp(/^([0-9]{1,11})$/), required: "Oops, you need to enter a value for all the credit cards balance increase amount.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.decreaseBalance": { regex: new RegExp(/^([0-9]{1,11})$/), required: "Oops, you need to enter a value for all the credit cards balance decrease amount.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.OnTimeCreditHistory": { regex: new RegExp(/^(2[0-4])|(1[0-9])|([0-9])$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.newCreditCardAmtTransfer": { regex: new RegExp(/^([0-9]{1,11})$/), required: "Oops, you need to enter a value for the new credit card limit.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.allowAllMonthAccPastDue": { regex: new RegExp(/^(30|60|90)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.isCloseOldCreditAcc": { regex: new RegExp(/^(true|false)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.isChildSupport": { regex: new RegExp(/^(true|false)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.isWageGarnishment": { regex: new RegExp(/^(true|false)$/), required: "This field is required.", format: "Oops, you haven’t entered a valid value. Please try again." },
            "tl.suffix": { regex: "", required: "This field is required.", format: "This field is not valid." },
            "tl.emailoptin": { regex: "", required: "This field is required.", format: "This field is not valid." },
            "tl.old-password": {
                regex: new RegExp(/^(?=.*\d)[a-zA-Z\d\S]{8,15}$/),
                required: "Oops, it looks like you need to enter your old password.",
                format: "Please enter 8-15 characters using at least one letter and number. Spaces are not allowed.",
                username: "Your password cannot contain your username.",
                minlength: "Oops, your password must be at least 8 characters.",
                required_hi: "ओह, ऐसा लगता है कि आपको पुराना पासवर्ड डालने की ज़रूरत है.",
                format_hi: "कृपया कम से कम एक वर्ण और नंबर का उपयोग करके 8-15 अक्षर दर्ज करें. रिक्तियों की अनुमति नहीं है.",
                username_hi: "आपके पासवर्ड में आपका उपयोगकर्ता नाम शामिल नहीं हो सकता है.",
                minlength_hi: "ओह, आपका उपयोगकर्ता नाम कम से कम 8 अक्षरों का ज़रूर होना चाहिये.",
                required_ta: "அடடா, உங்கள் பழைய பாஸ்வேர்டை உள்ளிட வேண்டும் என்று தெரிகிறது.",
                format_ta: "தயவுசெய்து குறைந்தபட்சம் ஒரு எழுத்து மற்றும் எண்ணைப் பயன்படுத்தி 8-15 எழுத்துக்களை உள்ளிடவும். இடைவெளிகள் அனுமதிக்கப்படாது.",
                username_ta: "உங்கள் பாஸ்வேர்டில் உங்கள் யூசர்நேம் இருக்கக்கூடாது.",
                minlength_ta: "அடடா, உங்கள் பாஸ்வேர்ட் குறைந்தது 8 எழுத்துகளாக இருக்க வேண்டும்.",
                required_te: "అయ్యో, మీరు మీ పాత పాస్వర్డ్ను ఎంటర్ చేయాల్సి రావచ్చు.",
                format_te: "కనీసం ఒక అక్షరం మరియు ఒక అంకెను ఉపయోగిస్తూ దయచేసి 8-15 క్యారెక్టర్లు ఎంటర్ చేయండి. అక్షరాల మధ్యలో స్పేస్ అనుమతించబడదు.",
                username_te: "మీ పాస్వర్డ్లో యూజర్నేమ్ ఉండరాదు.",
                minlength_te: "అయ్యో, మీ పాస్వర్డ్ కనీసం 8 క్యారెక్టర్లను కలిగి ఉండాలి.",
                required_be: "এই যাঃ, মনে হচ্ছে আপনাকে পুরোনো পাসওয়ার্ড লিখতে হবে",
                format_be: "অন্ততপক্ষে একটি করে অক্ষর ও সংখ্যা ব্যবহার করে অনুগ্রহ করে 8-15টি ক্যারেক্টার লিখুন। ফাঁক দেওয়ার অনুমতি নেই।",
                username_be: "আপনার পাসওয়ার্ডে আপনার ইউজারনেম থাকতে পারবে না।",
                minlength_be: "এই যাঃ, আপনার পাসওয়ার্ড অন্তত 8টি ক্যারেক্টারের হওয়া আবশ্যক।",
            },
            "tl.newPassword": {
                regex: new RegExp(/^(?!.*[\s])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,15}$/),
                required: "Oops, it looks like you need to create your password. Please enter a valid password containing at least 8-15 characters.",
                format: "Please enter 8-15 characters using at least one of each of the following: uppercase alphabetical character, lowercase alphabetical character, numeric character, special character. Spaces are not allowed.",
                username: "Your password cannot contain your username.",
                minlength: "Password must be at least 8 characters.",
                required_hi: "ओह, ऐसा लगता है कि आपको नया पासवर्ड बनाने की ज़रूरत है. कृपया ऐसा मान्य पासवर्ड डालें, जिसमें कम से कम 8-15 वर्ण हों.",
                format_hi: "कृपया निम्न में से प्रत्येक के कम से कम एक का उपयोग करके 8-15 वर्ण दर्ज करें: अपरकेस वर्णमाला वर्ण, वर्णमाला वर्ण, संख्यात्मक वर्ण, विशेष वर्ण कम करें। रिक्त स्थान की अनुमति नहीं है",
                username_hi: "आपके पासवर्ड में आपका उपयोगकर्ता नाम शामिल नहीं हो सकता है.",
                minlength_hi: "पासवर्ड कम से कम 8 अक्षर का अवश्य होना चाहिये.",
                required_ta: "அடடா, நீங்கள் உங்கள் பாஸ்வேர்டை உருவாக்க வேண்டும் போல் தோன்றுகிறது. தயவுசெய்து குறைந்தபட்சம் 8- 15 எழுத்துகளைக் கொண்ட செல்லுபடியாகும் பாஸ்வேர்டை உள்ளிடுங்கள்.",
                format_ta: "பின்வருபவற்றில் குறைந்தது 3-ஐ பயன்படுத்தி 8- 15 எழுத்துக்களை உள்ளிடவும்: பெரிய எழுத்துக்கள், சிறிய எழுத்துக்கள், எண் எழுத்துக்கள், சிறப்பு எழுத்துக்கள். இடைவெளிகள் அனுமதிக்கப்படாது.",
                username_ta: "உங்கள் பாஸ்வேர்டில் உங்கள் யூசர்நேம் இருக்கக்கூடாது.",
                minlength_ta: "பாஸ்வேர்டில் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.",
                required_te: "అయ్యో, మీరు కొత్త పాస్వర్డ్ ఇవ్వవలసిన అవసరం కలగవచ్చు. దయచేసి కనీసం 8-15 అక్షరాలు ఉండే చెల్లుబాటు అయ్యే ఒక పాస్వర్డ్ ఎంటర్ చేయండి.",
                format_te: "కిందతెలిపిన వాటిలో కనీసం 3 ఉపయోగించి, 8-15 అక్షరాలను ఎంటర్ చేయండి: అక్షరాల అప్పర్కేస్, అక్షరాల లోయర్కేస్, అంకె, ప్రత్యేక చిహ్నం. అక్షరాల మధ్యలో స్పేస్ అనుమతించబడదు.",
                username_te: "మీ పాస్వర్డ్లో యూజర్నేమ్ ఉండరాదు.",
                minlength_te: "పాస్వర్డ్లో కనీసం 8 అక్షరాలు ఉండాలి.",
                required_be: "এই যাঃ, মনে হচ্ছে আপনাকে আপনার পাসওয়ার্ড তৈরি করতে হবে। অনুগ্রহ করে অন্তত 8-15 ক্যারেক্টার থাকা একটি বৈধ পাসওয়ার্ড লিখুন।",
                format_be: "অনুগ্রহ করে নিম্নলিখিতগুলির প্রতিটি অন্তত একবার করে ব্যবহার করে 8টি থেকে 15টি ক্যারেক্টার লিখুন: বর্ণমালার বড়হাতের ক্যারেক্টার, বর্ণমালার ছোটহাতের ক্যারেক্টার, সংখ্যা ক্যারেক্টার, স্পেশাল ক্যারেক্টার। ফাঁক দেওয়ার অনুমতি নেই।",
                username_be: "আপনার পাসওয়ার্ডে আপনার ইউজারনেম থাকতে পারবে না।",
                minlength_be: "পাসওয়ার্ড অন্ততঃ 8 ক্যারেক্টারের হওয়া আবশ্যক।",
            },
            "tl.newPassword2": {
                regex: "",
                required: "Please enter a password.",
                match: "Oops, your password confirmation must match.",
                required_hi: "कृपया कोई पासवर्ड डालें.",
                match_hi: "ओह, आपके पासवर्ड की पुष्टि का मिलान होना आवश्यक है.",
                required_ta: "தயவுசெய்து ஒரு பாஸ்வேர்டை உள்ளிடுங்கள்.",
                match_ta: "அடடா, உங்கள் பாஸ்வேர்டை உறுதிப்படுத்தல் பொருந்த வேண்டும்.",
                required_te: "దయచేసి పాస్వర్డ్ ఎంటర్ చేయండి.",
                match_te: "అయ్యో, మీ పాస్వర్డ్ నిర్ధారణ ఖచ్చితంగా సరిపోలాలి.",
                required_be: "অনুগ্রহ করে একটি পাসওয়ার্ড দিন।",
                match_be: "এই যাঃ, আপনার পাসওয়ার্ড নিশ্চিতকরণ মিলে যাওয়া আবশ্যক।",
            },
            "confirm-password": { regex: "", required: "Oops, your password confirmation must match.", match: "Oops, your password confirmation must match." },
            "tl.newSecret-answer": {
                regex: new RegExp(/^[a-zA-Z0-9 ]+$/),
                format: "Oops, sorry we can only accept letters, numbers and  spaces for your secret answer. Please re-enter.",
                password: "Sorry, but your answer cannot contain your password.",
            },
            "tl.accServiceUsed": { regex: "", required: "Oops, it looks like you need to enter the type of Service Used." },
            duMonth: { regex: new RegExp(/^((0?[1-9])|(1[0-2]))$/), format: "Oops, it looks like you've entered an invalid month.", required: "Oops, it looks like you need to enter the Date Used." },
            duDay: { regex: new RegExp(/^((0?[1-9])|(1[0-9])|(2[0-9])|3[0-1])$/), format: "Oops, it looks like you've entered an invalid day.", required: "Oops, it looks like you need to enter the Date Used." },
            duYear: { regex: new RegExp(/^\d{4}$/), format: "Oops, it looks like you've entered an invalid year.", required: "Oops, it looks like you need to enter the Date Used." },
            "tl.accDateUsed": { required: "Oops, it looks like you need to enter the Date Used.", format: "Sorry, the date you entered is not a valid date. Please try again." },
            "tl.accServiceChannelUsed": { required: "Oops, highlight the service channel you are using." },
            "tl.accFeedBackNature": { required: "Oops, make a selection for the nature of your feedback." },
            "tl.accFeedBack": { required: "We would like to hear from you; please enter your feedback." },
            "tl.accReplyRequested": { required: "Oops, select if you’d like to hear back from us." },
            "tl.accResponseChannel": { required: "Oops, select how you’d like to hear back from us." },
            "tl.accFirstName": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s'-]{1,25}$/),
                required: "Oops, it looks like you need to enter your first name.",
                format: "Sorry, but we can only accept letters spaces, apostrophes, and hyphens for your first name. Please re-enter.",
            },
            "tl.accLastName": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\'\s-]{1,40}$/),
                required: "Oops, it looks like you need to enter your last name.",
                format: "Sorry, but we can only accept letters, spaces, apostrophes, and hyphens for your last name. Please re-enter.",
            },
            "tl.accEmailAddress": {
                regex: new RegExp(/^[a-zA-Z0-9\-\._]+[@][a-zA-Z0-9\-\._]+\.[a-zA-Z0-9\-\._]+$/),
                required: "Oops, it looks like you need to enter your email address.",
                format: "Oops, you haven't entered a valid email address. Please try again.",
            },
            "tl.accAddressLineOne": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ0-9\s\'-.\#]{5,130}$/),
                required: "Oops, it looks like you need to enter your billing address.",
                format: "Sorry, but we can only accept letters, numbers, apostrophes, spaces, hyphens, periods, and '#'' for this field. Please re-enter.",
            },
            "tl.accCity": {
                regex: new RegExp(/^[a-zA-ZÀ-ÖØ-öø-þ\s'-]{2,40}$/),
                required: "Oops, it looks like you need to enter the name of your city or town.",
                format: "Sorry, but we can only accept letters, spaces, apostrophes, and hyphens for your city. Please re-enter.",
            },
            "tl.accState": {
                regex: new RegExp(/^AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT$/),
                required: "Oops, it looks like you need to select an official Canadian Postal Service abbreviation for your province. ",
                format: "Sorry, but we only accept the official abbreviation for your province. Please re-enter.",
            },
            "tl.accZipCode": {
                regex: new RegExp(/^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$/),
                required: "Oops, it looks like you need to enter your 6-character postal code.",
                format: "Sorry, but we can only accept numbers and letters for your postal code and it must be 6 characters long. Please re-enter.",
            },
            "tl.accNumber": {
                regex: new RegExp(/^[2-9]\d{9}?$/),
                required: "Oops, looks like you need to enter your telephone number.",
                format: "Oops, you haven't entered your telephone number correctly. Please try again.",
                minlength: "Sorry, but the telephone number you enter needs to be 10 numbers long.",
            },
            "tl.activationCodeId": {
                regex: new RegExp(/^[0-9a-zA-Z]*$/),
                required: "Try Again: Activation code isn't recognized.",
                minlength: "Oops Your: Activation code must be at least 12 characters.",
                format: "Try Again: Activation code isn't recognized.",
                required_ta: "மீண்டும் முயற்சி செய்யவும்: செயல்படுத்தும் குறியீடு அங்கீகரிக்கப்படவில்லை.",
                minlength_ta: "அடடா உங்கள்: செயல்படுத்தும் குறியீட்டில் குறைந்தது 12 எழுத்துக்கள் இருக்க வேண்டும்.",
                format_ta: "மீண்டும் முயற்சி செய்யவும்: செயல்படுத்தும் குறியீடு அங்கீகரிக்கப்படவில்லை.",
                required_te: "మళ్లీ ప్రయత్నించండి: యాక్టివేషన్ కోడ్‌‌ను గుర్తించలేకపోయాం.",
                minlength_te: "అయ్యో మీ: యాక్టివేషన్ కోడ్ కనీసం 12 క్యారెక్టర్లను కలిగి ఉండాలి.",
                format_te: "మళ్లీ ప్రయత్నించండి: యాక్టివేషన్ కోడ్‌‌ను గుర్తించలేకపోయాం.",
                required_be: "আবার চেষ্টা করুন: সক্রিয়করণ কোড স্বীকৃত নয়।",
                minlength_be: "এই যাঃ, আপনার: সক্রিয়করণ কোড অন্ততঃ 12 ক্যারেক্টারের হওয়া আবশ্যক।",
                format_be: "আবার চেষ্টা করুন: সক্রিয়করণ কোড স্বীকৃত নয়।",
                required_be: "আবার চেষ্টা করুন: সক্রিয়করণ কোড স্বীকৃত নয়।",
                minlength_be: "এই যাঃ, আপনার: সক্রিয়করণ কোড অন্ততঃ 12 ক্যারেক্টারের হওয়া আবশ্যক।",
                format_be: "আবার চেষ্টা করুন: সক্রিয়করণ কোড স্বীকৃত নয়।",
            },
            "tl.promocode": {
                regex: new RegExp(/^[A-Za-z0-9]*[A-Za-z0-9][A-Za-z0-9]{0,30}$/),
                format: "Discount code must be alphanumeric and without spaces",
                format_hi: "छूट कोड अल्फ़ान्यूमेरिक होना चाहिए और उसमें रिक्तियां नहीं होनी चाहिए ",
                format_ta: "தள்ளுபடி குறியீடு எண்ணெழுத்தாக மற்றும் இடைவெளிகள் இல்லாமல் இருக்க வேண்டும்",
                format_te: "డిస్కౌంట్ కోడ్ అనేది అక్షరాలు, అంకెలతో స్పేస్‌లు లేకుండా ఉండాలి",
                format_be: "ছাড়ের কোড আলফানিউমারিক ও ফাঁক ছাড়া হওয়া আবশ্যক",
            },
        },
        passesLuhnCheck: function(e) {
            for (var t = 0, r = e.length, n = r % 2, a = 0; a < r; a++) {
                var i = parseInt(e.charAt(a));
                a % 2 == n && (i *= 2), i > 9 && (i -= 9), (t += i);
            }
            return t % 10 == 0;
        },
        formatCurrency: function(e, t) {
            if ("undefined" != typeof e) {
                (e = e.toString().replace(/\$|\,/g, "")),
                isNaN(e) && (e = "0"),
                    (sign = e == (e = Math.abs(e))),
                    (e = Math.floor(100 * e + 0.50000000001)),
                    (cents = e % 100),
                    (e = Math.floor(e / 100).toString()),
                    cents < 10 && (cents = "0" + cents);
                for (var r = 0; r < Math.floor((e.length - (1 + r)) / 2); r++) e = e.substring(0, e.length - (4 * r + 2)) + "," + e.substring(e.length - (4 * r + 2));
                return t ? (sign ? "" : "-") + e + "." + cents : (sign ? "" : "-") + e;
            }
        },
        formatInrCurrency: function(e, t) {
            if ("undefined" != typeof e && !strincludes(e, ",")) {
                var r = "00";
                e.indexOf(".") > 0 && (r = e.substring(e.indexOf(".") + 1, e.length)), "undefined" == typeof sign ? (sign = e == (e = Math.abs(e))) : sign, (e = Math.floor(e)), (e = e.toString());
                var n = e.substring(e.length - 3),
                    a = e.substring(0, e.length - 3);
                "" != a && (n = "," + n);
                var i = a.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + n;
                return t ? (sign ? "" : "-") + i + "." + r : (sign ? "" : "-") + i;
            }
        },
        gradeRanges: {
            transrisk: {
                hasMidRanges: !0,
                A: { min: 780, max: 850, rank: "11%", perc: 11, copy: "Very Good" },
                Am: { min: 750, max: 779, rank: "10%", perc: 10 },
                B: { min: 720, max: 749, rank: "11%", perc: 11, copy: "Good" },
                Bm: { min: 685, max: 719, rank: "11%", perc: 11 },
                C: { min: 640, max: 684, rank: "11%", perc: 11, copy: "Fair" },
                Cm: { min: 590, max: 639, rank: "11%", perc: 11 },
                D: { min: 525, max: 589, rank: "10%", perc: 10, copy: "Poor" },
                Dm: { min: 445, max: 524, rank: "10%", perc: 10 },
                F: { min: 300, max: 444, rank: "11%", perc: 11, copy: "Very Poor" },
            },
            vantage2: {
                hasMidRanges: !1,
                A: { min: 901, max: 990, rank: "37%", perc: 37, copy: "A" },
                B: { min: 801, max: 900, rank: "12%", perc: 12, copy: "B" },
                C: { min: 701, max: 800, rank: "18%", perc: 18, copy: "C" },
                D: { min: 601, max: 700, rank: "21%", perc: 21, copy: "D" },
                F: { min: 501, max: 600, rank: "12%", perc: 12, copy: "F" },
            },
            vantage3: {
                hasMidRanges: !1,
                A: { min: 781, max: 850, rank: "74%-100%", perc: 27, copy: "A" },
                B: { min: 720, max: 780, rank: "52%-73%", perc: 22, copy: "B" },
                C: { min: 658, max: 719, rank: "35%-51%", perc: 17, copy: "C" },
                D: { min: 601, max: 657, rank: "22%-34%", perc: 13, copy: "D" },
                F: { min: 300, max: 600, rank: "1%-21%", perc: 21, copy: "F" },
            },
            creditvision: {
                hasMidRanges: !1,
                A: "undefined" != typeof ud && "undefined" != typeof ud.scores.creditvision.creditScoreModel && "CIBILTUSC3" === ud.scores.creditvision.creditScoreModel ? { min: 778, max: 900, rank: "17%" } : { min: 825, max: 900, rank: "19%" },
                B: "undefined" != typeof ud && "undefined" != typeof ud.scores.creditvision.creditScoreModel && "CIBILTUSC3" === ud.scores.creditvision.creditScoreModel ? { min: 765, max: 777, rank: "20%" } : { min: 800, max: 824, rank: "20%" },
                C: "undefined" != typeof ud && "undefined" != typeof ud.scores.creditvision.creditScoreModel && "CIBILTUSC3" === ud.scores.creditvision.creditScoreModel ? { min: 748, max: 764, rank: "21%" } : { min: 775, max: 799, rank: "21%" },
                D: "undefined" != typeof ud && "undefined" != typeof ud.scores.creditvision.creditScoreModel && "CIBILTUSC3" === ud.scores.creditvision.creditScoreModel ? { min: 723, max: 747, rank: "22%" } : { min: 700, max: 774, rank: "21%" },
                F: "undefined" != typeof ud && "undefined" != typeof ud.scores.creditvision.creditScoreModel && "CIBILTUSC3" === ud.scores.creditvision.creditScoreModel ? { min: 300, max: 722, rank: "20%" } : { min: 300, max: 699, rank: "19%" },
            },
        },
    },
    DEBUG = !!CCVD.queryString().DEBUG;
DEBUG && console.warn("Debug mode enabled."),
    window.Handlebars.registerHelper("select", function(e, t) {
        var r = $("<select />").html(t.fn(this));
        return r.find("[value=" + e + "]").attr({ selected: "selected" }), r.html();
    });
var modelToUse = "creditvision",
    modelForSimulator = "creditvision",
    nameOfSimulator = "TransUnion CIBIL Score",
    nameOfSimulator_fr = "pointage de crédit";
if ("undefined" != typeof ud && "undefined" != typeof ud.report.balances)
    var data = {
        reqpar: reqpar["request-params"] || {},
        model: modelToUse,
        modelForSimulator: modelForSimulator,
        nameOfSimulator: localizedString("scoreFactors_NameOfSimulator"),
        score: ud.scores[modelToUse].score,
        factors: { negative: ud.scores[modelToUse].factors.negative || [], positive: ud.scores[modelToUse].factors.positive || [] },
        simulated: ud.simulator.score || "---",
        alerts: 0,
        scoredate: ud.scores[modelToUse].date || "UNKNOWN",
        refreshdate: ud.scores[modelToUse].refreshdate || "UNKNOWN",
        refreshdatetime: new Date(ud.scores[modelToUse].refreshdatetime) || "UNKNOWN",
        reportdate: ud.report.date,
        latepmnt: 0,
        utilization: 0,
        openacct: 0,
        inquiries: ud.report.inquiries,
        depthcredit: 0,
        availcredit: 0,
        currbalance: CCVD.formatCurrency(ud.report.balances, !1),
        scoreModel: ud.scores[modelToUse].creditScoreModel || "",
    };
else var data = { model: "transrisk" };
var hasSB7 = analytics.offer && analytics.offer.indexOf("SB7") !== -1,
    noScore = data.score < CCVD.gradeRanges[data.model].F.min,
    scoreInNumeric = 1 * data.score;



$(document).ready(function() {
    function e(e, t, r) {
        for (var n = 0; n < e.length; n++)
            if (e[n][t] === r) return !0;
        return !1;
    }

    function t(e) {
        var r = "";
        for (var n in e)
            "object" == typeof e[n] ?
            ((r +=
                    '<div class="alertType"><div class="alertHeader">' +
                    e[n].type.replace(/([A-Z])/g, " $1").trim() +
                    "<span data-hj-suppress>" +
                    ("undefined" != typeof e[n].Date ? e[n].Date : "") +
                    '</span></div><div class="alertsWrapper">'),
                delete e[n].type,
                (r += t(e[n])),
                (r += "</div></div>")) :
            (r +=
                "Bureau" !== n.replace(/([A-Z])/g, " $1").trim() && "Date" !== n.replace(/([A-Z])/g, " $1").trim() && "undefined" != typeof e[n] && "" !== e[n] ?
                '<div class="alertItem"><span>' + n + "</span><span data-hj-suppress>" + e[n] + "</span></div>" :
                "");
        return r;
    }

    function r() {
        $(".maskedValue").each(function() {
            var e = /\d/g;
            $(this).text().match(/@/) ||
                e.test($(this).text()) ||
                ($(".maskedValue").text().match(/\*/) ?
                    $(this).parent('div[id^="question"').remove() :
                    ($(this).siblings('input[type="radio"]').attr("type", "hidden"), $(this).find("br").remove(), $(this).find('input[name^="tl.user-input-answer"]').attr("type", "text").addClass("required")));
        });
    }

    function n() {
        ($("body").hasClass("lang-ta") || $("body").hasClass("lang-te")) && $("#enrollSteps").addClass("longerSteps");
        var e = "true" === catalog.CatalogItems.ssoOffer,
            t = "true" === catalog.CatalogItems.ivRequires,
            r = "true" === catalog.CatalogItems.PaymentRequires,
            n = "true" === reqpar["request-params"]["tl.is_active_order_payment_required"];
        (t || r) && ($(".steps .glyphicons-keys").css("display", "inline-block"), $("ul.steps").css("display", "flex")),
        t && ($(".steps .glyphicons-shield").css("display", "inline-block"), $("ul.steps").css("display", "flex")),
            isLoggedIn === !1 && r ?
            ($(".steps .glyphicons-credit-card").css("display", "inline-block"), $("ul.steps").css("display", "flex")) :
            (isLoggedIn === !0 && r && (n || e)) || window.location.href.indexOf("/enrollPayment.page") > 0 ?
            ($(".steps .glyphicons-credit-card").css("display", "inline-block"), $("ul.steps").css("display", "flex")) :
            $(".steps .glyphicons-credit-card").remove();
    }
    $("#modal-wrapper").hide();
    var a = 0;
    today - new Date(data.refreshdatetime) > 864e5 && (a = Math.ceil((today - new Date(data.refreshdatetime)) / 864e5)),
        $(".days-old").text(a),
        $(".refresh").show(),
        $(document).on("click", "#confirmRefresh", function() {
            $("#confirmRefreshButton").prop("disabled", !this.checked);
            var e = window.location.pathname,
                t = e.split("/").pop().replace(".page", ""),
                r =
                t.charAt(0).toUpperCase() +
                t
                .slice(1)
                .replace(/([A-Z]+)/g, " $1")
                .replace(/([A-Z][a-z])/g, " $1");
            "Creditreport" === r && (r = "Credit Report"),
                $(this).is(":checked") &&
                generalGATracking("Post Login - " + r + " Section", "Post Login - " + r + " Section - Refresh Center Subsection", "Post Login - " + r + " Section - Refresh Center Subsection - Agree Terms Refresh Click");
        }),
        "undefined" != typeof siteInfo &&
        ("en" != locale && (siteInfo.SupportHours = "" != localizedString(siteInfo.SiteName + "_SupportHours") ? localizedString(siteInfo.SiteName + "_SupportHours") : siteInfo.SupportHours),
            $(".contactPhone").html(siteInfo.CreditDataPhone),
            $(".siteInfo_CreditDataPhone").html(siteInfo.CreditDataPhone),
            $(".siteInfo_DisplayName").html(siteInfo.DisplayName),
            $(".siteInfo_SupportHours").html(siteInfo.SupportHours),
            $(".siteInfo_SupportPhone").html(siteInfo.SupportPhone),
            $(".siteInfo_WebDomain").html(siteInfo.WebDomain),
            sessionStorage.setItem("siteInfoWebDomain", siteInfo.WebDomain));
    var i = document.title,
        o = "" != localizedString(i) ? localizedString(i) : i;
    if (
        (i != o && (document.title = o),
            void 0 != reqpar["request-params"]["tl.productWebToken"] && window.location.href.indexOf("/creditreport.page") > 0 && (document.title = "CIBIL Report"),
            $(document).on("click", "a.menu", function(e) {
                e.preventDefault(), $(".menu-links").toggle();
            }),
            isLoggedIn || $("#login").length ? $(".tactical-links .logged-out").remove() : $(".tactical-links .logged-in").remove(),
            isLoggedIn || ($("#support .loggedIn").remove(), $("#education .loggedIn").remove()),
            $(".alerts").length > 0 && catalog.CatalogItems.hasBureauMonitoring && ($(".nav-links .alerts").removeClass("-hide"), $(".nav-links .alert-count").removeClass("-hide")),
            $("#id-protection-content").length > 0 && $("footer .byline nav").remove(),
            ($("#dashboard").length > 0 || $("#scorefactors").length > 0 || $("#scoreSimulator").length > 0 || ($("#CreditReports").length > 0 && void 0 != reqpar["request-params"]["tl.productWebToken"])) && renderDashboard(),
            $("#login").length > 0 && localStorage.removeItem("firstVisit"),
            $("*[data-language='" + locale + "']").addClass("on"),
            $("#help2").length > 0 && "undefined" != typeof ui.loginHelpInfo)
    )
        switch (($("#UserName").val(ui.loginHelpInfo.UserName), $("#SecretQuestion").val(ui.loginHelpInfo.SecretQuestion), ui.loginHelpInfo.SecretQuestion)) {
            case "GrandfatherFirstName":
                $("#secretQuestionDisplay").html("What is your grandfather's first name (on your father's side)?");
                break;
            case "GrandmotherFirstName":
                $("#secretQuestionDisplay").html("What is your grandmother's first name (on your mother's side)?");
                break;
            case "BirthCity":
                $("#secretQuestionDisplay").html("What city were you born in?");
                break;
            case "FatherMiddleName":
                $("#secretQuestionDisplay").html("What is your father's middle name?");
                break;
            case "MotherMiddleName":
                $("#secretQuestionDisplay").html("What is your mother's middle name?");
                break;
            case "FirstCar":
                $("#secretQuestionDisplay").html("What was the make and model of your first car?");
                break;
            case "TeacherLastName":
                $("#secretQuestionDisplay").html("What was your first grade teacher's last name?");
                break;
            case "SchoolMascot":
                $("#secretQuestionDisplay").html("What was your high school mascot?");
                break;
            default:
                $("#secretQuestionDisplay").html("");
        }
    if (
        ($("#help3").length > 0 && "undefined" != typeof ui.loginHelpInfo && ($("#UserName").val(reqpar["request-params"]["tl.username"]), $("#UserNameDisplay").html(reqpar["request-params"]["tl.username"])),
            $("#enroll").length > 0 &&
            $(document).on("change", 'input[name="residency"]', function() {
                $(".previous-address").toggle();
            }),
            $("#enrollAboutYou").length > 0 &&
            $(document).on("change", 'input[name="residency"]', function() {
                $(".previous-address").toggle(),
                    $(".previous-address input, .previous-address select").toggleClass("required").val(""),
                    $(".previous-address input.error, .previous-address select.error").removeClass("error"),
                    $(".previous-address .helper").removeClass("error").html("");
            }),
            $("#enrollVerifyIdentity").length > 0 && "undefined" != typeof ui && $("#enrollVerifyIdentity h3 span").html(ui.userInfo.FirstName),
            $("#enroll-FullSSN").length > 0 &&
            $(".notes a").on("click", function(e) {
                e.preventDefault(), $(".notes p").toggle();
                var t = $(this).text();
                $(this).text("[ - ]" == t ? "[ + ]" : "[ - ]");
            }),
            "undefined" != typeof catalog && "undefined" != typeof catalog.CatalogItems && $("#education").length > 0 && (catalog.CatalogItems.hasEnrichedAcademy || $('a[rel="enriched-academy"]').parent().hide()),
            $("#scorefactors").length > 0 && $(".intro .username").html(ud.reportstu.Name.CIBIL),
            ($("#login").length > 0 || $("#webLogin ").length > 0) &&
            ((CCVD.rules["tl.username"].regex = ""),
                "hi" === sessionStorage.getItem("userLangPref") ?
                ((CCVD.rules["tl.username"].minlength = "Oops, your username must be at least 1 character."), (CCVD.rules["tl.username"].required = "कृपया अपने खाते में उपयोगकर्ता नाम दर्ज करें।")) :
                "ta" === sessionStorage.getItem("userLangPref") ?
                (CCVD.rules["tl.username"].required = "அடடா, உங்கள் யூசர்நேம்மை குறைந்தது 1 எழுத்தாக இருக்க வேண்டும்.") :
                "te" === sessionStorage.getItem("userLangPref") ?
                (CCVD.rules["tl.username"].required = "దయచేసి మీ ఖాతాలో వినియోగదారు పేరును నమోదు చేయండి.") :
                "be" === sessionStorage.getItem("userLangPref") ?
                (CCVD.rules["tl.username"].required = "এই যাঃ, আপনার ইউজারনেম অন্তত 1টি ক্যারেক্টারের হওয়া আবশ্যক।") :
                ((CCVD.rules["tl.username"].minlength = "Oops, your username must be at least 1 character."), (CCVD.rules["tl.username"].required = "Please enter the username on your account.")),
                "undefined" != typeof failureInfo &&
                "undefined" != typeof failureInfo.reason &&
                ((failureInfo.reason.indexOf("PARTNER_CUST_CODE_NOT_FOUND") > -1 || failureInfo.reason.indexOf("CUSTOMER_NOT_FOUND") > -1) &&
                    ("hi" === sessionStorage.getItem("userLangPref") ?
                        $("#login .colWrapper").after('<div class="error-box"><p class="glyphicons-circle-exclamation-mark margin0">क्षमा करें, हम आपका उपयोगकर्ता नाम या पासवर्ड नहीं पहचानते. कृपया दोबारा कोशिश करें.</p></div>') :
                        "ta" === sessionStorage.getItem("userLangPref") ?
                        $("#login .colWrapper").after(
                            '<div class="error-box"><p class="glyphicons-circle-exclamation-mark margin0">மன்னிக்கவும், எங்களால் உங்கள் யூசர்நேம் அல்லது பாஸ்வேர்டை அடையாளம் காண முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.</p></div>'
                        ) :
                        "te" === sessionStorage.getItem("userLangPref") ?
                        $("#login .colWrapper").after(
                            '<div class="error-box"><p class="glyphicons-circle-exclamation-mark margin0">దోష సందేశం:  మన్నించండి, మేము మీ యూజర్నేమ్ లేదా పాస్వర్డ్ను గుర్తించలేకపోతున్నాం. దయచేసి తిరిగి ప్రయత్నించండి.</p></div>'
                        ) :
                        "be" === sessionStorage.getItem("userLangPref") ?
                        $("#login .colWrapper").after('<div class="error-box"><p class="glyphicons-circle-exclamation-mark margin0">দুঃখিত, আমরা আপনার ইউজারনেম বা পাসওয়ার্ড চিনতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন।</p></div>') :
                        $("#login .colWrapper").after('<div class="error-box"><p class="glyphicons-circle-exclamation-mark margin0">Sorry, we don\'t recognize your username or password. Please try again.</p></div>')),
                    failureInfo.reason.indexOf("INVALID_TEMP_PASSWORD") > -1 &&
                    $(".webtokenLogin").length > 0 &&
                    $("#webLogin .colWrapper").after('<div class="error-box"><p class="glyphicons-circle-exclamation-mark margin0">Sorry, the password is incorrect. Please refer to the email for valid combination.</p></div>'))),
            $("#help1").length > 0 &&
            "undefined" != typeof failureInfo &&
            "undefined" != typeof failureInfo.reason &&
            failureInfo.reason.indexOf("CUSTOMER_NOT_FOUND") > -1 &&
            $("#help1 .error_iv_message").append('<div class="error-box"><p class="glyphicons-circle-exclamation-mark">Please check your email for the temporary password. If you don\'t receive an email please try again.</p></div>'),
            $("#help3").length > 0 &&
            "undefined" != typeof failureInfo &&
            "undefined" != typeof failureInfo.reason &&
            (failureInfo.reason.indexOf("INVALID_TEMP_PASSWORD") > -1 ?
                ((el = "tl.password"), (helper = $("#enroll-Password").siblings(".helper")), throwError(el, helper, "invalidCurrPass", "Invalid Current Password")) :
                failureInfo.reason.indexOf("CUSTOMER_NOT_FOUND") > -1 && ((el = "tl.password"), (helper = $("#enroll-Password").siblings(".helper")), throwError(el, helper, "invalidCurrPass", "Invalid Username and Password"))),
            $("#profile").length > 0 &&
            ("undefined" != typeof failureInfo && "undefined" != typeof failureInfo.reason && failureInfo.reason.indexOf("INVALID_OLD_PASSWORD") > -1 ?
                ($("#profile-Password-Old").addClass("required"), edVerify($("#profile-Password-Old"))) :
                "undefined" != typeof failureInfo && "undefined" != typeof failureInfo.reason && failureInfo.reason.indexOf("INVALID_NEW_PASSWORD") > -1 ?
                ($("#profile-Password-New").addClass("required"), edVerify($("#profile-Password-New"))) :
                "undefined" != typeof reqpar["request-params"]["tl.oldPasswordFlag"] && "true" === reqpar["request-params"]["tl.oldPasswordFlag"] ?
                ($(".updatedMsg").show(), $("#profile .form-left h2 .error-box").css("display", "none")) :
                "undefined" != typeof reqpar["request-params"]["tl.OptInAlertsSaveFlag"] &&
                "true" === reqpar["request-params"]["tl.OptInAlertsSaveFlag"] &&
                ($("#Profile-AlertsPreference-Sel").click(), $("#profile-Phone").attr("type", "tel"), $(".updatedPreferenceMsg").show(), $("#profile .form-left h2 .error-box").css("display", "none"))),
            $("#Profile-AlertsPreference-Sel").click(function() {
                0 !== $("#Profile-ChangePassword").find(".error").length && ($("#profile-Password-Old,#profile-Password-New,#profile-Password-Confirm").val(""), $("#Profile-ChangePassword .error").removeClass("error")),
                    $("#Profile-ChangePassword .required").removeClass("required"),
                    $("#profile-Phone").attr("type", "tel"),
                    $("input[name=Action]").val("UPDATE_CUSTOMER");
            }),
            $("#Profile-ChangePassword-Sel").click(function() {
                0 !== $("#Profile-AlertsPreference").find(".error").length && $("#Profile-AlertsPreference .error").removeClass("error"), $("input[name=Action]").val("UPDATE_CUSTOMER_LOGIN"), $("#profile-Phone").attr("type", "hidden");
            }),
            $("#alerts").length > 0 &&
            ($(document).on("click", "#instantAlertsMsg .close", function() {
                    $("#instantAlertsMsg").remove();
                }),
                $(document).on("click", "tr.toggle", function() {
                    $(this).toggleClass("active"),
                        $(this).hasClass("active") ?
                        ($(".date", this).removeClass("glyphicons-chevron-right"), $(".date", this).addClass("glyphicons-chevron-down")) :
                        ($(".date", this).removeClass("glyphicons-chevron-down"), $(".date", this).addClass("glyphicons-chevron-right")),
                        $(this).next("tr").children("td.expanded").toggle();
                })),
            $("#creditAlertsPage").length > 0)
    ) {
        var s = $(".hasAlerts"),
            l = $(".freeMembership"),
            d = $(".oneMonthMembership");
        if (findElementExpDate(ud.reportstu.ComponentDetail, "Component", "TransUnionMonitoring") === !0)
            if (e(ud.reportstu.BenefitsBundle, "Benefit", "ALERT_TAB_DETAILS") === !0) {
                s.removeClass("hide").siblings().remove();
                var c = Object.keys(ud.alerts).length;
                if (0 !== c) {
                    $(".no-alerts").hide();
                    var u = ud.alerts;
                    document.getElementById("alertsListWrapper").innerHTML = t(u);
                }
                var p = $(".alertHeader"),
                    h = ".alertsWrapper";
                p.click(function() {
                        $(this).toggleClass("upArrow"), $(this).siblings(h).toggleClass("expanded");
                    }),
                    onLoadGATracking("NormalAlertsContentPage");
            } else
                e(ud.reportstu.BenefitsBundle, "Benefit", "ALERT_TAB_REFRESH") === !0 ?
                (d.removeClass("hide").siblings().remove(), buildRefreshCenter(), onLoadGATracking("RefreshAlertsContentPage")) :
                (l.removeClass("hide").siblings().remove(), onLoadGATracking("UpgradeAlertsContentPage"));
        else l.removeClass("hide").siblings().remove(), onLoadGATracking("UpgradeAlertsContentPage");
    }
    if (
        ($("#refreshId").click(function() {
                generalGATracking("Atlas Post Login", "Atlas Post Login - Alerts Section - Refresh Center Subsection", "Atlas Post Login - Alerts Section - Refresh Center Subsection  - " + A + " - Refresh My Report Click");
            }),
            "undefined" != typeof ui && "undefined" != typeof ui.userInfo && (ui.userInfo.isCreditLocked ? ($(".unlock-wrapper").show(), $(".lock-wrapper").hide()) : ($(".unlock-wrapper").hide(), $(".lock-wrapper").show())),
            $(document).on("click touchstart", "#lock-credit", function(e) {
                e.preventDefault(), $('input[name="Action"]').val("CHANGE_CREDIT_LOCK"), $("<input>").attr("type", "hidden").attr("name", "tl.lock").attr("value", !0).appendTo("form"), $("form").submit();
            }),
            $(document).on("click touchstart", "#unlock-credit", function(e) {
                e.preventDefault(), $('input[name="Action"]').val("CHANGE_CREDIT_LOCK"), $("<input>").attr("type", "hidden").attr("name", "tl.lock").attr("value", !1).appendTo("form"), $("form").submit();
            }),
            $("#profile").length > 0)
    ) {
        var f = ui.loginInfo.UserName || "";
        if (($('input[name="tl.username"]').val(f), "undefined" != typeof ui && (document.getElementById("profile-Username").value = ui.loginInfo.UserName || ""), $("#Profile-AlertsPreference").length > 0)) {
            var m = reqpar["request-params"]["tl.dbMobileNumber"] || "";
            $('input[name="tl.phoneNumber"]').val(m), "undefined" != typeof ui && (document.getElementById("profile-Phone").value = reqpar["request-params"]["tl.dbMobileNumber"] || "");
            var g = reqpar["request-params"]["tl.OptInSMSNotification"];
            (void 0 != g && "true" != g) || ($('input[name="tl.OptInSMS"]').prop("checked", !0), $('input[name="tl.OptInSMSNotification"]').val("true")),
            $('input[name="tl.OptInSMS"]').click(function() {
                var e = $('input[name="tl.OptInSMS"]').is(":checked");
                $('input[name="tl.OptInSMSNotification"]').val(e);
            });
            var v = ui.userInfo.EmailAddress || "";
            $('input[name="tl.email"]').val(v);
            var y = reqpar["request-params"]["tl.OptInEmailNotification"];
            (void 0 != y && "true" != y) || ($('input[name="tl.OptInEmail"]').prop("checked", !0), $('input[name="tl.OptInEmailNotification"]').val("true")),
            $('input[name="tl.OptInEmail"]').click(function() {
                var e = $('input[name="tl.OptInEmail"]').is(":checked");
                $('input[name="tl.OptInEmailNotification"]').val(e);
            });
            var b = reqpar["request-params"]["tl.OptInAlertsEnabled"];
            void 0 != b && "true" == b && $("#Profile-AlertsPreference-Sel").css("display", "block"), $(".profile-sms-fields").hide();
            var S = reqpar["request-params"]["tl.OptInSMSNotificationEnabled"];
            void 0 != S && "true" == S && $(".profile-sms-fields").show();
        }
    }
    if ($(".SSO-enroll1").length > 0) {
        "undefined" != typeof reqpar &&
            ((reqpar["request-params"]["tl.curr-street1"] = "Default" == reqpar["request-params"]["tl.curr-street1"] ? "" : reqpar["request-params"]["tl.curr-street1"]),
                (reqpar["request-params"]["tl.curr-street2"] = "Default" == reqpar["request-params"]["tl.curr-street2"] ? "" : reqpar["request-params"]["tl.curr-street2"]),
                (reqpar["request-params"]["tl.curr-street3"] = "Default" == reqpar["request-params"]["tl.curr-street3"] ? "" : reqpar["request-params"]["tl.curr-street3"]),
                (reqpar["request-params"]["tl.curr-city"] = "Default" == reqpar["request-params"]["tl.curr-city"] ? "" : reqpar["request-params"]["tl.curr-city"]),
                (reqpar["request-params"]["tl.curr-state"] = "27" == reqpar["request-params"]["tl.curr-state"] ? "" : reqpar["request-params"]["tl.curr-state"]),
                (reqpar["request-params"]["tl.curr-zip-code"] = "400001" == reqpar["request-params"]["tl.curr-zip-code"] ? "" : reqpar["request-params"]["tl.curr-zip-code"]),
                (document.getElementById("enroll-FirstName").value = reqpar["request-params"]["tl.first-name"] || ""),
                (document.getElementById("enroll-LastName").value = reqpar["request-params"]["tl.last-name"] || ""),
                (document.getElementById("enroll-DateOfBirth-Month").value = reqpar["request-params"]["tl.dobMonth"] || ""),
                (document.getElementById("enroll-DateOfBirth-Day").value = reqpar["request-params"]["tl.dobDay"] || ""),
                (document.getElementById("enroll-DateOfBirth-Year").value = reqpar["request-params"]["tl.dobYear"] || ""),
                (document.getElementById("enroll-EmailAddress").value = reqpar["request-params"]["tl.email-address"] || ""),
                (document.getElementById("enroll-Address-Current").value = reqpar["request-params"]["tl.curr-street1"] || ""),
                (document.getElementById("enroll-Address-Current2").value = reqpar["request-params"]["tl.curr-street2"] || ""),
                (document.getElementById("enroll-Address-Current3").value = reqpar["request-params"]["tl.curr-street3"] || ""),
                (document.getElementById("enroll-City-Current").value = reqpar["request-params"]["tl.curr-city"] || ""),
                (document.getElementById("enroll-Pin-Current").value = reqpar["request-params"]["tl.curr-zip-code"] || ""),
                (document.getElementById("enroll-Gender").value = reqpar["request-params"]["tl.gender"] || ""),
                (document.getElementById("enroll-State-Current").value = reqpar["request-params"]["tl.curr-state"] || ""),
                (document.getElementById("enroll-IdentifierID").value = reqpar["request-params"]["tl.identifierId"] || ""),
                (document.getElementById("enroll-Identity-Current").value = reqpar["request-params"]["tl.identifierName"] || ""),
                (document.getElementById("enroll-MobileTelephone").value = reqpar["request-params"]["tl.phoneNumber"] || ""));
        var w = ["enroll-FirstName", "enroll-LastName", "enroll-IdentifierID", "enroll-Identity-Current", "enroll-DateOfBirth-Day", "enroll-DateOfBirth-Month", "enroll-DateOfBirth-Year", "enroll-MobileTelephone", "enroll-EmailAddress"];
        for (var C in w)
            "" != $("#" + w[C]).val() &&
            $("#" + w[C])
            .attr("disabled", "true")
            .css("background-color", "#EBEBE4");
        var _ = window.location.href.indexOf("/additionalInfo.page") > 0 ? reqpar["request-params"]["tl.phoneNumberAU"] : reqpar["request-params"]["tl.phoneNumber"],
            x = window.location.href.indexOf("/additionalInfo.page") > 0 ? CCVD.rules["tl.phoneNumberAU"].regex : CCVD.rules["tl.phoneNumber"].regex;
        _.match(x) || $("#enroll-MobileTelephone").removeAttr("disabled").css("background-color", "white");
    }
    if (
        ($("#scorefactors").on("click", ".column h2", function() {
                $("#scorefactors .column").toggleClass("selected");
            }),
            $("#scorefactors").length > 0)
    ) {
        for ($("main section.credit-score p.score-details").appendTo("#mobilescore"), $("#mobilescore .scorebox .mobilescore").html(ud.scores[modelToUse].score), C = 0; C < scoreColors.length - 1; C++)
            ud.scores[modelToUse].score > scoreColors[C].value && $("#mobilescore .scorebox").css("background-color", scoreColors[C].color);
        if (
            ($.each(CCVD.gradeRanges[modelToUse], function(e, t) {
                    ud.scores[modelToUse].score > t.min && $("#mobilescore .scorebox .mobilerank").html(t.copy);
                }),
                "creditvision" !== modelToUse && ($(".factorcolumns").removeClass("creditvision"), $(".factorcolumns").addClass(modelToUse)),
                $(".has-score-analysis").show(),
                $(".no-score-analysis").hide(),
                data.factors.negative.length > 0)
        ) {
            if (
                ("en" !== sessionStorage.getItem("userLangPref") ?
                    ($(".intro").append(reasonCodeJson.intro[sessionStorage.getItem("userLangPref")]),
                        $.each(data.factors.negative, function(e) {
                            for (var t in reasonCodeJson[sessionStorage.getItem("userLangPref")])
                                if (reasonCodeJson[sessionStorage.getItem("userLangPref")][t].bureaucode === data.factors.negative[e].bureaucode) {
                                    (this.factor = reasonCodeJson[sessionStorage.getItem("userLangPref")][t].factor), (this.explanation = reasonCodeJson[sessionStorage.getItem("userLangPref")][t].explain);
                                    break;
                                }
                        })) :
                    ($(".intro").append("The factors impacting your score are listed below."),
                        $.each(data.factors.negative, function(e) {
                            (this.factor = this.factor.replace("explain: ", "")), (this.explanation = this.explanation.replace("factor: ", ""));
                        })),
                    (negativeFactorsSource = $("#negative-factors-template").html()),
                    DEBUG && console.info("Compile: negative-factors-template ..."),
                    (negativeFactorsTemplate = Handlebars.compile(negativeFactorsSource)),
                    (negativeFactorsHtml = negativeFactorsTemplate(data.factors)),
                    "undefined" !== negativeFactorsHtml && "" !== negativeFactorsHtml)
            ) {
                var P = negativeFactorsHtml.split("<div ");
                if (P.length > 3) {
                    negativeFactorsHtml = "<div " + P[1] + "<div " + P[2];
                    for (var C = 3; C < P.length; C++) negativeFactorsHtml.includes(P[C]) || (negativeFactorsHtml = negativeFactorsHtml + "<div " + P[C]);
                }
            }
            $(".factorcolumns .negative").html(negativeFactorsHtml);
        }
    }
    $("#resendNow").click(function() {
            $('input[name="tl.user-input-answer1"]').val(" "),
                $('input[name="tl.resendSelected"]').val("true"),
                $("form").submit(),
                showResendPoupup(),
                window.dataLayer.push({ event: "EventTracking", eventCategory: "Form Event FieldSelected Step Verify Identity - " + $("#qName").val() + " Form", eventAction: "ResendNow", eventLabel: "Resend OPT Selected" });
        }),
        $("#skipQuestion").click(function() {
            $('input[name="tl.answer-key-1"]').length > 0 ? $('input[name="tl.answer-key-1"]').css("border", "1px solid gray").prop("checked", !0) : $('input[name="tl.answer-key-2"]').prop("checked", !0),
                $('input[name^="tl.answer-key-"').each(function() {
                    $(this).is('input[name="tl.answer-key-1"') || $(this).attr("value", " ");
                }),
                $('input[name^="tl.user-input-answer"').each(function() {
                    $(this).is('input[name="tl.user-input-answer1"') || $(this).attr("value", " ");
                }),
                $('input[name^="tl.question-key-"').each(function() {
                    $(this).is('input[name^="tl.question-key-1"') || $(this).attr("value", " ");
                }),
                showLoading(),
                $('input[name="tl.skipSelected"]').val("true"),
                $("form").submit(),
                window.dataLayer.push({ event: "EventTracking", eventCategory: "Form Event FieldSelected Step Verify Identity - " + $("#qName").val() + " Form", eventAction: "SkipQuestion", eventLabel: "Skip Question Selected" });
        }),
        $("#offerCode").text("" !== reqpar["request-params"]["tl.offerDesc"] && "undefined" !== reqpar["request-params"]["tl.offerDesc"] ? reqpar["request-params"]["tl.offerDesc"] : analytics.offerCode),
        $("#offerAmount").text(reqpar["request-params"]["tl.offerPrice"]),
        $("#invoiceId").text(analytics.invoiceId);
    var A = reqpar["request-params"]["tl.offer-id"];
    if (window.location.href.indexOf("/enrollVerifyIdentity.page") > 0) {
        if (
            ($("#enrollVerifyIdentity")
                .find(".pageHeadingText")
                .before(
                    '<p class="hide setRegister pTitle">Set up new registration</p><ul class="steps" id="enrollSteps"><li class="glyphicons-keys"><span class="stepDetail">' +
                    localizedString("CreateAccount") +
                    '</span><span class="transform"></span></li><li class="glyphicons-shield active"><span class="stepDetail">' +
                    localizedString("VerifyIdentity") +
                    '</span></li><li class="glyphicons-credit-card"><span class="stepDetail">' +
                    localizedString("Payment") +
                    "</span></li></ul>"
                ),
                $("#question1").length > 0)
        ) {
            var D = $("#question1, #question2, #question3, #question4, #question5, #question6, #question7, #question8, label, input");
            D.attr("data-hj-suppress", "");
        }
        "IDM_KBA_Queue" === $("#qName").val() || "IDM_QnA_AGLib__KBA" === $("#qName").val() ? ($(".KBAText").show(), $(".alternativeEmailLabel").length > 0 && $(".alternativeEmailLabel").remove()) : $(".KBAText").hide();
    }
    if (
        (window.location.href.indexOf("/identityVerify.page") > 0 &&
            (("OTP_AlternateEmail_Entry_Queue" !== document.getElementById("qName").value &&
                    "IDM_PairDeviceQueue" !== document.getElementById("qName").value &&
                    "IDM_KBA_Queue" !== document.getElementById("qName").value &&
                    "IDM_QnA_AGLib__KBA" !== document.getElementById("qName").value &&
                    "false" != $("#resendDiv").attr("value")) ||
                $("#resendDiv").remove(),
                $("#skipDiv").length > 0 && "OTP_AlternateEmail_Entry_Queue" !== document.getElementById("qName").value && $("#skipDiv").remove(),
                ("IDM_KBA_Queue" !== document.getElementById("qName").value && "IDM_QnA_AGLib__KBA" !== document.getElementById("qName").value) ||
                ("hi" === sessionStorage.getItem("userLangPref") ?
                    $(".identityHeader").html(
                        '<p class="pageHeadingText">पहचान सत्यापन प्रक्रिया पूरी करने के लिए हमें आपसे बस कुछ और जानकारी की ज़रूरत है.</p><p class="pageText">कृपया नीचे दिए गए सभी प्रश्नों के उत्तर दें और आगे बढ़ने के लिए “जारी रखें” दबाएँ</p>'
                    ) :
                    "ta" === sessionStorage.getItem("userLangPref") ?
                    $(".identityHeader").html(
                        '<p class="pageHeadingText">அடையாள சரிபார்ப்பு செயல்பாட்டை முடிப்பதற்கு எங்களுக்கு உங்களிடமிருந்து சில கூடுதல் தகவல்கள் தேவைப்படுகின்றன.</p><p class="pageText">தொடர்வதற்கு தயவுசெய்து கீழே உள்ள அனைத்துக் கேள்விகளுக்கும் பதிலளித்துவிட்டு "தொடரவும்"-ஐத் தட்டவும்.</p>'
                    ) :
                    "te" === sessionStorage.getItem("userLangPref") ?
                    $(".identityHeader").html(
                        '<p class="pageHeadingText">గుర్తింపు నిర్ధారణ ప్రక్రియను పూర్తిచేసేందుకు మాకు మీనుండి కొంత అదనపు సమాచారం అవసరం.</p><p class="pageText">దయచేసి కింద ఇచ్చిన అన్నిప్రశ్నలకు సమాధానాలు ఇచ్చి, కొనసాగేందుకు .</p>'
                    ) :
                    "be" === sessionStorage.getItem("userLangPref") ?
                    $(".identityHeader").html(
                        '<p class="pageHeadingText">পরিচয় যাচাই প্রক্রিয়াটি সম্পূর্ণ করতে আমাদের কেবল আপনার কাছ থেকে কিছু অতিরিক্ত তথ্য লাগবে। অনুগ্রহ করে নীচের </p><p class="pageText">যাবতীয় প্রশ্নের উত্তর দিন এবং অগ্রসর হতে "চালিয়ে যান" টিপুন।</p>'
                    ) :
                    $(".identityHeader").html(
                        '<p class="pageHeadingText">We just need some additional information from you to complete the identity verification process</p><p class="pageText">Please answer all the questions below and hit "Continue" to proceed.</p>'
                    ),
                    $(".alternativeEmailLabel").length > 0 && $(".alternativeEmailLabel").remove())),
            "CIBIL" != currentEnterprise() && window.location.href.indexOf("/enrollVerifyIdentity.page") > 0 && ($(".register-content, .setRegister").show(), $("main section.enroll").css("padding-top", "30px")),
            window.location.href.indexOf("/enrollVerifyIdentity.page") > 0 || window.location.href.indexOf("/identityVerify.page") > 0)
    ) {
        if (
            (("OTP_IDM_Mobile_Queue" !== document.getElementById("qName").value && "OTP_IDM_Email_Queue" !== document.getElementById("qName").value && "OTP_IDM_AlternateEmail_Queue" !== document.getElementById("qName").value) ||
                (!$("#resendDiv").length > 0 && $("form").append('<input value="false" name="tl.resendSelected" type="hidden">')),
                "OTP_AlternateEmail_Entry_Queue" === document.getElementById("qName").value &&
                (r(),
                    $(".maskedValue").each(function() {
                        $(this).text().match(/@/) ? $(this).addClass("emailAddress") : $(this).addClass("mobileNumber");
                    }),
                    $(".maskedValue").text().match(/\*/) ?
                    ($(".questionTitle").remove(),
                        $('div[id^="question"')
                        .last()
                        .after('<br><p class="bold emailLabel">' + localizedString("creditReport_CI_EmailAddresses") + ":</p>"),
                        $("#question1").length > 0 ?
                        $("#question1").before('<br><p class="bold cellLabel">' + localizedString("creditReport_CI_CellPhone") + ":</p>") :
                        $("#question2").before('<br><p class="bold cellLabel">' + localizedString("creditReport_CI_CellPhone") + ":</p>"),
                        $(".emailAddress").parent("div").insertAfter($(".emailLabel")),
                        $(".emailAddress").length <= 0 ? $(".emailLabel").remove() : "",
                        $(".mobileNumber").length <= 0 ? $(".cellLabel").remove() : "",
                        $('input[name^="tl.answer-key-"]').click(function() {
                            $(this).is(":checked") && ($('input[name^="tl.answer-key-"]').removeClass("error"), $(".answerkey3").hide(), $('input[name^="tl.answer-key-"]').not(this).prop("checked", !1));
                        }),
                        $("#enroll-Submit").click(function() {
                            $('input[name^="tl.answer-key-"]').is(":checked") ?
                                ($("#answerkey3").hide(),
                                    $('input[name^="tl.answer-key-"').each(function() {
                                        $(this).is(":checked") ?
                                            ($(this).removeClass("error required"),
                                                $(this).siblings("input").addClass("selected"),
                                                $(this).is($('input[name="tl.answer-key-1"')) ||
                                                ($('input[name="tl.answer-key-1"').val(" ").addClass("selected"),
                                                    $('input[name="tl.question-key-1"').val(" ").addClass("selected"),
                                                    $('input[name="tl.user-input-answer1"').val(" ").addClass("selected"),
                                                    $('input[name="tl.answer-key-1"').css("border", "1px solid gray").prop("checked", !0))) :
                                            $(this).removeClass("required error");
                                    }),
                                    $('input[name^="tl.user-input-answer"').each(function() {
                                        $(this).hasClass("selected") || $(this).remove();
                                    }),
                                    $('input[name^="tl.question-key-"').each(function() {
                                        $(this).hasClass("selected") || $(this).remove();
                                    })) :
                                ($(".answerkey3 .helper").addClass("error").text(localizedString("creditReport_SelectOption")), $(".answerkey3").show());
                        })) :
                    ($(".alternativeEmailLabel").remove(), $(".questionTitle").show())),
                "AccountDetail_Queue" === document.getElementById("qName").value)
        ) {
            $("#question1").append('<input value="false" name="tl.skipSelected" type="hidden">'), $("#question3 input.required").removeClass("required");
            $('input[name^="tl.user-input-answer"').blur(function() {
                var e = $(this).val(),
                    t = $(this).attr("id"),
                    r = $(this);
                !(e.length >= 4) &&
                e.length > 0 &&
                    ($(this).addClass("error"),
                        $(this).siblings(".helper").text(localizedString("creditReport_validAccount")),
                        $("input.error").siblings(".helper").addClass("error").show(),
                        (document.getElementById("enroll-Submit").style.pointerEvents = "none")),
                    e.length >= 4 &&
                    $("input[name^='tl.user-input-answer']").each(function() {
                        if (t !== this.id && e.toLowerCase() == this.value.toLowerCase()) {
                            var n = localizedString("creditReport_MultipleAccount");
                            r.addClass("error"), r.siblings(".helper").text(n), $("input.error").siblings(".helper").addClass("error").show(), (document.getElementById("enroll-Submit").style.pointerEvents = "none");
                        }
                    }),
                    $(".required").hasClass("error") || (document.getElementById("enroll-Submit").style.pointerEvents = "auto");
            });
        }
        if ("OTP_IDM_AlternateEmail_Queue" === document.getElementById("qName").value) {
            var I = [],
                E = [],
                B = [];
            findKeyNewArray(reqpar["request-params"], "user-input", I), findKeyNewArray(reqpar["request-params"], "question-key", E), findKeyNewArray(reqpar["request-params"], "answer-key", B);
            for (var C = 0; C < I.length; C++) "tl.user-input-answer1" !== I[C] && $(".form-fields").append('<input type="hidden" name="' + I[C] + '" value=" ">');
            for (var C = 0; C < E.length; C++) "tl.question-key-1" !== I[C] && $(".form-fields").append('<input type="hidden" name="' + E[C] + '" value=" ">');
            for (var C = 0; C < B.length; C++) "tl.answer-key-1" !== I[C] && $(".form-fields").append('<input type="hidden" name="' + B[C] + '" value=" ">');
        }
        $('input[name^="tl.user-input-answer"').length > 0 && "AccountDetail_Queue" !== document.getElementById("qName").value && $('input[name^="tl.user-input-answer"').attr("onkeypress", "return isNumberKey(event);");
    }
    if (($("#enrollSteps").length > 0 && n(), "undefined" != typeof CCVD.queryString().print)) {
        $(".flow-section-toggle").hide(),
            $(".flow-section-container").css("padding-left", "0%"),
            $("#TU-Report").show(),
            $("#CR-Personal").show(),
            $("#CR-Contact").show(),
            $("#CR-Employment").show(),
            $("#CR-Accounts").show(),
            $("#CR-Enquiries").show(),
            $("#CR-Dispute").show(),
            $("#TU-Reportone").show(),
            $(".creditReportSinglePage").show(),
            "true" == CCVD.queryString().print && $(".frow.data-row").addClass("is-active"),
            $(".payment-status-wrapper").show(),
            $(".flow-page-toggle").hide(),
            $(".controlNo").hide();
        new Date();
        $(".flow-section-inner")
            .first()
            .prepend(
                '<div class="sp-score-content"><div class="section-title-blue">' +
                localizedString("CIBILScore") +
                '</div><div class="sp-score-wrapper"><div class="sp-score">' +
                (0 == scoreInNumeric ? "NA" : 1 == scoreInNumeric ? "NH" : ud.scores.creditvision.score) +
                '</div><div class="sp-score-txt"></div></div></div>'
            ),
            $("#CreditReports:not(.disputeWrapper) .flow-section-inner")
            .first()
            .prepend("<div class='pageTextSmall webTokenhide'>" + localizedString("Date") + ud.scores.creditvision.date + " </div>"),
            $("#CreditReports:not(.disputeWrapper) .flow-section-inner")
            .first()
            .prepend("<div class='pageTextSmall webTokenhide'>" + localizedString("ControlNumber") + Number(ud.reportstu.ReferenceKey.CIBIL).toLocaleString("en") + " </div>"),
            $("#CreditReports:not(.disputeWrapper).flow-section-inner")
            .first()
            .prepend(
                "false" !== CCVD.queryString().print ?
                "<div class='pageTextSmall'>" +
                localizedString("ControlNumber") +
                Number(ud.reportstu.ReferenceKey.CIBIL).toLocaleString("en") +
                "<div class='sp-con-num'>" +
                localizedString("Superscript-Desc") +
                "</div></div>" :
                "<div class='pageTextSmall'>" + localizedString("ControlNumber") + Number(ud.reportstu.ReferenceKey.CIBIL).toLocaleString("en") + "</div>"
            ),
            $("#disputeHeaderInstructions").prepend("<div class='pageTextSmall'>" + localizedString("Date") + ud.scores.creditvision.date + " </div>"),
            $("#disputeHeaderInstructions").prepend(
                "false" !== CCVD.queryString().print ?
                "<div class='pageTextSmall'>" + localizedString("ControlNumber") + Number(ud.reportstu.ReferenceKey.CIBIL).toLocaleString("en") + "<div class='sp-con-num'>" + localizedString("Superscript-Desc") + "</div></div>" :
                "<div class='pageTextSmall'>" + localizedString("ControlNumber") + Number(ud.reportstu.ReferenceKey.CIBIL).toLocaleString("en")
            ),
            $(".superscript-desc").hide(),
            $("#CreditReports:not(.disputeWrapper) .flow-section-inner")
            .first()
            .prepend("<h2 class='webTokenhide'>" + localizedString("CIBILScoreReport") + "</h2>"),
            $("#disputeHeaderInstructions").prepend("<h2>" + localizedString("CIBILScoreReport") + " </h2>"),
            $(".printLink").hide(),
            $(".refreshalert").hide(),
            $(".CibilVideo").parent().hide(),
            $(".flow-section-inner").css("min-height", "0"),
            $(".payment-status-table").show(),
            "true" === CCVD.queryString().print ? $("#CR-Accounts-CreditRevolving").css("border", "solid 1.5px #EAEAEA") : $("#CR-Accounts-CreditRevolving").css("border", "none"),
            $(".flow-section-container").css("min-height", "0"),
            $(".flow-section-inner").css("border-left", "none"),
            $("#CreditReports:not(.disputeWrapper) .flow-section-inner").css("border-bottom", "solid 2px #EAEAEA"),
            $("#CreditReports:not(.disputeWrapper) .flow-section-inner").css("margin-left", "20px"),
            $(".flow-section-inner").css("padding", "0px"),
            $("#CreditReports:not(.disputeWrapper) .flow-section-inner").css("margin-right", "33px"),
            $("#CreditReports:not(.disputeWrapper) .flow-section-inner").css("padding-bottom", "33px"),
            $("#flow-section-inner-div").removeClass("flow-section-inner"),
            $("#flow-section-inner-div").addClass("flow-section-inne-sp"),
            $("#flow-section-inner").last().css("border-bottom", "none"),
            "true" === CCVD.queryString().print ? $(".report-cell-inner").css("border", "none") : $(".report-cell-inner").css({ border: "solid 1.5px #EAEAEA", "margin-bottom": "20px" }),
            $(".tfoot").css("text-align", "left"),
            $(".tfoot").css("margin-right", "20%"),
            $("#TU-Report").css("border-top", "none"),
            $(".account-data-selectors").hide(),
            $(".tactical-links").hide(),
            $(".menu-links").hide(),
            $(".support").hide(),
            $(".byline").hide(),
            $(".nav-links").css("box-shadow", "none"),
            $(".nav-links").css("margin", "0"),
            void 0 != reqpar["request-params"]["tl.productWebToken"] ?
            ($("body, footer").css({ "background-color": "#ffffff" }),
                $("#CR-Employment .report .report-table .thead").prepend('<p class="pTitle webTokenShow">Employment Data</p>'),
                $("#CR-Accounts .report").prepend('<p class="pTitle webTokenShow">Accounts</p>'),
                $("#CR-Enquiries .report").prepend('<p class="pTitle webTokenShow">Enquiry Summary</p>'),
                $("#CR-Dispute .dispute").prepend('<p class="pTitle webTokenShow">Dispute Summary</p>'),
                $(".webTokenShow").show(),
                $("#CreditReports:not(.disputeWrapper) .section-title").css({ "font-weight": "300", "font-size": "24px", "padding-left": "15px" }),
                $("#CreditReports:not(.disputeWrapper) .flow-section-inner").css({ "margin-top": "30px", "border-bottom": "none" }),
                $("#CreditReports:not(.disputeWrapper) .flow-section-inne-sp").css({ "border-bottom": "none" }),
                $(".inquiries-table").css({ "padding-left": "15px" }),
                $(".flow-section-container").css("border-bottom", "solid 5px #EAEAEA"),
                $(".report-table,.report-account-table .fcell, .report-account-table .fhcell, .report-table .fcell, .report-table .fhcell").css({ border: "none" }),
                $(".report-table .tbody").css({ border: "1px solid #efefef" }),
                $(".report-table .thead").css({ "margin-bottom": "15px" }),
                $(".report-account-table .account-row .fcell, .report-account-table .account-row .fhcell, .report-table .report-row:nth-child(odd)").css({ background: "#f5f5f5" }),
                $(".superscript-desc-google,.sp-copyright").hide(),
                $(".superscript-desc-webtoken,.sp-copyright-webtoken").show(),
                $(".prsnalInfoTitle").parent().addClass("personalDetails"),
                $(".fhnoborder-table").css({ "padding-top": "0" }),
                $(".modal-trigger,.report-account-table .account-row .fcell:first-child>div,.report-account-table .account-row .fhcell:first-child>div").addClass("removeModal"),
                $("#modals").remove(),
                $("main .chart-widgets").css({ margin: "0" }),
                $(".pr-report").css({ "margin-top": "0" }),
                $("#CR-Dispute").css({ "border-bottom": "none" }),
                $(".alertmessage").addClass("disputePending"),
                $(".alertmessage .inner-section-alert").text("Dispute pending"),
                $(".alertmessage .inner-section-alert").next("br").remove()) :
            ($("#CreditReports:not(.disputeWrapper) .section-title").css({ color: "#5cbae9", "font-weight": "500" }), $(".sp-copyright").show()),
            $("account-row").css("cursor", "auto"),
            $(".nav-links .menu").hide();
        var O = getScoreText();
        $(".sp-score-txt").html(O),
            (reqpar["request-params"]["tl.dbGender"] = ud.reportstu.Gender.CIBIL),
            "true" === CCVD.queryString().print && void 0 == reqpar["request-params"]["tl.productWebToken"] ? $(".sp-score-content").css("display", "block") : $(".sp-score-content").css("display", "none"),
            "false" === CCVD.queryString().print ?
            $(".sp-copyright").prepend(
                '<div class="button-section"><span> <button type="button" class="button" id="dispButton" onclick="disputeAgreementPopup();">' +
                localizedString("Dispute_DisputeSubmit") +
                '</button> <span></span><div id="reset"><a href="javascript:window.location.reload();"><span class="link">' +
                localizedString("Dispute_DisputeReset") +
                '</span></a></div><span class="backToReport"><a href="/CreditView/creditreport.page?enterprise=' +
                reqpar["request-params"]["tl.partner"] +
                '"><span class="link">' +
                localizedString("Dispute_DisputeBack") +
                "</span></a></span></div>"
            ) :
            "";
    }
    var k = $("#deCityList");
    if ((k.empty(), window.location.href.indexOf("dashboard.page") > -1 || window.location.href.indexOf("loanOffers.page") > -1 || window.location.href.indexOf("/interstitialLoanOffers.page") > -1))
        for (var L in cities) k.append('<option value="' + cities[L].name + '"></option>');
    if (($(".tab-content-mobile").find("div.tab-pane").addClass("active"), $(".creditReportSinglePage").length > 0 && $(".img-header").show(), window.location.href.indexOf("support.page") > -1 && "HDFCBANK" === currentEnterprise())) {
        var T = urlParam("noOffers");
        "true" === T &&
            ($("div[rel=credit-basics]").addClass("is-active").siblings(".flow-section-toggle").removeClass("is-active"), $("#credit-basics").addClass("is-active").siblings(".flow-section-container").removeClass("is-active"));
    }
    var R = "";
    (R = "undefined" != typeof siteInfo ? siteInfo.WebDomain : sessionStorage.getItem("siteInfoWebDomain")),
    "" !== R &&
        null !== R &&
        "HDFCBANK" === currentEnterprise() &&
        $("div.nav-links img").click(function(e) {
            window.open(R, "_blank");
        });
});
var dontShowIDInsuranceTab = ["SB1", "SB1A", "SB1B", "SB3", "SB3A", "SB5", "SB5A", "SB5B"];
if (
    ("undefined" != typeof analytics.offer && dontShowIDInsuranceTab.indexOf(analytics.offer) > -1 && $("#theft-insurance-content").hide(),
        hasSB7 ? ($('.flow-section-toggle[rel="Security-Freeze"]').remove(), $("#id-protection").addClass("has-sb7")) : ($('.flow-section-toggle[rel="Credit-Lock"]').remove(), $('.flow-section-toggle[rel="Child-Monitoring"]').remove()),
        "undefined" != typeof failureInfo && "ASSET_EXPIRED" == failureInfo.reason && $(".expiredBreachProduct").show(),
        $("#tmpl_SiteInfo").length > 0)
) {
    var source = $("#tmpl_SiteInfo").html();
    DEBUG && console.info("Compile: tmpl_SiteInfo ...");
    var template = Handlebars.compile(source);
    $(".main-content").append(template(siteInfo));
}
($.urlParam = function(e) {
    var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
    return null == t ? null : decodeURI(t[1]) || 0;
})
var offer_Id = "";
$('.x-axis-label').hide();

$(document).ready(function() {
    setTimeout(function(){
        $("circle.inner").click(function(){
            $(this).siblings().removeAttr("big")
            $(this).attr("big","true")
            $(this).prev().attr("big","true")
        });
        $("circle.outer").click(function(){
            $(this).siblings().removeAttr("big")
            $(this).attr("big","true")
            $(this).next().attr("big","true")
        });
        $('circle.inner.data5').click()
    },100)
})
