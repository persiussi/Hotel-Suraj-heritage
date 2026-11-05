"""Generate a 12-second original illustrated Shekhawati mood film. No actual hotel footage."""
from PIL import Image,ImageDraw,ImageFont
import math, subprocess, os, sys
W,H,FPS,DURATION=960,540,18,12
OUT=os.path.join(os.path.dirname(__file__),'assets/videos/suraj-heritage-brand-film.mp4')
fontbase='/usr/share/fonts/truetype/dejavu'
serif=os.path.join(fontbase,'DejaVuSerif.ttf')
serifb=os.path.join(fontbase,'DejaVuSerif-Bold.ttf')
sans=os.path.join(fontbase,'DejaVuSans.ttf')
Ftitle=ImageFont.truetype(serifb,73)
Fsmall=ImageFont.truetype(sans,19)
Fmini=ImageFont.truetype(sans,13)
Fcaption=ImageFont.truetype(serif,28)
cmd=['ffmpeg','-y','-loglevel','error','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-pix_fmt','yuv420p','-preset','veryfast','-crf','24','-movflags','+faststart',OUT]
p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
try:
 for f in range(FPS*DURATION):
  t=f/FPS
  image=Image.new('RGB',(W,H)); px=image.load()
  for y in range(H):
   v=y/H
   c=(int(25+72*v),int(34+54*v),int(56+34*v))
   for x in range(W):px[x,y]=c
  d=ImageDraw.Draw(image,'RGBA')
  # sun and sky details
  sx=int(710-35*math.sin(t/10));sy=int(145-7*math.cos(t/6))
  for r,alpha in [(160,15),(139,18),(119,23),(95,230)]:
   d.ellipse((sx-r,sy-r,sx+r,sy+r),fill=(246,176,91,alpha))
  for i in range(16):
   cx=(i*137+37)%W;cy=(i*74+31)%330
   d.ellipse((cx,cy,cx+2,cy+2),fill=(252,228,181,140))
  d.polygon([(0,420),(155,363+int(math.sin(t*.4)*4)),(303,425),(484,367),(633,423),(817,358),(960,403),(960,540),(0,540)],fill=(157,76,66,255))
  d.polygon([(0,467),(192,404),(340,458),(515,403),(740,467),(960,406),(960,540),(0,540)],fill=(206,126,83,255))
  # stylised Indian haveli palace silhouette in center
  d.rectangle((160,316,800,470),fill=(21,31,51,250))
  d.rectangle((222,270,738,470),fill=(22,34,55,245))
  # domed chhatris
  for x in (205,480,752):
   d.rectangle((x-30,258,x+30,327),fill=(22,34,55,255))
   d.arc((x-39,204,x+39,283),180,360,fill=(240,188,117,200),width=4)
   d.pieslice((x-35,215,x+35,294),180,360,fill=(22,34,55,255))
   d.ellipse((x-4,204,x+4,212),fill=(232,164,88,245))
  d.line((160,316,800,316),fill=(224,157,95,190),width=4)
  for x in range(202,798,84):
   d.rectangle((x,336,x+47,447),fill=(210,154,112,255),outline=(245,201,139,255),width=2)
   d.pieslice((x,313,x+47,365),180,360,fill=(210,154,112,255),outline=(245,201,139,255),width=2)
   d.rectangle((x+8,352,x+39,447),fill=(35,49,70,255))
  # foreground dunes
  off=int(t*11)
  d.polygon([(0,483),(180,468+int(4*math.sin(t))), (395,505),(630,481),(960,505),(960,540),(0,540)],fill=(237,174,109,255))
  d.polygon([(0,515),(340,494),(680,532),(960,496),(960,540),(0,540)],fill=(246,192,125,255))
  # thin gold line and evolving text card
  fade=max(0,min(1,(t-0.6)/1.2,(DURATION-t)/1.5))
  d.rounded_rectangle((226,123,734,276),radius=8,fill=(23,33,50,int(213*fade)),outline=(246,196,126,int(190*fade)),width=2)
  def centered(y,text,font,color):
   bb=d.textbbox((0,0),text,font=font);w=bb[2]-bb[0]
   d.text(((W-w)/2,y),text,font=font,fill=(*color,int(255*fade)))
  centered(139,'SURAJ',Ftitle,(250,225,172))
  centered(235,'H E R I T A G E  ·  S I K A R',Fsmall,(248,218,169))
  centered(50,'A MOMENT IN SHEKHAWATI',Fsmall,(252,213,159))
  centered(454,'Inspired by Rajasthan, made for the journey.',Fcaption,(255,245,224))
  centered(517,'ILLUSTRATIVE ARTWORK · NOT ACTUAL HOTEL FOOTAGE',Fmini,(37,45,58))
  p.stdin.write(image.tobytes())
finally:
 p.stdin.close()
 ret=p.wait()
 if ret:raise RuntimeError('ffmpeg failed '+str(ret))
print(OUT,os.path.getsize(OUT),'bytes')
