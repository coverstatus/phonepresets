import WidgetKit
import SwiftUI
import Intents

struct WidgetData: Decodable {
  var brightnessIcon: String;
  var brightnessValue: String;
  var volumeIcon: String;
  var volumeValue: String;
  var silentIcon: String;
  var silentValue: String;
}

struct Provider: IntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), configuration: ConfigurationIntent(), brightnessIcon: "b-80-100", brightnessValue: "100%", volumeIcon: "v-80-100", volumeValue: "100%", silentIcon: "r", silentValue: "Ringer");
  }

  func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry = SimpleEntry(date: Date(), configuration: configuration, brightnessIcon: "b-80-100", brightnessValue: "100%", volumeIcon: "v-80-100", volumeValue: "100%", silentIcon: "r", silentValue: "Ringer")
      completion(entry)
  }

  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
      let userDefaults = UserDefaults.init(suiteName: "group.phonepresets")
      if userDefaults != nil {
        let entryDate = Date()
        if let savedData = userDefaults!.value(forKey: "widgetKey") as? String {
            let decoder = JSONDecoder()
            let data = savedData.data(using: .utf8)
            if let parsedData = try? decoder.decode(WidgetData.self, from: data!) {
                let nextRefresh = Calendar.current.date(byAdding: .minute, value: 1, to: entryDate)!
              let entry = SimpleEntry(date: nextRefresh, configuration: configuration, brightnessIcon: parsedData.brightnessIcon, brightnessValue: parsedData.brightnessValue, volumeIcon: parsedData.volumeIcon, volumeValue: parsedData.volumeValue, silentIcon: parsedData.silentIcon, silentValue: parsedData.silentValue)
                let timeline = Timeline(entries: [entry], policy: .atEnd)
                completion(timeline)
            } else {
                print("Could not parse data.")
            }
        } else {
            let nextRefresh = Calendar.current.date(byAdding: .minute, value: 1, to: entryDate)!
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, brightnessIcon: "b-80-100", brightnessValue: "100%", volumeIcon: "v-80-100", volumeValue: "100%", silentIcon: "r", silentValue: "Ringer")
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        }
      }
  }

  struct SimpleEntry: TimelineEntry {
    let date: Date;
    let configuration: ConfigurationIntent;
    let brightnessIcon: String;
    let brightnessValue: String;
    let volumeIcon: String;
    let volumeValue: String;
    let silentIcon: String;
    var silentValue: String;
  }

  struct MyWidgetEntryView : View {
    var entry: Provider.Entry;
    var body: some View {
      ZStack {
        Color(red: 23/255, green: 10/255, blue: 45/255).ignoresSafeArea()
          VStack(spacing: 8) {
            HStack() {
              Image(uiImage: UIImage(named: entry.brightnessIcon)!).resizable()
                .frame(width: 28.0, height: 28.0).padding(4).background(Color(red: 42/255, green: 32/255, blue: 59/255)).cornerRadius(8)
              Text(entry.brightnessValue).frame(width: 80, alignment: .leading)
                          .foregroundColor(.white)
            }
            HStack() {
              Image(uiImage: UIImage(named: entry.volumeIcon)!).resizable()
                .frame(width: 28.0, height: 28.0).padding(4).background(Color(red: 42/255, green: 32/255, blue: 59/255)).cornerRadius(8)
              Text(entry.volumeValue).frame(width: 80, alignment: .leading)
                .foregroundColor(.white)
            }
            HStack() {
              Image(uiImage: UIImage(named: entry.silentIcon)!).resizable()
                .frame(width: 26.0, height: 26.0).padding(5).background(Color(red: 42/255, green: 32/255, blue: 59/255)).cornerRadius(8)
              Text(entry.silentValue).frame(width: 80, alignment: .leading)
                .foregroundColor(.white)
            }
          }.scaledToFit()
      }
    }
  }

  @main
  struct MyWidget: Widget {
      let kind: String = "MyWidget"

      var body: some WidgetConfiguration {
          IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
              MyWidgetEntryView(entry: entry)
          }
          .configurationDisplayName("My Widget")
          .description("This is an example widget.")
      }
  }

  struct MyWidget_Previews: PreviewProvider {
      static var previews: some View {
          MyWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), brightnessIcon: "b-80-100", brightnessValue: "100%", volumeIcon: "v-80-100", volumeValue: "100%", silentIcon: "r", silentValue: "Ringer"))
              .previewContext(WidgetPreviewContext(family: .systemSmall))
      }
  }
}
