'use client';

import { useState, useCallback } from 'react';
import { AlertCircle, Upload, Image, Sparkles, ArrowRight, Pipette, Grid3X3, Palette, Link as LinkIcon, Clipboard } from 'lucide-react';
import Link from 'next/link';
import { ImageUploader, ImageUrlInput } from '@/components/color-picker/ImageUploader';
import { ImageCanvas } from '@/components/color-picker/ImageCanvas';
import { ColorDisplay } from '@/components/color-picker/ColorDisplay';
import { ColorHistory } from '@/components/color-picker/ColorHistory';
import { ClipboardPaste } from '@/components/color-picker/ClipboardPaste';
import { rgbToFormats, ColorFormats } from '@/lib/colorUtils';

const quickActions = [
  { name: 'Browse', href: '/browse', icon: Grid3X3, gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Generate', href: '/color-generator', icon: Sparkles, gradient: 'from-violet-500 to-purple-500' },
  { name: 'Gradients', href: '/gradient-maker', icon: Palette, gradient: 'from-pink-500 to-rose-500' },
];

export default function ColorPickerPage() {
  const [imageSource, setImageSource] = useState<string | File | null>(null);
  const [pickedColor, setPickedColor] = useState<ColorFormats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url' | 'paste'>('upload');

  const handleImageLoad = useCallback((source: string | File) => {
    setImageSource(source);
    setError(null);
    setPickedColor(null);
  }, []);

  const handleColorPick = useCallback((color: { r: number; g: number; b: number; a: number }) => {
    const formats = rgbToFormats(color.r, color.g, color.b, color.a);
    setPickedColor(formats);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const handleHistoryColorSelect = useCallback((color: ColorFormats) => {
    setPickedColor(color);
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:py-10">
        {/* Hero section - Only show when no image */}
        {!imageSource && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
              <Pipette className="h-3.5 w-3.5" />
              Color Picker
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight">
              Extract Colors from
              <span className="block sm:inline bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"> Images</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
              Upload, paste, or link an image. Tap to extract colors.
            </p>
          </div>
        )}

        {/* Compact header when image loaded */}
        {imageSource && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Image className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Color Picker</h2>
                <p className="text-xs text-gray-500">Tap image to extract</p>
              </div>
            </div>
            <button
              onClick={() => {
                setImageSource(null);
                setPickedColor(null);
                setError(null);
              }}
              className="px-4 py-2 text-xs font-medium text-violet-400 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 rounded-lg transition-colors active:scale-95"
            >
              New Image
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Image area */}
          <div className="lg:col-span-2">
            {!imageSource ? (
              <div className="space-y-6">
                {/* Upload method tabs */}
                <div className="flex gap-2 p-1 bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl">
                  <button
                    onClick={() => setUploadMethod('upload')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                      uploadMethod === 'upload'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    <span className="hidden xs:inline">Upload</span>
                  </button>
                  <button
                    onClick={() => setUploadMethod('url')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                      uploadMethod === 'url'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="hidden xs:inline">URL</span>
                  </button>
                  <button
                    onClick={() => setUploadMethod('paste')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                      uploadMethod === 'paste'
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Clipboard className="h-4 w-4" />
                    <span className="hidden xs:inline">Paste</span>
                  </button>
                </div>

                {/* Upload area */}
                {uploadMethod === 'upload' && <ImageUploader onImageLoad={handleImageLoad} />}
                {uploadMethod === 'url' && (
                  <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl p-6">
                    <ImageUrlInput onImageLoad={handleImageLoad} />
                  </div>
                )}
                {uploadMethod === 'paste' && (
                  <div className="bg-gray-900/50 backdrop-blur border border-white/10 rounded-xl p-6">
                    <ClipboardPaste onImagePaste={handleImageLoad} />
                  </div>
                )}

                {/* Quick Actions */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xs font-medium text-gray-500 mb-3">Quick Tools</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {quickActions.map((action) => (
                      <Link
                        key={action.name}
                        href={action.href}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/30 transition-all active:scale-95"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-300">{action.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                <ImageCanvas
                  imageSource={imageSource}
                  onColorPick={handleColorPick}
                  onError={handleError}
                />
              </>
            )}
          </div>

          {/* Right: Color display & history */}
          <div className="space-y-4">
            <ColorDisplay color={pickedColor} />
            <ColorHistory
              currentColor={pickedColor}
              onColorSelect={handleHistoryColorSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

