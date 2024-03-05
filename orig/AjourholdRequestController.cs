using Business;
using KDO.Common.MessageCenter;
using KDO.Common.WorkSchedule;
using KDO.ShiftManagerMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KDO.ShiftManagerMVC.Controllers
{
    public class AjourholdRequestController : BaseController
    {
        // GET: AjourholdRequest
        public ActionResult Index(String userid)
        {
            if (HomeController.userAuth.ContainsKey(userid) == false)
            {
                return RedirectToAction("LoginView", "Home");
            }
            else
            {
                var info = HomeController.userAuth[userid];
                SetNavBarAccess(info);
                ViewData["userid"] = userid;
                ViewData["activeIndex"] = 8;
                return View("Index");
            }
        }

        public JsonResult InitData(string userid)
        {
            if (HomeController.userAuth.ContainsKey(userid))
            {
                var info = HomeController.userAuth[userid];

                var reasons = CommonModel.WebReasonCodes;

                var workPlaces = CommonModel.WorkPlaces(info.personId);

                //TODO: Change to update sum hourbank per unit every time workplace is selected, this will return value:  CommonModel.HourBankSumUnit(info.personId, unitid);
                var hbank = CommonModel.HourBankSum(info.personId);

                var vac = SalaryPeriodModel.VacationDaysFor(info.personId);
                var result = new JsonInitData()
                {
                    userId = userid,
                    workPlaces = workPlaces,
                    saldo = hbank,
                    reasonCodes = reasons,
                    vacation = vac
                };

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult InitDataCurDay(string userid, int messageType)
        {
            if (HomeController.userAuth.ContainsKey(userid))
            {
                var info = HomeController.userAuth[userid];

                var reasons = CommonModel.WebReasonCodes;

                var workPlaces = CommonModel.WorkPlaces(info.personId);
                int curunit = -1;
                string todayString = DateTime.Today.ToString("yyyy-MM-dd");
                JsonWatchesWithWatchDefs wwDef = new JsonWatchesWithWatchDefs();
                wwDef.watches = new List<ComboBoxItem>();
                wwDef.watchdefs = new Dictionary<string, JsonWatchDef>();
                if (workPlaces.Count == 1)
                {
                    curunit = int.Parse(workPlaces[0].value);
                    AjourholdModel ajourholdModel = new AjourholdModel();
                    wwDef = ajourholdModel.WatchesFor(messageType, curunit, info.personId, todayString, todayString);
                }
                               
                var result = new JsonInitDataRequest()
                {
                    userId = userid,
                    curDate = todayString,
                    curUnitid = curunit.ToString(),
                    reasonCodes = reasons,
                    workPlaces = workPlaces,
                    watches = wwDef.watches,
                    watchdefs = wwDef.watchdefs
                };

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult TimebankWorkplace(string userid, int workplaceid)
        {
            if (HomeController.userAuth.ContainsKey(userid))
            {
                var info = HomeController.userAuth[userid];

                var hbank = CommonModel.HourBankSumUnit(info.personId, workplaceid);
                //Made object for Elm requested an object with property named value.
                jsonDoubleValue retVal = new jsonDoubleValue();
                retVal.value = hbank;
                //var ret  = Json(hbank, JsonRequestBehavior.AllowGet);

                return Json(retVal, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult SaveMessageCenter(SaveMessageCenterDTO jsonInput)
        {
            if (HomeController.userAuth.ContainsKey(jsonInput.userId))
            {

                var info = HomeController.userAuth[jsonInput.userId];
                jsonInput.personId = info.personId;
                AjourholdModel ajourholdModel = new AjourholdModel();
                //Privat vaktbytte settes til årsaksid -1
                if (jsonInput.msgType == 512 && jsonInput.reason == 0)
                    jsonInput.reason = -1;
                var jsonStatus = ajourholdModel.SaveMessageCenter(jsonInput);
                return Json(jsonStatus, JsonRequestBehavior.AllowGet);

                //return Json(new JsonStatusMsg() { ok = true, msg = "Request sent" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CoverFor(int workPlace, string userid, string dateFrom, string dateTo)
        {
            if (HomeController.userAuth.ContainsKey(userid))
            {
                var info = HomeController.userAuth[userid];
                AjourholdModel ajourholdModel = new AjourholdModel();
                var result = ajourholdModel.CoverFor(workPlace, info.personId, dateFrom, dateTo);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult WatchesFor(int messageType, int workPlace, string userid, string dateFrom, string dateTo)
        {
            if (HomeController.userAuth.ContainsKey(userid))
            {
                var info = HomeController.userAuth[userid];
                AjourholdModel ajourholdModel = new AjourholdModel();
                var result = ajourholdModel.WatchesFor(messageType, workPlace, info.personId, dateFrom, dateTo);

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult WatchesForSwapTo(int workPlace, 
            string userid, 
            string dateFrom, 
            string dateTo, 
            string orgwid)
        {
            if (HomeController.userAuth.ContainsKey(userid))
            {
                var info = HomeController.userAuth[userid];
                AjourholdModel ajourholdModel = new AjourholdModel();
                var result = ajourholdModel.WatchesForSwapTo(workPlace, info.personId, dateFrom, dateTo, orgwid);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="twp">Turnusenhetid for forskjøvet vakt til</param>
        /// <param name="userid">Brukerid</param>
        /// <param name="odf">Forskjøvet vakt fra dato</param>
        /// <param name="tlid">Turnuslinjeid for forskjøvet vakt fra</param>
        /// <param name="dt">Forskjøvet vakt til dato</param>
        /// <returns></returns>
        public JsonResult WatchesForSlideTo(
            int twp,
            string userid,
            string odf, 
            long tlid, 
            string dt) 
        {
            if (HomeController.userAuth.ContainsKey(userid))
            {
                var info = HomeController.userAuth[userid];
                AjourholdModel ajourholdModel = new AjourholdModel();
                var result = ajourholdModel.WatchesForSlideTo(
                    twp
                    , info.personId
                    , odf
                    , tlid
                    , dt);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new JsonStatusMsg() { ok = false, msg = "No auth" }, JsonRequestBehavior.AllowGet);
            }
        }

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
    }

    public class jsonDoubleValue
    {
        public double value { get; set; }
    }
   
}