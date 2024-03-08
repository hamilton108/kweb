#define KDO_REQ_WATCHDEFS
using Business;
using KDO.ShiftManagerMVC.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace KDO.ShiftManagerMVC.Models
{
    public class AjourholdModel
    {
        static AjourholdKode ajour = new AjourholdKode();
        static Calendar cal = new Calendar();
        private delegate List<IWatch> WatchesForDelegate(int personId, int workPlace, string dateFrom, string dateTo);

#if KDO_REQ_WATCHDEFS
        public JsonWatchesWithWatchDefs CoverFor(int workPlace, int personId, string dateFrom, string dateTo)
        {


            var df = CommonModel.StringToDate(dateFrom);
            var dt = CommonModel.StringToDate(dateTo);
            var items = ajour.GetVakt_Ekstraarbeid(workPlace, personId, df, dt);

             if (items.Rows.Count == 0)
            {
                //Ikke null på Watches
                return new JsonWatchesWithWatchDefs() { watches = new List<ComboBoxItem>(), watchdefs = null };
            }
            var watches = new List<ComboBoxItem>();
            var watchDefs = new Dictionary<string, JsonWatchDef>();
            foreach (DataRow row in items.Rows)
            {
                var watchId = row["VALUE"].ToString();
                var item = new ComboBoxItem()
                {
                    text = row["TEXT"].ToString(),
                    value = watchId
                };
                watches.Add(item);

                if (watchDefs.ContainsKey(watchId) == false)
                {
                    watchDefs[watchId] = new JsonWatchDef()
                    {
                        len = row["TIMER"].ToString(),
                        hourFrom = row["FRATID"].ToString(),
                        hourTo = row["TILTID"].ToString(),
                        reason = row["KODE"].ToString(),
                        isExtra = "false"
                    };
                }
            }
            var result = new JsonWatchesWithWatchDefs() { watches = watches, watchdefs = watchDefs };
            return result;
        }
        
        public JsonWatchesWithWatchDefs WatchesFor(int messageType, int workPlace, int personId, string dateFrom, string dateTo)
        {
            switch (messageType)
            {
                case 2: // Utrykning
                    return WatchesForEmergency(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForEmergency);
                case 6: // Fravær
                    return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForAway);
                case 1: // Avspasering
                    return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForAway);
                case 15: // Forskyvning
                    return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForAway);
                case 3: // Vaktbytte
                    //return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForAway);
                    return WatchesForSwapFrom(workPlace, personId, dateFrom);

                default:
                    return new JsonWatchesWithWatchDefs();
            }   
        }

        private JsonWatchesWithWatchDefs WatchesForEmergency(int workPlace, int personId, string dateFrom, string dateTo, WatchesForDelegate wfd)
        {
            List<IWatch> iwatches = wfd(personId, workPlace, dateFrom, dateTo);
            if (iwatches.Count() == 0)
            {
                return new JsonWatchesWithWatchDefs();
            }
            var watches = new List<ComboBoxItem>();
            var watchDefs = new Dictionary<string, JsonWatchDef>();

            foreach (var w in iwatches)
            {
                var watchId = w.WorkScheduleLineId.ToString();
                var fromHour = w.StartTime.ToString("HH:mm");
                var toHour = w.EndTime.ToString("HH:mm");
                var dotFormatFrom = BusinessUtils.AsDayDotMonthFormat(w.Start);
                var dotFormatTo = BusinessUtils.AsDayDotMonthFormat(w.End);

                var item = new ComboBoxItem()
                {
                    text = String.Format("{0}: {1} {2} - {3} {4}",
                        w.WatchName,
                        dotFormatFrom,
                        fromHour,
                        dotFormatTo,
                        toHour),
                    value = watchId
                };
                watches.Add(item);
                if (watchDefs.ContainsKey(watchId) == false)
                {
                    watchDefs[watchId] = new JsonWatchDef()
                    {
                        len = w.WatchLength.ToString(),
                        hourFrom = fromHour,
                        hourTo = toHour,
                        reason = "",
                        isExtra = w.IsExtra,
                        startDate = BusinessUtils.ToISO8601Format(w.Start)
                    };
                }
            }
            var result = new JsonWatchesWithWatchDefs()
            {
                watches = watches,
                watchdefs = watchDefs
            };
            return result;
        }

        private JsonWatchesWithWatchDefs WatchesFor(int workPlace, int personId, string dateFrom, string dateTo, WatchesForDelegate wfd)
        {
            List<IWatch> iwatches = wfd(personId, workPlace, dateFrom, dateTo);

            var watches = new List<ComboBoxItem>();
            var watchDefs = new Dictionary<string, JsonWatchDef>();

            if (iwatches.Count() == 0)
            {
                return new JsonWatchesWithWatchDefs()
                {
                    watches = watches,
                    watchdefs = watchDefs
                };
            }


            foreach (var w in iwatches)
            {
                var watchId = w.WorkScheduleLineId.ToString();
                var fromHour = w.StartTime.ToString("HH:mm");
                var toHour = w.EndTime.ToString("HH:mm");
                var dotFormatFrom = BusinessUtils.AsDayDotMonthFormat(w.Start);
                var dotFormatTo = BusinessUtils.AsDayDotMonthFormat(w.End);

                var item = new ComboBoxItem()
                {
                    text = String.Format("{0}: {1} {2} - {3} {4}",
                    w.WatchName,
                    dotFormatFrom,
                    fromHour,
                    dotFormatTo,
                    toHour),
                    value = watchId
                };
                watches.Add(item);
                if (watchDefs.ContainsKey(watchId) == false)
                {
                    watchDefs[watchId] = new JsonWatchDef()
                    {
                        len = w.WatchLength.ToString(),
                        hourFrom = fromHour,
                        hourTo = toHour,
                        reason = "",
                        isExtra = w.IsExtra,
                        startDate = BusinessUtils.ToISO8601Format(w.Start)
                    };
                }
            }
            var result = new JsonWatchesWithWatchDefs()
            {
                watches = watches,
                watchdefs = watchDefs
            };
            return result;
        }

        public JsonWatchesWithWatchDefs WatchesForSwapFrom(int workPlace, int personId, string dateFrom)
        {
            var df = CommonModel.StringToDate(dateFrom);

            DataTable items = ajour.GetVakt_SwapFrom(workPlace, personId, df);

            var watches = new List<ComboBoxItem>();
            var watchDefs = new Dictionary<string, JsonWatchDef>();

            if (items.Rows.Count == 0)
            {
                return new JsonWatchesWithWatchDefs()
                {
                    watches = watches,
                    watchdefs = watchDefs
                };
            }

            foreach (DataRow row in items.Rows)
            {
                var watchId = row["VALUE"].ToString();
                var item = new ComboBoxItem()
                {
                    text = row["TEXT"].ToString(),
                    value = watchId
                };

                watches.Add(item);
                

                if (watchDefs.ContainsKey(watchId) == false)
                {
                    //var typetest = row["STARTTID"].GetType();
                    //var typetest2 = row["SLUTTID"].GetType();

                    DateTime dtFrom = (DateTime)row["STARTTID"];
                    DateTime dtTo = (DateTime)row["SLUTTID"];

                    watchDefs[watchId] = new JsonWatchDef()
                    {
                        len = row["TIMER"].ToString(),
                        //hourFrom = row["FRATID"].ToString(),
                        //hourTo = row["TILTID"].ToString(),
                        hourFrom = BusinessUtils.ToISO8601Format(dtFrom, true), //DateTimeUtil.ParseStringToISO8601(dtFrom.ToString("dd.MM.yyyy HH:mm")),
                        hourTo = BusinessUtils.ToISO8601Format(dtTo, true), //DateTimeUtil.ParseStringToISO8601(dtTo.ToString("dd.MM.yyyy HH:mm")),
                        reason = "",
                        isExtra = "false"
                    };
                }
            }
            return new JsonWatchesWithWatchDefs()
            {
                watches = watches,
                watchdefs = watchDefs
            };
        }


        public JsonWatchesWithWatchDefs WatchesForSwapTo(
            int workPlace
               ,int personId
               ,string dateFrom
               ,string dateTo
               ,string origwatch
            )
        {


            var swapfrom = CommonModel.StringToDate(dateFrom);
            var swapto = CommonModel.StringToDate(dateTo);
            long origid = -1;
            if (String.IsNullOrEmpty(origwatch) == false)
                origid = long.Parse(origwatch);
            //var origStartDt = BusinessUtils.FromISO8601Format(origStartTime, true);
            //var origEndDt = BusinessUtils.FromISO8601Format(origEndTime, true);

            //Done: Rolf, her må det inn logikk på om det skal sjekkes på om den som bytter fra, kan jobbe 
            // Hvis bytte fra dato er forskjellig fra bytte til dato => true....
            bool checkavail = swapto.Date != swapfrom.Date;
            DataTable items = ajour.GetVakt_SwapTo(workPlace, personId, swapto, swapfrom, origid, checkavail);

            if (items.Rows.Count == 0)
            {
                return new JsonWatchesWithWatchDefs();
            }

            var watches = new List<ComboBoxItem>();
            var watchDefs = new Dictionary<string, JsonWatchDef>();
            foreach (DataRow row in items.Rows)
            {
                var watchId = row["VALUE"].ToString();
                var item = new ComboBoxItem()
                {
                    text = row["TEXT"].ToString(),
                    value = watchId
                };

                watches.Add(item);

                if (watchDefs.ContainsKey(watchId) == false)
                {
                    watchDefs[watchId] = new JsonWatchDef()
                    {
                        len = row["TIMER"].ToString(),
                        hourFrom = row["FRATID"].ToString(),
                        hourTo = row["TILTID"].ToString(),
                        reason = "",
                        isExtra = "false"
                    };
                }
            }

            return new JsonWatchesWithWatchDefs()
            {
                watches = watches,
                watchdefs = watchDefs
            };
        }


        /*
        public DataTable GetWatchDefWithTimeForSlide(
            long lonnsnr, 
            DateTime originalFrom, 
            DateTime originalTo, 
            long turnuslinjeid, 
            DateTime SlideToDate, 
            long WorkforceUnitId)
        */
        public JsonWatchesWithWatchDefs WatchesForSlideTo
            (int slideToWorkPlace, 
            int personId, 
            string origDateFrom,
            long turnuslinjeid,
            string SlideToDate)
        {

            var odtFrom = BusinessUtils.FromISO8601Format(origDateFrom,false);
            //var odtTo = BusinessUtils.FromISO8601Format(origDateTo,true);
            var slideTo = BusinessUtils.FromISO8601Format(SlideToDate);

            DataTable items = ajour.GetVakt_SlideTo(
                personId,
                odtFrom,
                turnuslinjeid,
                slideTo,
                slideToWorkPlace);

            if (items.Rows.Count == 0)
            {
                return new JsonWatchesWithWatchDefs();
            }

            var watches = new List<ComboBoxItem>();
            var watchDefs = new Dictionary<string, JsonWatchDef>();

            foreach (DataRow row in items.Rows)
            {
                var watchId = row["VAKTTYPEID"].ToString();
                var watchName = row["VAKTTYPENAVN"].ToString();

                DateTime dateFrom = (DateTime)row["FRA"];
                DateTime dateTo = (DateTime)row["TIL"];

                var watchLen = dateTo.Subtract(dateFrom).TotalHours;

                var fromHour = dateFrom.ToString("HH:mm");
                var toHour = dateTo.ToString("HH:mm");

                var dotFormatFrom = BusinessUtils.AsDayDotMonthFormat(dateFrom);
                var dotFormatTo = BusinessUtils.AsDayDotMonthFormat(dateTo);

                var item = new ComboBoxItem()
                {
                    text = String.Format("{0}: {1} {2} - {3} {4}",
                    watchName,
                    dotFormatFrom,
                    fromHour,
                    dotFormatTo,
                    toHour),
                    value = watchId
                };
                watches.Add(item);
                if (watchDefs.ContainsKey(watchId) == false)
                {
                    watchDefs[watchId] = new JsonWatchDef()
                    {
                        len = watchLen.ToString(), 
                        hourFrom = fromHour,
                        hourTo = toHour,
                        reason = "",
                        isExtra = "false",
                        startDate = BusinessUtils.ToISO8601Format(dateFrom)
                    };
                }
            }

            return new JsonWatchesWithWatchDefs()
            {
                watches = watches,
                watchdefs = watchDefs
            };
        }
