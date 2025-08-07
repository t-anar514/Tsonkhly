// Next.js API route for window opening types
// This API mocks the response from a backend server

export default function handler(req, res) {
  // Sample opening type data based on the format from your backend
  const openingTypes = [
    {
      id: 1,
      name: '1_tsonhgui',
      name_factory: '1_tsonhgui',
      image_path: 'http://202.131.237.188:8000/media/opening_types/No_door.svg',
      is_active: true,
      top_bottom_glass_option: 1,
    },
    {
      id: 2,
      name: '1_zuun_haalga',
      name_factory: '1_zuun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/1tsonh_left.svg',
      is_active: true,
      top_bottom_glass_option: 1,
    },
    {
      id: 3,
      name: '1_baruun_haalga',
      name_factory: '1_baruun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/1tsonh_right.svg',
      is_active: true,
      top_bottom_glass_option: 1,
    },
    {
      id: 4,
      name: '1_deed_haalga',
      name_factory: '1_deed_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/1tsonh_top.svg',
      is_active: true,
      top_bottom_glass_option: 1,
    },
    {
      id: 5,
      name: '1_deed_haalga',
      name_factory: '1_deed_haalga',
      image_path: null,
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 6,
      name: '1_zuun_haalga',
      name_factory: '1_zuun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Deer_tsonhtoi_left.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 7,
      name: '1_baruun_haalga',
      name_factory: '1_baruun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Deer_tsonhtoi_right.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 8,
      name: '1_deed_zuun_haalga',
      name_factory: '1_deed_zuun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Deer_tsonhtoi_top_left.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 9,
      name: '1_deed_baruun_haalga',
      name_factory: '1_deed_baruun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Deer_tsonhtoi_top_right.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 10,
      name: '1_haalgagui',
      name_factory: '1_haalgagui',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Door_tsonhtoi.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 13,
      name: '1_dood_haalga',
      name_factory: '1_dood_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Door_tsonhtoi_bottom.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 11,
      name: '1_dood_zuun_haalga',
      name_factory: '1_dood_zuun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Door_tsonhtoi_bottom_left.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 12,
      name: '1_dood_baruun_haalga',
      name_factory: '1_dood_baruun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Door_tsonhtoi_bottom_right.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 14,
      name: '1_zuun_haalga',
      name_factory: '1_zuun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Door_tsonhtoi_left.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 15,
      name: '1_baruun_haalga',
      name_factory: '1_baruun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/Door_tsonhtoi_right.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 16,
      name: '2_haalgagui',
      name_factory: '2_haalgagui',
      image_path: 'http://202.131.237.188:8000/media/opening_types/2huvaasan.svg',
      is_active: true,
      top_bottom_glass_option: 4,
    },
    {
      id: 17,
      name: '2_zuun_baruun_haalga',
      name_factory: '2_zuun_baruun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/2huvaasan_2haalga.svg',
      is_active: true,
      top_bottom_glass_option: 4,
    },
    {
      id: 18,
      name: '2_zuun_haalga',
      name_factory: '2_zuun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/2huvaasan_left_right.svg',
      is_active: true,
      top_bottom_glass_option: 4,
    },
    {
      id: 19,
      name: '2_baruun_haalga',
      name_factory: '2_baruun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/2huvaasan_right_left.svg',
      is_active: true,
      top_bottom_glass_option: 4,
    },
    {
      id: 24,
      name: '2_zuun_baruun_haalga',
      name_factory: '2_zuun_baruun_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_left_right.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 50,
      name: '2_baruun_haalga',
      name_factory: '2_baruun_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_doorTsonhtoi_right_n9JgtPs.svg',
      is_active: true,
      top_bottom_glass_option: 7,
    },
    {
      id: 25,
      name: '2_zuun_deed_haalga',
      name_factory: '2_zuun_deed_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_left_top.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 26,
      name: '2_zuun_haalga',
      name_factory: '2_zuun_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_left.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 23,
      name: '2_zuun_baruun_deed_haalga',
      name_factory: '2_zuun_baruun_deed_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_left_right_top.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 22,
      name: '2_haalgagui',
      name_factory: '2_haalgagui',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_52UZI6B.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 27,
      name: '2_baruun_deed_haalga',
      name_factory: '2_baruun_deed_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_right_top.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 28,
      name: '2_baruun_haalga',
      name_factory: '2_baruun_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_right.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 29,
      name: '2_deed_haalga',
      name_factory: '2_deed_haalga',
      image_path: 'http://202.131.237.188:8000/media/opening_types/2huvaasan_deerTsonhtoi_top.svg',
      is_active: true,
      top_bottom_glass_option: 2,
    },
    {
      id: 30,
      name: '2_haalgagui',
      name_factory: '2_haalgagui',
      image_path: 'http://202.131.237.188:8000/media/opening_types/2huvaasan_doorTsonhtoi.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 31,
      name: '2_zuun_dood_haalga',
      name_factory: '2_zuun_dood_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_doorTsonhtoi_bottom_left.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 32,
      name: '2_zuun_baruun_haalga',
      name_factory: '2_zuun_baruun_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_doorTsonhtoi_bottom_right_left.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
    {
      id: 33,
      name: '2_dood_haalga',
      name_factory: '2_dood_haalga',
      image_path:
        'http://202.131.237.188:8000/media/opening_types/2huvaasan_doorTsonhtoi_bottom.svg',
      is_active: true,
      top_bottom_glass_option: 3,
    },
  ];

  // Handle GET requests
  if (req.method === 'GET') {
    res.status(200).json(openingTypes);
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
