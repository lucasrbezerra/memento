import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import { isPast, addWeeks } from 'date-fns';
const moment = require('moment');

export function NotificationCreate({ onWeek, onScheduled, onActive, onClose }) {
  /* States toggles */
  const [isActive, setIsActive] = useState(false);
  const [routine, setRoutine] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [isDateTime, setIsDateTime] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  /* States with values */
  const [isDateScheduled, setIsDateScheduled] = useState(false);
  const [dateScheduled, setDateScheduled] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date(Date.now()));

  function getDateFormated(date) {
    var d, m, y, newDate;

    d = date.getDate().toString();
    m = (date.getMonth() + 1).toString();
    y = date.getFullYear().toString();

    if (parseInt(d) < 10) {
      d = '0' + d.toString();
    }

    if (parseInt(m) < 10) {
      m = '0' + d.toString();
    }

    newDate = d + '/' + m + '/' + y;

    return newDate;
  };

  function getTimeFormated(date) {
    var h, min, newHour;

    h = date.getHours().toString();
    min = date.getMinutes().toString();

    if (parseInt(h) < 10) {
      h = '0' + h.toString();
    }

    if (parseInt(min) < 10) {
      min = '0' + min.toString();
    }

    newHour = h + ':' + min;

    return newHour;
  };

  function chooseTextDate() {
    var displayText;
    if (routine === false && isDateScheduled === false) {
      displayText = 'Hoje';
      return displayText;
    } else if (routine === false && isDateScheduled === true) {
      displayText = getDateFormated(dateScheduled);
      return displayText;
    } else if (routine === true) {
      displayText = 'Todo dia';
      return displayText;
    }
  };

  function chooseTextTime() {
    var displayText;
    if (routine === false && isDateScheduled === true) {
      displayText = getTimeFormated(dateScheduled);
      return displayText;
    } else {
      displayText = getTimeFormated(time);
      return displayText;
    }
  };

  function chooseTextColor() {
    return isActive === true ? '#bdffde' : '#ffffff';
  };

  function convertDate(date, time) {
    var Dat = new Date(date);

    var d = Dat.getDate();
    var m = Dat.getMonth();
    var y = Dat.getFullYear();
    var h = time.getHours();
    var min = time.getMinutes();

    var newDate = new Date(y, m, d, h, min);
    return newDate;
  };

  function setWeek() {
    const week = [];
    let day;
    if (monday) {
      day = convertDate(new Date(moment('Monday', 'dddd')) , time);
      if (isPast(day)) {
        day = addWeeks(day, 1);
      }
      week.push(convertDate(day, time));
    }
    if (tuesday) {
      day = convertDate(new Date(moment('Tuesday', 'dddd')) , time);
      if (isPast(day)) {
        day = addWeeks(day, 1);
      }
      week.push(convertDate(day, time));
    }
    if (wednesday) {
      day = convertDate(new Date(moment('Wednesday', 'dddd')) , time);
      if (isPast(day)) {
        day = addWeeks(day, 1);
      }
      week.push(convertDate(day, time));
    }
    if (thursday) {
      day = convertDate(new Date(moment('Thursday', 'dddd')) , time);
      if (isPast(day)) {
        day = addWeeks(day, 1);
      }
      week.push(convertDate(day, time));
    }
    if (friday) {
      day = convertDate(new Date(moment('Friday', 'dddd')) , time);
      if (isPast(day)) {
        day = addWeeks(day, 1);
      }
      week.push(convertDate(day, time));
    }
    if (saturday) {
      day = convertDate(new Date(moment('Saturday', 'dddd')) , time);
      if (isPast(day)) {
        day = addWeeks(day, 1);
      }
      week.push(convertDate(day, time));
    }
    if (sunday) {
      day = convertDate(new Date(moment('Sunday', 'dddd')) , time);
      if (isPast(day)) {
        day = addWeeks(day, 1);
      }
      week.push(day);
    }
    onWeek(week);
  };

  const handleDateScheduled = () => {
    setIsDateTime(true);
    if (routine) setRoutine(false);
  };

  const handleTime = (time) => {
    setTime(time);
    setIsTime(false);
    setIsDateScheduled(false);
  };

  const handleDateTime = (date) => {
    setDateScheduled(date);
    setIsDateTime(false);
    setIsDateScheduled(true);
  };

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  const Cancel = () => {
    onClose();
  };

  const Confirm = () => {
    setWeek();
    if (isDateScheduled) {
      /* > Today */
      onScheduled(dateScheduled);
    } else {
      /* today */
      onScheduled(time);
    }

    onActive(isActive);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topDiv}>
        <View style={{ flex: 1 }}>
          <View style={styles.display}>
            <TouchableOpacity
              style={{ marginLeft: 16, marginTop: 8 }}
              onPress={handleDateScheduled}>
              <Text style={[styles.date, { color: chooseTextColor() }]}>
                {chooseTextDate()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => setIsTime(true)}>
              <Text style={[styles.hour, { color: chooseTextColor() }]}>
                {chooseTextTime()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              center
              size={30}
              checkedIcon="check-square-o"
              checkedColor="#37C77F"
              uncheckedIcon="square-o"
              uncheckedColor="#ffffff"
              checked={routine}
              onPress={() => setRoutine(!routine)}
            />
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: 18,
                color: '#fff',
              }}>
              Repetir
            </Text>
          </View>

          {routine == true ? (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 16,
                marginBottom: 8,
              }}>
              {monday == false ? (
                <TouchableOpacity
                  style={styles.dayOfWeekOff}
                  onPress={() => setMonday(true)}>
                  <Text style={styles.textDayUnchecked}>S</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.dayOfWeekOn}
                  onPress={() => setMonday(false)}>
                  <Text style={styles.textDayChecked}>S</Text>
                </TouchableOpacity>
              )}

              {tuesday == false ? (
                <TouchableOpacity
                  style={styles.dayOfWeekOff}
                  onPress={() => setTuesday(true)}>
                  <Text style={styles.textDayUnchecked}>T</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.dayOfWeekOn}
                  onPress={() => setTuesday(false)}>
                  <Text style={styles.textDayChecked}>T</Text>
                </TouchableOpacity>
              )}

              {wednesday == false ? (
                <TouchableOpacity
                  style={styles.dayOfWeekOff}
                  onPress={() => setWednesday(true)}>
                  <Text style={styles.textDayUnchecked}>Q</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.dayOfWeekOn}
                  onPress={() => setWednesday(false)}>
                  <Text style={styles.textDayChecked}>Q</Text>
                </TouchableOpacity>
              )}

              {thursday == false ? (
                <TouchableOpacity
                  style={styles.dayOfWeekOff}
                  onPress={() => setThursday(true)}>
                  <Text style={styles.textDayUnchecked}>Q</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.dayOfWeekOn}
                  onPress={() => setThursday(false)}>
                  <Text style={styles.textDayChecked}>Q</Text>
                </TouchableOpacity>
              )}

              {friday == false ? (
                <TouchableOpacity
                  style={styles.dayOfWeekOff}
                  onPress={() => setFriday(true)}>
                  <Text style={styles.textDayUnchecked}>S</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.dayOfWeekOn}
                  onPress={() => setFriday(false)}>
                  <Text style={styles.textDayChecked}>S</Text>
                </TouchableOpacity>
              )}

              {saturday == false ? (
                <TouchableOpacity
                  style={styles.dayOfWeekOff}
                  onPress={() => setSaturday(true)}>
                  <Text style={styles.textDayUnchecked}>S</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.dayOfWeekOn}
                  onPress={() => setSaturday(false)}>
                  <Text style={styles.textDayChecked}>S</Text>
                </TouchableOpacity>
              )}

              {sunday == false ? (
                <TouchableOpacity
                  style={styles.dayOfWeekOff}
                  onPress={() => setSunday(true)}>
                  <Text style={styles.textDayUnchecked}>D</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.dayOfWeekOn}
                  onPress={() => setSunday(false)}>
                  <Text style={styles.textDayChecked}>D</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.weekDiv}></View>
          )}
        </View>
        <Switch
          style={{ alignSelf: 'flex-start', marginTop: 45, marginRight: 8 }}
          trackColor={{ false: '#767577', true: '#bdffde' }}
          thumbColor={isActive ? '#37C77F' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isActive}
        />
      </View>
      <DateTimePickerModal
        isVisible={isTime}
        mode="time"
        onConfirm={handleTime}
        onCancel={() => setIsTime(false)}
      />
      <DateTimePickerModal
        isVisible={isDateTime}
        mode="datetime"
        onConfirm={handleDateTime}
        onCancel={() => setIsDateTime(false)}
      />
      <View style={styles.bottomDiv}>
        <TouchableOpacity style={styles.buttonCancel} onPress={Cancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonConfirm} onPress={Confirm}>
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginVertical: hp('22%'),
    borderRadius: 10,
  },
  topDiv: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: hp('3%'),
  },
  buttonConfirm: {
    backgroundColor: '#121212',
    marginRight: 16,
    borderRadius: 16,
    elevation: 5,
    height: hp('5%'),
    width: wp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    backgroundColor: '#121212',
    marginRight: 16,
    borderRadius: 15,
    elevation: 5,
    height: hp('5%'),
    width: wp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: '#fff',
  },
  display: {
    flex: 1,
  },
  date: {
    fontFamily: 'Nunito-Bold',
    fontSize: 30,
    marginTop: 8,
  },
  hour: {
    fontFamily: 'Nunito-Bold',
    fontSize: 35,
    marginTop: 8,
  },
  weekDiv: {
    height: hp('6.5%'),
  },
  dayOfWeekOff: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 4,
  },
  dayOfWeekOn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bdffde',
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#bdffde',
    marginHorizontal: 4,
  },
  textDayUnchecked: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  textDayChecked: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#37C77F',
  },
});
