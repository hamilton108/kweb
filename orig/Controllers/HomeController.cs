#define KDO_NO_LOGONx
#define KDO_ELKEMx
#define KDO_HOME_VAKTBOKx
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using KDO.ShiftManagerMVC.Models;
using System.Text;
using System.Web.UI.WebControls;
using KDO.ShiftManagerMVC.Helpers;
using System.Threading;

namespace KDO.ShiftManagerMVC.Controllers
{
    public class HomeController : BaseController
    {
        public static Dictionary<string, JsonUserInfo> userAuth = new Dictionary<string, JsonUserInfo>();

        public HomeController()
        {
            var appSettings = System.Configuration.ConfigurationManager.AppSettings;
            
        }

        public ActionResult SetCulture(string culture)
        {
            // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);
            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
                cookie.Value = culture;   // update cookie value
            else
            {
                cookie = new HttpCookie("_culture");
                cookie.Value = culture;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);
            return RedirectToAction("Index");
        }

        public JsonResult GetCulture()
        {
            string ret = "no";
            // Validate input
            string culture = CultureHelper.GetCurrentCulture();
            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
                culture = cookie.Value; // get cookie value

            if (culture.ToLower().Contains("en"))
                ret = "en";

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        private void SetViewDataFor(string userId, int activeIndex, bool setMessageCount = false)
        {
            ViewData["userid"] = userId;
            ViewData["activeIndex"] = activeIndex;
            if (setMessageCount == true)
            {
                var info = userAuth[userId];
                ViewData["msgCount"] = MessageCenterModel.MessageCount(userId, info.personId);
            }
        }

        #region Access control

        #region Access level

        private void SetNavBarAccess(JsonUserInfo info)
        {
            ViewBag.WebCalendarAL = 0;
            ViewBag.WebAjRequestAL = 0;
            ViewBag.WebAvailabilityAL = 0;
            ViewBag.WebContractsAL = 0;
            ViewBag.WebDesiredWatchesAL = 0;
            ViewBag.WebFlexiAL = 0;
            ViewBag.WebMessageCenterAL = 0;
            ViewBag.WebPersonInfoAL = 0;
            ViewBag.WebRestTimeApproveAL = 0;
            ViewBag.WebRestTimeAL = 0;
            ViewBag.WebSalaryPeriodsAL = 0;
            ViewBag.WebVacantWatchesAL = 0;
            ViewBag.WebTidRegAL = 0;
            if (CommonModel.GetLicenseFor(16) == true && info.hasTidReg)
                ViewBag.WebTidRegAL = 2;

            if (info.webaccesslevel != null)
            {
                if (info.webaccesslevel.ContainsKey(95))
                    ViewBag.WebCalendarAL = info.webaccesslevel[95];
                if (info.webaccesslevel.ContainsKey(306))
                    ViewBag.WebAjRequestAL = info.webaccesslevel[306];
                if (info.webaccesslevel.ContainsKey(98))
                    ViewBag.WebAvailabilityAL = info.webaccesslevel[98];

                //Added
                if (info.webaccesslevel.ContainsKey(318))
                    ViewBag.WebContractsAL = info.webaccesslevel[318];
                if (info.webaccesslevel.ContainsKey(97))
                    ViewBag.WebDesiredWatchesAL = info.webaccesslevel[97];

                //Added
                if (info.webaccesslevel.ContainsKey(316))
                    ViewBag.WebFlexiAL = info.webaccesslevel[316];
                //Added
                if (info.webaccesslevel.ContainsKey(317))
                    ViewBag.WebMessageCenterAL = info.webaccesslevel[317];

                if (info.webaccesslevel.ContainsKey(94))
                    ViewBag.WebPersonInfoAL = info.webaccesslevel[94];
                //Added
                if (info.webaccesslevel.ContainsKey(320))
                    ViewBag.WebRestTimeApproveAL = info.webaccesslevel[320];
                //Added
                if (info.webaccesslevel.ContainsKey(319))
                    ViewBag.WebRestTimeAL = info.webaccesslevel[319];

                if (info.webaccesslevel.ContainsKey(100))
                    ViewBag.WebSalaryPeriodsAL = info.webaccesslevel[100];
                if (info.webaccesslevel.ContainsKey(96))
                    ViewBag.WebVacantWatchesAL = info.webaccesslevel[96];
            }
        }

        #endregion Access level


        #endregion Access control

        #region Authorization Utils 
        //---------------- 12 timers toleranse -----------------------
        private static long ObfuscatedTimeTolerance = 3 * 60 * 60 * 7;
        private static long ObfuscateTimeSeconds()
        {
            TimeSpan span = DateTime.Now.Subtract(new DateTime(1970, 1, 1, 0, 0, 0));
            var result = Convert.ToInt64(span.TotalSeconds * 7);
            return result;
        }
        public static bool IsPass(string obfuscatedTimeString)
        {
            var curTime = ObfuscateTimeSeconds();
            var removeRight = obfuscatedTimeString.Remove(obfuscatedTimeString.Length - 8);
            var timeStr = removeRight.Substring(8);
            var origTime = Int64.Parse(timeStr);
            return origTime + ObfuscatedTimeTolerance - curTime > 0;
        }
        #endregion

        #region Authorization
        public bool AuthenticateUser(string userid, string password)
        {
            var login = new Security.clsLogin();
            return login.UserLogin(userid, password);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Auth(FormCollection formParams)
        {
            string userId = formParams["userid"];
            string password = formParams["password"];
            string isVaktbok = formParams["vaktbok"];
            string isTidreg = formParams["tidreg"];

            if (AuthenticateUser(userId, password))
            {
                CommonModel.WebReasonCodes = null; 
                var userInfo = PersonInfoModel.UserInfoFor(userId, isVaktbok != null);
                userAuth[userId] = userInfo;
                SetNavBarAccess(userInfo);
                if (isVaktbok == null) //&& isTidreg == null)
                {
                    //SetViewDataFor(userId, 1, true);
                    //return View("Calendar", null);
                    //Licence for tidreg and user has tidreg.
                    if (CommonModel.GetLicenseFor(16) == true && userInfo.hasTidReg)
                        return RedirectToAction("Index", "Tidreg", new { userid = userId });
                    else
                        return RedirectToAction("Index", "Calendar", new { userid = userId });
                }
                else
                {
                    
                    if (userInfo.hasVaktbok == true && isVaktbok != null)
                    {
                        return RedirectToAction("Index", "Vaktbok", new { userid = userId });
                    }
                    else if (userInfo.hasTidReg == true && isTidreg != null)
                    {
                        return RedirectToAction("Index", "Tidreg", new { userid = userId });
                    }
                    else
                    {
                        return RedirectToAction("Index", "Calendar", new { userid = userId });
                    }

                }
            }
            else
            {
                var view = View("Index");
                view.ViewData["auth"] = "1";
                //ViewData["vaktbok"] = "1";
                ViewData["vaktbok"] = CommonModel.GetLicenseFor(14) == true ? "1" : "0";
                ViewData["tidreg"] = CommonModel.GetLicenseFor(16) == true ? "1" : "0";
                return view;
            }
        }

        public ActionResult AuthView(string userid, string viewName, int activeIndex)
        {
            if (userAuth.ContainsKey(userid) == false)
            {
                return LoginView();
            }
            else
            {
                SetViewDataFor(userid, activeIndex);
                return View(viewName, null);
            }
        }
        #endregion

        #region ActionResult
        public ActionResult Index()
        {
#if KDO_NO_LOGON
#if KDO_ELKEM
            var userId = "KaiDan";
            ViewData["userid"] = userId;
            ViewData["msgCount"] = 0;
            ViewData["activeIndex"] = 8; 
            var userInfo = new JsonUserInfo()
            {
                firstName = "Kai",
                lastName = "Danesesen",
                orgName = "Avdeling 1/1020",
                personId = 72
            };
#else
            var userId = "KaiDan"; // "LaiFra1"; // "KaiDan"; //"AndOpp";
            ViewData["userid"] = userId;
            ViewData["msgCount"] = 0;
            ViewData["activeIndex"] = 9; 
            var userInfo = new JsonUserInfo()
            {
                firstName = "Kai", //"And",
                lastName = "Danesen", //"Opp",
                orgName = "Avdeling 1/Hjelpepleier",
                personId = 72 // 4132 //72 //22
            };
#endif
            userAuth[userId] = userInfo;
            //return RedirectToAction("Index", "Contracts", new { userid = userId });
            //return RedirectToAction("Index", "Vaktbok", new { userid = userId });
            //return RedirectToAction("Index", "VacantWatches", new { userid = userId });
            //return RedirectToAction("Index", "Calendar", new { userid = userId });
            //return RedirectToAction("Index", "AjourholdRequest", new { userid = userId });
            //return RedirectToAction("Index", "Flexi", new { userid = userId });
            //return RedirectToAction("Index", "Freeloaders", new { userid = userId });
            return RedirectToAction("Index", "MessageCenter", new { userid = userId });
#else
            ViewData["auth"] = "0";

            ViewData["vaktbok"] = CommonModel.GetLicenseFor(14) == true ?  "1" : "0";
            ViewData["tidreg"] = CommonModel.GetLicenseFor(16) == true ? "1" : "0";
            return View("Index");
#endif
        }

        public  ActionResult LoginView()
        {
            ViewData["auth"] = "0";
            //ViewData["vaktbok"] = "1";
            ViewData["vaktbok"] = CommonModel.GetLicenseFor(14) == true ? "1" : "0";
            ViewData["tidreg"] = CommonModel.GetLicenseFor(16) == true ? "1" : "0";
            return View("Index",null);
        }
        public ActionResult Logout(string userid)
        {
            if (userAuth.ContainsKey(userid))
            {
                userAuth.Remove(userid);
            }
            return LoginView();
        }


        //public ActionResult PersonInfo(string userid)
        //{
        //    return AuthView(userid, "PersonInfo", 9);
        //}
        //public ActionResult MessageCenter(string userid)
        //{
        //    return AuthView(userid, "MessageCenter", 10);
        //}

        //public ActionResult Calendar(string userid)
        //{
        //    return AuthView(userid, "Calendar", 2);
        //}
        //public ActionResult Flexi(string userid)
        //{
        //    return AuthView(userid, "Flexi", 7);
        //}
        //public ActionResult Ajourhold(string userid)
        //{
        //    return AuthView(userid, "Ajourhold", 8);
        //}
        //public ActionResult VacantWatches(string userid)
        //{
        //    return AuthView(userid, "VacantWatches", 3);
        //}
        //public ActionResult DesiredWatches(string userid)
        //{
        //    return AuthView(userid, "DesiredWatches", 4);
        //}
        //public ActionResult SalaryPeriods(string userid)
        //{
        //    return AuthView(userid, "SalaryPeriods", 6);
        //}
        //public ActionResult Availability(string userid)
        //{
        //    return AuthView(userid, "Availability", 5);
        //}
        //public ActionResult Vaktbokdag(string userid)
        //{
        //    return AuthView(userid, "Vaktbokdag", 1);
        //}
        #endregion

        #region JSON/Rest 
        public JsonResult ChangePassword(string userid, string oldp, string newp)
        {
            if (userAuth.ContainsKey(userid))
            {
                var info = userAuth[userid];
                int result = PersonInfoModel.UpdatePassword(userid, newp);
                if (result == 0)
                {
                    return Json(new JsonStatusMsg() { ok = true, msg = "Passord endret!" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new JsonStatusMsg() { ok = true, msg = "Passord endret!" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }

        //public JsonResult PersonInfoFor(string userid)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        var result = PersonInfoModel.PersonInfoFor(info.personId);
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //public JsonResult UpdateNextOfKin(string userid, JsonNextOfKin param)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        var result = PersonInfoModel.UpdateNextOfKin(info.personId, param);
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //public JsonResult AddNextOfKin(string userid, JsonNextOfKin param)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        var result = PersonInfoModel.AddNextOfKin(info.personId, param);
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        //public JsonResult DeleteNextOfKin(string userid, long kinid)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        var result = PersonInfoModel.DeleteNextOfKin(info.personId, kinid);
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //public JsonResult UpdateContactInfo(string userid, JsonContactInfo param)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        var result = PersonInfoModel.UpdateContactInfo(info.personId, param);
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //public JsonResult SaveMessageCenter(SaveMessageCenterDTO jsonInput)
        //{
        //    if (userAuth.ContainsKey(jsonInput.userId))
        //    {
                
        //        var info = userAuth[jsonInput.userId];
        //        jsonInput.personId = info.personId;
        //        AjourholdModel ajourholdModel = new AjourholdModel();
        //        //Privat vaktbytte settes til årsaksid -1
        //        if (jsonInput.msgType == 512 && jsonInput.reason == 0)
        //            jsonInput.reason = -1;
        //        var jsonStatus = ajourholdModel.SaveMessageCenter(jsonInput);
        //        return Json(jsonStatus, JsonRequestBehavior.AllowGet);
                
        //        //return Json(new JsonStatusMsg() { ok = true, msg = "Request sent" }, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //public JsonResult CoverFor(int workPlace, string userid, string dateFrom, string dateTo)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        AjourholdModel ajourholdModel = new AjourholdModel();
        //        var result = ajourholdModel.CoverFor(workPlace, info.personId, dateFrom, dateTo);
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        //*

        public JsonResult WebReasonCodes()
        {
            var result = CommonModel.WebReasonCodes;
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult WebReasonCodesFor(int ajourTypeId)
        {
            var webReasons = CommonModel.WebReasonCodes;
            return Json(webReasons[String.Format("r{0}", ajourTypeId)], JsonRequestBehavior.AllowGet);
        }
        //*/
        public JsonResult WorkPlaces(string userid)
        {
            if (userAuth.ContainsKey(userid))
            {
                var info = userAuth[userid];
                var workPlaces = CommonModel.WorkPlaces(info.personId);

                return Json(workPlaces, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult WorkPlacesForWatchBook(string userid)
        {
            if (userAuth.ContainsKey(userid))
            {
                var info = userAuth[userid];
                var workPlaces = CommonModel.WorkPlacesForWatchBook(userid);

                return Json(workPlaces, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }
        
        //public JsonResult InitData(string userid)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];

        //        var reasons = CommonModel.WebReasonCodes;

        //        var workPlaces = CommonModel.WorkPlaces(info.personId);

        //        var hbank = CommonModel.HourBankSum(info.personId);

        //        var vac = SalaryPeriodModel.VacationDaysFor(info.personId);
        //        var result = new JsonInitData()
        //        {
        //            userId = userid,
        //            workPlaces = workPlaces,
        //            saldo = hbank,
        //            reasonCodes = reasons,
        //            vacation = vac
        //        };

        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        //public JsonResult WatchesFor(int messageType, int workPlace, string userid, string dateFrom, string dateTo)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        AjourholdModel ajourholdModel = new AjourholdModel();
        //        var result = ajourholdModel.WatchesFor(messageType, workPlace, info.personId, dateFrom, dateTo);

        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        //public JsonResult WatchesForSwapTo(int workPlace, string userid, string dateFrom, string dateTo)
        //{
        //    if (userAuth.ContainsKey(userid))
        //    {
        //        var info = userAuth[userid];
        //        AjourholdModel ajourholdModel = new AjourholdModel();
        //        var result = ajourholdModel.WatchesForSwapTo(workPlace, info.personId, dateFrom, dateTo);
        //        return Json(result, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
        //    }
        //}
        #endregion

        #region Vaktbokdag
        /*
        private static Dictionary<string, List<VaktbokDagInfo>> _items = new Dictionary<string, List<VaktbokDagInfo>>();
        private void SetVaktbok(string userid)
        {
            var info = userAuth[userid];
            VaktbokModel vaktbokModel = new VaktbokModel();
            var result = vaktbokModel.GetVaktbok(info, userid, DateTime.Today, false);
            _items[userid] = result;
            ViewData["vaktbokitems"] = result;
            ViewData["title"] = String.Format("VAKTBOK {0}", DateTime.Today.ToString("dd.MM.yyyy"));
            ViewData["userid"] = userid;
        }
        */

#if KDO_HOME_VAKTBOK_IMPL

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Vaktbokdag(FormCollection formParams)
        {
            string userid = formParams["userid"];
            string password = formParams["password"];

            if (vaktbokModel.AuthenticateUser(userid, password))
            {
                var info = userAuth[userid];
                var result = vaktbokModel.GetVaktbok(info, userid, DateTime.Today, false);
                _items[userid] = result;
                ViewData["vaktbokitems"] = result;
                ViewData["title"] = String.Format("VAKTBOK {0}", DateTime.Today.ToString("yyyy-MM-dd"));
                ViewData["userid"] = userid;
                return View();
            }
            else
            {
                var view = View("Index");
                view.ViewData["auth"] = "1";
                return view;
            }

        }

        private string ItemsHeader()
        {
            return "<div class=\"col-sm-6 col-sm-push-3\">";
        }

        private void UL(List<VaktbokDagInfo> info, StringBuilder result)
        {
            result.Append("<ul class=\"nav nav-pills\">");
            foreach (var enhet in info)
            {
                if (enhet.Selected == true)
                {
                    result.Append(String.Format("<li class=\"active\"><a data-toggle=\"tab\" href=\"{0}\">{1}</a></li>", enhet.WorkForceUnit, enhet.ToHtml));
                }
                else
                {
                    result.Append(String.Format("<li><a data-toggle=\"tab\" href=\"{0}\">{1}</a></li>", enhet.WorkForceUnit, enhet.ToHtml));
                }
            }
            result.Append("</ul>");
        }
        private string CoverForButton(VaktbokItem item)
        {
            return String.Format("<button class=\"vikar\" data-wn=\"{0}\" data-wid=\"{1}\" data-id={2} type=\"button\">Søk</button>",
                item.WatchName, item.WorkForceUnit, item.Id);
        }
        private void TabContent(List<VaktbokDagInfo> info, StringBuilder result)
        {
            result.Append("<div class=\"tab-content\">");

            foreach (var enhet in info)
            {
                string tabPaneClass = enhet.Selected == true ? "tab-pane active" : "tab-pane";
                result.Append(String.Format("<div id=\"{0}\" class=\"{1}\">", enhet.WorkForceUnit, tabPaneClass));
                result.Append("<table class=\"table table-striped\">");
                result.Append("<thead><tr><th>Vakt</th><th>Etternavn</th><th>Fornavn</th><th>Vikar</th></tr></thead><tbody>");
                foreach (var vakt in enhet.items)
                {
                    result.Append(String.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td></tr>",
                                                vakt.WatchName,
                                                vakt.LastName,
                                                vakt.FirstName,
                                                CoverForButton(vakt)));
                }
                result.Append("</tbody></table></div>");
            }
            result.Append("</div>");
        }

        private string ToHtml(List<VaktbokDagInfo> info)
        {
            var result = new System.Text.StringBuilder(ItemsHeader());
            UL(info, result);
            TabContent(info, result);
            result.Append("</div>");
            return result.ToString();
        }


        public JsonResult VaktbokForDato(string newdate, string userid)
        {
            var info = userAuth[userid];
            var result = vaktbokModel.GetVaktbok(info, userid, DateTime.Parse(newdate), false);
            _items[userid] = result;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        private string ToHtml(Business.KDOBusinessWS.CoverForPerson[] covers)
        {
            var result = new StringBuilder("<table class=\"table table-striped\">");
            result.Append("<thead><tr><th>Etternavn</th><th>Fornavn</th><th>Mobil</th><th>Uketimer</th><th>Timer dag</th></tr></thead>");
            result.Append("<tbody>");
            foreach (var c in covers)
            {
                //result.Append(c.HtmlTableRow);

                var row = new StringBuilder("<tr>");
                row.Append("<td>").Append(c.LastName).Append("</td>");
                row.Append("<td>").Append(c.FirstName).Append("</td>");

                row.Append("<td>").Append(c.PhoneMobile).Append("</td>");
                row.Append("<td>").Append(c.WeekHours).Append("</td>");
                row.Append("<td>").Append(c.DayHours).Append("</td>");

                result.Append(row.ToString());
            }
            result.Append("</tbody></table>");
            return result.ToString();
        }

        public JsonResult CoverForVaktbok(string wid, string id, string userid)
        {
            if (_items.ContainsKey(userid))
            {
                var idx = Int32.Parse(id);

                var itemsForUser = _items[userid];
                var curList = itemsForUser.Find(x => x.WorkForceUnit == wid);

                if (curList == null)
                {
                    return Json(new { html = "<p>N/A</p>" }, JsonRequestBehavior.AllowGet);
                }

                var curWatch = curList.items.Find(x => x.Id == idx); //curList.Items[idx];
                if (curWatch == null)
                {
                    return Json(new { html = "<p>N/A</p>" }, JsonRequestBehavior.AllowGet);
                }
                var widx = Int32.Parse(wid);
                var dt = curWatch.AsDateTime;
                var covers = vaktbokModel.GetPersonsCanCover(widx, dt.Item1, dt.Item2);
                var html = ToHtml(covers);

                return Json(new { html = html }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { html = "<p>N/A</p>" }, JsonRequestBehavior.AllowGet);
            }
        }
#endif
        #endregion Vaktbokdag

    }



    class JsonInitData
    {
        public string userId { get; set; }
        public List<ComboBoxItem> workPlaces { get; set; }
        public double saldo { get; set; }
        public Dictionary<String, List<ComboBoxItem>> reasonCodes { get; set; }

        public string vacation { get; set; }
    }

    class JsonInitDataRequest
    {
        public string userId { get; set; }
        public List<ComboBoxItem> workPlaces { get; set; }
        public string curDate { get; set; }
        
        public string curUnitid { get; set; }

        public List<ComboBoxItem> watches { get; set; }

        public Dictionary<string, JsonWatchDef> watchdefs { get; set; }
        //public JsonWatchesWithWatchDefs watches { get; set; }

        public Dictionary<String, List<ComboBoxItem>> reasonCodes { get; set; }

    }



    /// <summary>
    /// BaseController for all Controllers for language 
    /// </summary>
    public class BaseController : Controller
    {
        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string cultureName = null;

            // Attempt to read the culture cookie from Request
            HttpCookie cultureCookie = Request.Cookies["_culture"];
            if (cultureCookie != null)
                cultureName = cultureCookie.Value;
            else
                cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
                        Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
                        null;
            // Validate culture name
            cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe

            // Modify current thread's cultures            
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

            return base.BeginExecuteCore(callback, state);
        }
    }

}
