import AsyncStorage from '@react-native-async-storage/async-storage';

const WRONG_QUESTIONS_KEY = '@ehliyet_sinav/wrong_questions';
const EXAM_HISTORY_KEY = '@ehliyet_sinav/exam_history';

/**
 * Kalıcı depolama (yanlış yapılan sorular ve sınav geçmişi) ile ilgili
 * tüm işlemleri tek noktadan yöneten yardımcı modül.
 */

// ---- Yanlış Yapılan Sorular ----

export async function getWrongQuestionIds() {
  try {
    const raw = await AsyncStorage.getItem(WRONG_QUESTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Yanlış sorular okunamadı:', e);
    return [];
  }
}

export async function addWrongQuestion(questionId) {
  const current = await getWrongQuestionIds();
  if (!current.includes(questionId)) {
    const updated = [...current, questionId];
    await AsyncStorage.setItem(WRONG_QUESTIONS_KEY, JSON.stringify(updated));
    return updated;
  }
  return current;
}

export async function removeWrongQuestion(questionId) {
  const current = await getWrongQuestionIds();
  const updated = current.filter((id) => id !== questionId);
  await AsyncStorage.setItem(WRONG_QUESTIONS_KEY, JSON.stringify(updated));
  return updated;
}

export async function clearWrongQuestions() {
  await AsyncStorage.removeItem(WRONG_QUESTIONS_KEY);
}

// ---- Sınav Geçmişi ----

export async function saveExamResult(result) {
  try {
    const raw = await AsyncStorage.getItem(EXAM_HISTORY_KEY);
    const history = raw ? JSON.parse(raw) : [];
    const updated = [{ ...result, date: new Date().toISOString() }, ...history].slice(0, 50);
    await AsyncStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Sınav sonucu kaydedilemedi:', e);
    return [];
  }
}

export async function getExamHistory() {
  try {
    const raw = await AsyncStorage.getItem(EXAM_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