#else
        public List<ComboBoxItem> CoverFor(int workPlace, int personId, string dateFrom, string dateTo)
        {
            var result = new List<ComboBoxItem>();
            var df = CommonModel.StringToDate(dateFrom);
            var dt= CommonModel.StringToDate(dateTo);
            var items = ajour.GetVakt_Ekstraarbeid(workPlace, personId, df, dt);
            foreach (DataRow row in items.Rows)
            {
                var item = new ComboBoxItem()
                {
                    text = row["TEXT"].ToString(),
                    value = String.Format("{0};{1};{2};{3};{4}", 
                    row["VALUE"].ToString(),
                    row["FRATID"].ToString(), 
                    row["TILTID"].ToString(),
                    row["TIMER"].ToString(),
                    row["KODE"].ToString()) //row["IsExtra"].ToString())
                };

                //result.Add(CommonModel.DataRowAsComboBoxItem(row));
                result.Add(item);
            }
            return result;
        }

        public List<ComboBoxItem> WatchesFor(int messageType, int workPlace, int personId, string dateFrom, string dateTo)
        {
            switch (messageType)
            {
                case 2: // Uttrykning
                    return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForEmergency);
                case 6: // Fravær
                    return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForAway);
                case 1: // Avspasering
                    return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForAway);
                case 3: //Vaktbytte
                    //return WatchesFor(workPlace, personId, dateFrom, dateTo, cal.GetKalenderVakterForAway);
                    return WatchesForSwapFrom(workPlace, personId, dateTo);
                default:
                    return new List<ComboBoxItem>();
            }
        }

        private List<ComboBoxItem> WatchesFor(int workPlace, int personId, string dateFrom, string dateTo, WatchesForDelegate wfd)
        {
            var result = new List<ComboBoxItem>();

            List<IWatch> watches = wfd(personId, workPlace, dateFrom, dateTo);

            foreach (var w in watches)
            {
                var fromHour = w.StartTime.ToString("HH:mm");
                var toHour = w.EndTime.ToString("HH:mm");
                var item = new ComboBoxItem()
                {
                     text = String.Format("{0} {1} - {2}",
                        w.WatchName,
                        fromHour,
                        toHour),
                    value = String.Format("{0};{1};{2};{3};{4}",
                        w.WorkScheduleLineId,
                        fromHour,
                        toHour,
                        w.WatchLength,
                        w.IsExtra)
                };
                result.Add(item);
            }
            return result;
        }


        public List<ComboBoxItem> WatchesForSwapTo(int workPlace, int personId, string dateFrom, string dateTo)
        {
            var result = new List<ComboBoxItem>();

            var swapfrom = CommonModel.StringToDate(dateFrom);
            var swapto = CommonModel.StringToDate(dateTo);

            //Done: Rolf, her må det inn logikk på om det skal sjekkes på om den som bytter fra, kan jobbe 
            // Hvis bytte fra dato er forskjellig fra bytte til dato => true....
            bool checkavail = swapto.Date != swapfrom.Date;
            DataTable items = ajour.GetVakt_SwapTo(workPlace, personId, swapto, checkavail);
            foreach (DataRow row in items.Rows)
            {
                var item = new ComboBoxItem()
                {
                    text = row["TEXT"].ToString(),
                    value = String.Format("{0};{1};{2};{3};-",
                    row["VALUE"].ToString(),
                    row["FRATID"].ToString(),
                    row["TILTID"].ToString(),
                    row["TIMER"].ToString())
                };

                //result.Add(CommonModel.DataRowAsComboBoxItem(row));
                result.Add(item);
            }
            return result;
        }

        public List<ComboBoxItem> WatchesForSwapFrom(int workPlace, int personId, string dateFrom)
        {
            var result = new List<ComboBoxItem>();

            var df = CommonModel.StringToDate(dateFrom);
            
            DataTable items = ajour.GetVakt_SwapFrom(workPlace, personId, df);
            foreach (DataRow row in items.Rows)
            {
                var item = new ComboBoxItem()
                {
                    text = row["TEXT"].ToString(),
                    value = String.Format("{0};{1};{2};{3};-",
                    row["VALUE"].ToString(),
                    row["FRATID"].ToString(),
                    row["TILTID"].ToString(),
                    row["TIMER"].ToString())
                };

                //result.Add(CommonModel.DataRowAsComboBoxItem(row));
                result.Add(item);
            }
            return result;
        }
