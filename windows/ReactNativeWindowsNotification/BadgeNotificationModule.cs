using ReactNative.Bridge;
using Windows.Data.Xml.Dom;
using Windows.UI.Notifications;

namespace ReactNativeNotification
{
    public class BadgeNotificationModule : ReactContextNativeModuleBase
    {
        public BadgeNotificationModule(ReactContext reactContext)
            : base(reactContext)
        {
        }

        public override string Name
        {
            get
            {
                return "BadgeNotification";
            }
        }

        private void createBadge(XmlDocument badgeXml)
        {
            BadgeNotification badge = new BadgeNotification(badgeXml);
            BadgeUpdateManager.CreateBadgeUpdaterForApplication().Update(badge);
        }

        [ReactMethod]
        public void showNumericalBadge(int num)
        {
            XmlDocument badgeXml =
                BadgeUpdateManager.GetTemplateContent(BadgeTemplateType.BadgeNumber);

            XmlElement badgeElement = badgeXml.SelectSingleNode("/badge") as XmlElement;
            badgeElement.SetAttribute("value", num.ToString());

            createBadge(badgeXml);
        }

        [ReactMethod]
        public void showGlyphBadge(string glyph)
        {
            XmlDocument badgeXml =
                BadgeUpdateManager.GetTemplateContent(BadgeTemplateType.BadgeGlyph);

            XmlElement badgeElement = badgeXml.SelectSingleNode("/badge") as XmlElement;
            badgeElement.SetAttribute("value", glyph);

            createBadge(badgeXml);
        }

        [ReactMethod]
        public void clearBadgeNotification()
        {
            BadgeUpdateManager.CreateBadgeUpdaterForApplication().Clear();
        }
    }
}