export const CATEGORIES = [
  {
    id: 'ilk_yardim',
    name: 'İlk Yardım',
    icon: 'medkit-outline',
    color: '#E53935',
  },
  {
    id: 'trafik_cevre',
    name: 'Trafik ve Çevre Bilgisi',
    icon: 'car-outline',
    color: '#1E88E5',
  },
  {
    id: 'motor_arac',
    name: 'Motor ve Araç Teknolojisi',
    icon: 'construct-outline',
    color: '#43A047',
  },
  {
    id: 'trafik_adabi',
    name: 'Trafik Adabı',
    icon: 'people-outline',
    color: '#8E24AA',
  },
];

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}
