import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieList from "../components/MovieList";
import { StatusBar } from "expo-status-bar";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { styles } from "../style";
import TrendingMovie from "../components/trendingMovie";

const ios = Platform.OS === "ios";

export default function Home() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log("got trending", data.results.length);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log("got upcoming", data.results.length);
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log("got top rated", data.results.length);
    if (data && data.results) setTopRated(data.results);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center m-3">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Image
            source={require("../assets/logo.png")}
            className="w-20 h-20"
          />
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}>
          {/* Trending Movies Carousel */}
          {trending.length > 0 && <TrendingMovie data={trending} />}
          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}
          {/* top rated movies row */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