#endif
        public string GetTimebankSaldo(int pLonnsnr)
        {
            return ajour.GetTimebankSaldo(pLonnsnr);
        }

        public JsonStatusMsg SaveMessageCenter(SaveMessageCenterDTO dto)
        {
            try
            {
                #region Impl
                int numRowsInserted = 0;

                if (dto.msgType == 15) // Forskyvning
                {
                    numRowsInserted = SaveMessageCenterSlide(dto);
                }
                else
                {
                    DateTime dtFrom = CommonModel.StringToDate(dto.dateFrom);
                    DateTime dtTo = CommonModel.StringToDate(dto.dateTo);
                    if (!string.IsNullOrEmpty(dto.hourFrom))
                        dtFrom = dtFrom.Add(CommonModel.StringToTimespan(dto.hourFrom));
                    if (!string.IsNullOrEmpty(dto.hourTo))
                        dtTo = dtTo.Add(CommonModel.StringToTimespan(dto.hourTo));
                    
                    //Bytte vakt ikke ødelegg
                    if (dto.msgType != 3)
                    {
                        if (dtTo < dtFrom)
                            dtTo = dtTo.AddDays(1);
                    }

                    numRowsInserted =
                        ajour.RegistrerAjourhold
                        (
                            dto.personId.ToString(),
                            dto.msgType,
                            dto.workPlace,
                            dtFrom,
                            dtTo,
                            dto.turnuslinjeId.HasValue ? dto.turnuslinjeId.Value : 0,
                            dto.turnuslinjeId2,
                            dto.ajourDvId.HasValue ? dto.ajourDvId.Value : 0,
                            dto.reason,
                            dto.timeBank.HasValue ? Convert.ToDecimal(dto.timeBank.Value) : 0,
                            dto.msg,
                            dto.isExtra
                        );
                }
                if (numRowsInserted == 0)
                {
                    return new JsonStatusMsg() { ok = false, msg = "Ingen forespørsel ble lagret!" };
                }
                else
                {
                    if (dto.msgType == 2 && numRowsInserted == -2)
                    {
                        return new JsonStatusMsg() { ok = false, msg = "Forespørsel om utrykning overlapper eksisterende utrykning!" };
                    }
                    else
                        return new JsonStatusMsg() { ok = true, msg = "" };
                }
                #endregion Impl
            }
            catch (Exception ex)
            {
                return new JsonStatusMsg() { ok = false, msg = ex.Message.Truncate(600) };
            }
        }


        public JsonStatusMsg RegisterTidRegPerson(bool isout, int lonnsnr, int reasonid, int unitid, int cunitid)
        {
            int ret = ajour.RegisterTidRegPerson(isout, lonnsnr, reasonid, unitid, cunitid);
            switch (ret)
            {
                case 0:
                    return new JsonStatusMsg() { ok = false, msg = "Registreringen ble ikke lagret!" };
                    
                case 1:
                    if (isout)
                        return new JsonStatusMsg() { ok = true, msg = "Utregistreringen ble lagret!" };
                    else 
                        return new JsonStatusMsg() { ok = true, msg = "Innregistreringen ble lagret!" };
                case 2:
                    if (isout)
                        return new JsonStatusMsg() { ok = false, msg = "Du er ikke registrert inn på enheten!" };
                    else
                        return new JsonStatusMsg() { ok = false, msg = "Du er ikke registrert ut på enheten!" };
                default:
                    return new JsonStatusMsg() { ok = false, msg = "Ukjent status" };
            }
            
        }

        private static int SaveMessageCenterSlide(SaveMessageCenterDTO dto)
        {
            var orgDt = CreateDatesFrom(dto.dateFrom, dto.hourFrom, dto.hourTo);
            var dt = CreateDatesFrom(dto.dateTo, dto.hourFrom2, dto.hourTo2);

            return ajour.RegistrerAjourholdSlide(
                    dto.personId
                    , dto.msgType
                    , dto.workPlace
                    , orgDt.Item1
                    , orgDt.Item2
                    , dt.Item1
                    , dt.Item2
                    , dto.turnuslinjeId.Value
                    , dto.watchTypeId
                    , dto.reason
                    , dto.msg
                );
        }

        private static Tuple<DateTime,DateTime> CreateDatesFrom(String dateFrom, String hourFrom, String hourTo)
        {
            TimeSpan ts = CommonModel.StringToTimespan(hourFrom);
            TimeSpan ts2 = CommonModel.StringToTimespan(hourTo);
            DateTime dtFrom = CommonModel.StringToDate(dateFrom).Add(ts);
            DateTime dtTo = CommonModel.StringToDate(dateFrom).Add(ts2);
            if (dtTo < dtFrom)
            {
                dtTo = dtTo.AddDays(1);
            }
            return new Tuple<DateTime, DateTime>(dtFrom, dtTo);
        }
    }
}