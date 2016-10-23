<?php
$data = array(
	array(
		"id" => 1,
		"title" => "新闻1",
		"writer" => "小明1",
		"date" => 1455808822088,
		"content" => "新闻内容1"
	),
	array(
		"id" => 2,
		"title" => "新闻2",
		"writer" => "小明2",
		"date" => 1455808822088,
		"content" => "内容2"
	),
	array(
		"id" => 3,
		"title" => "新闻3",
		"writer" => "小明3",
		"date" => 1455808822088,
		"content" => "新闻内容3"
	),
	array(
		"id" => 4,
		"title" => "新闻4",
		"writer" => "小明4",
		"date" => 1455808822088,
		"content" => "新闻内容4"
	),
	array(
		"id" => 5,
		"title" => "新闻5",
		"writer" => "小明5",
		"date" => 1455808822088,
		"content" => "新闻内容5"
	)
);
$result = array(
	"errno" => 0,
	"data" => $data
);
echo json_encode($result);