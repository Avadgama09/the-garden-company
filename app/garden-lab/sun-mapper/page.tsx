"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sun,
  ArrowLeft,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Search,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SunCalc from "suncalc";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const sliderToHour = (value: number) => 5 + (value / 100) * 15;

const formatTime = (hour: number) => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayHour}:${m.toString().padStart(2, "0")} ${ampm}`;
};

export default function SunMapperPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [longitude, setLongitude] = useState(72.8777);
  const [latitude, setLatitude] = useState(19.076);
  const [timeSlider, setTimeSlider] = useState(50);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const currentHour = sliderToHour(timeSlider);
  const simulatedDate = new Date(selectedDate);
  simulatedDate.setHours(Math.floor(currentHour), (currentHour % 1) * 60, 0, 0);

  const sunPosition = SunCalc.getPosition(simulatedDate, latitude, longitude);
  const sunAzimuthDeg = (sunPosition.azimuth * 180) / Math.PI + 180;
  const sunAltitudeDeg = (sunPosition.altitude * 180) / Math.PI;
  const isNight = sunAltitudeDeg < 0;

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current || !MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 16,
      pitch: 60,
      bearing: -17,
      antialias: true,
    });

    const mapInstance = map.current;

    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapInstance.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    );

    mapInstance.on("load", () => {
      const layers = mapInstance.getStyle().layers;
      let labelLayerId: string | undefined;

      if (layers) {
        for (const layer of layers) {
          if (
            layer.type === "symbol" &&
            layer.layout &&
            "text-field" in layer.layout
          ) {
            labelLayerId = layer.id;
            break;
          }
        }
      }

      mapInstance.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": "#ddd",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14,
              0,
              14.5,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14,
              0,
              14.5,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.85,
          },
        },
        labelLayerId
      );

      mapInstance.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      mapInstance.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      setMapLoaded(true);
    });

    mapInstance.on("moveend", () => {
      const center = mapInstance.getCenter();
      setLongitude(center.lng);
      setLatitude(center.lat);
    });

    return () => {
      mapInstance.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update lighting
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (sunAltitudeDeg > 0) {
      map.current.setLight({
        anchor: "map",
        position: [1.5, sunAzimuthDeg, sunAltitudeDeg],
        intensity: 0.5,
        color: sunAltitudeDeg < 10 ? "#ffcc66" : "#ffffff",
      });
    } else {
      map.current.setLight({
        anchor: "map",
        position: [1.5, sunAzimuthDeg, 5],
        intensity: 0.1,
        color: "#334455",
      });
    }
  }, [sunAzimuthDeg, sunAltitudeDeg, mapLoaded]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !MAPBOX_TOKEN) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setLongitude(lng);
        setLatitude(lat);

        map.current?.flyTo({
          center: [lng, lat],
          zoom: 17,
          duration: 1500,
        });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <TooltipProvider>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-garden-dark py-12 lg:py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80"
            alt="Sunlit garden"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-garden-dark via-garden-dark/90 to-garden-dark" />
        </div>

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2">
              <Sun className="h-5 w-5 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">
                Sun Mapper
              </span>
              <span className="rounded-full bg-orange-500/30 px-2 py-0.5 text-xs font-medium text-orange-400">
                Beta
              </span>
            </div>

            <h1 className="font-serif text-3xl font-bold text-garden-dark-foreground sm:text-4xl">
              Visualize <span className="text-orange-400">Sunlight</span> on
              Your Property
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-garden-dark-foreground/80">
              See how shadows move across your garden throughout the day. Find
              the perfect sunny spot for your plants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="grid gap-6 md:grid-cols-[1fr_200px_200px]">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  Location
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search address or place..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch} variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <CalendarIcon className="h-4 w-4 text-orange-500" />
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-orange-500" />
                  Time
                </Label>
                <div className="flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-lg font-semibold">
                  {formatTime(currentHour)}
                  {isNight && (
                    <span className="ml-2 text-xs text-muted-foreground">(Night)</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>5:00 AM</span>
                <span className="font-medium text-foreground">Drag to simulate time of day</span>
                <span>8:00 PM</span>
              </div>
              <Slider
                value={[timeSlider]}
                onValueChange={([value]) => setTimeSlider(value)}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden rounded-xl border border-border shadow-lg"
          >
            <div className="absolute left-4 top-4 z-10 rounded-lg border border-border bg-card/90 px-3 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm">
                <Sun className={cn("h-4 w-4", isNight ? "text-gray-400" : "text-orange-500")} />
                <span className="font-medium">Sun altitude: {Math.round(sunAltitudeDeg)}°</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Higher altitude = shorter shadows. Buildings cast realistic shadows based on sun position.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="h-125 w-full md:h-150">
              {MAPBOX_TOKEN ? (
                <>
                  <div ref={mapContainer} className="h-full w-full" />
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center">
                        <Sun className="mx-auto h-12 w-12 animate-pulse text-orange-500" />
                        <p className="mt-4 text-muted-foreground">Loading map...</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <div className="text-center">
                    <Sun className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">Mapbox token not configured.</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 rounded-xl border border-border bg-orange-50 p-4 dark:bg-orange-950/20"
          >
            <h3 className="flex items-center gap-2 font-semibold text-foreground">
              <Sun className="h-5 w-5 text-orange-500" />
              Tips for Using Sun Mapper
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• <strong>Tilt the map</strong> (hold right-click + drag) to see 3D buildings and shadows</li>
              <li>• <strong>Compare seasons:</strong> Try June 21 vs December 21 to see dramatic shadow differences</li>
              <li>• <strong>Morning vs evening:</strong> East-facing spots get morning sun, west-facing get afternoon sun</li>
              <li>• <strong>Most vegetables</strong> need 6+ hours of direct sunlight (full sun areas)</li>
            </ul>
          </motion.div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/garden-lab">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Garden Lab
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
