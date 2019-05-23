 package net.sf.cherry.provider.wz;
 
 import java.awt.Point;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import net.sf.cherry.provider.MapleData;
import net.sf.cherry.provider.MapleDataEntity;
 
            public class XMLDomMapleData implements MapleData {
            private Node node;
            private File imageDataDir;
 
   public XMLDomMapleData(FileInputStream fis, File imageDataDir)
   {
     try
     {
       DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
       DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
       Document document = documentBuilder.parse(fis);
       this.node = document.getFirstChild();
     } catch (ParserConfigurationException e) {
       throw new RuntimeException(e);
     } catch (SAXException e) {
       throw new RuntimeException(e);
     } catch (IOException e) {
       throw new RuntimeException(e);
     }
     this.imageDataDir = imageDataDir;
   }
 
   private XMLDomMapleData(Node node) {
     this.node = node;
   }
 
   public MapleData getChildByPath(String path)
   {
     String[] segments = path.split("/");
     if (segments[0].equals("..")) {
       return ((MapleData)getParent()).getChildByPath(path.substring(path.indexOf("/") + 1));
     }
     Node myNode = this.node;
     for (int x = 0; x < segments.length; x++) {
       NodeList childNodes = myNode.getChildNodes();
       boolean foundChild = false;
       for (int i = 0; i < childNodes.getLength(); i++) {
         Node childNode = childNodes.item(i);
         if ((childNode.getNodeType() == 1) && (childNode.getAttributes().getNamedItem("name").getNodeValue().equals(segments[x]))) {
           myNode = childNode;
           foundChild = true;
           break;
         }
       }
       if (!foundChild) {
         return null;
       }
     }
     XMLDomMapleData ret = new XMLDomMapleData(myNode);
     ret.imageDataDir = new File(this.imageDataDir, getName() + "/" + path).getParentFile();
     return ret;
   }
 
   public List<MapleData> getChildren()
   {
     List ret = new ArrayList();
     NodeList childNodes = this.node.getChildNodes();
     for (int i = 0; i < childNodes.getLength(); i++) {
       Node childNode = childNodes.item(i);
       if (childNode.getNodeType() == 1) {
         XMLDomMapleData child = new XMLDomMapleData(childNode);
         child.imageDataDir = new File(this.imageDataDir, getName());
         ret.add(child);
       }
     }
     return ret;
   }
 
public Object getData() {
		NamedNodeMap attributes = node.getAttributes();
		MapleDataType type = getType();
		switch (type) {
			case DOUBLE:
			case FLOAT:
			case INT:
			case SHORT:
			case STRING:
			case UOL: {
				String value = attributes.getNamedItem("value").getNodeValue();
				switch (type) {
					case DOUBLE:
						return Double.valueOf(Double.parseDouble(value));
					case FLOAT:
						return Float.valueOf(Float.parseFloat(value));
					case INT:
						return Integer.valueOf(Integer.parseInt(value));
					case SHORT:
						return Short.valueOf(Short.parseShort(value));
					case STRING:
					case UOL:
						return value;
				}
			}
			case VECTOR: {
				String x = attributes.getNamedItem("x").getNodeValue();
				String y = attributes.getNamedItem("y").getNodeValue();
				return new Point(Integer.parseInt(x), Integer.parseInt(y));
			}
			case CANVAS: {
				String width = attributes.getNamedItem("width").getNodeValue();
				String height = attributes.getNamedItem("height").getNodeValue();
				return new FileStoredPngMapleCanvas(Integer.parseInt(width), Integer.parseInt(height), new File(
					imageDataDir, getName() + ".png"));
			}
		}
		return null;
	}
 
   public MapleDataType getType()
   {
     String nodeName = this.node.getNodeName();
     if (nodeName.equals("imgdir"))
       return MapleDataType.PROPERTY;
     if (nodeName.equals("canvas"))
       return MapleDataType.CANVAS;
     if (nodeName.equals("convex"))
       return MapleDataType.CONVEX;
     if (nodeName.equals("sound"))
       return MapleDataType.SOUND;
     if (nodeName.equals("uol"))
       return MapleDataType.UOL;
     if (nodeName.equals("double"))
       return MapleDataType.DOUBLE;
     if (nodeName.equals("float"))
       return MapleDataType.FLOAT;
     if (nodeName.equals("int"))
       return MapleDataType.INT;
     if (nodeName.equals("short"))
       return MapleDataType.SHORT;
     if (nodeName.equals("string"))
       return MapleDataType.STRING;
     if (nodeName.equals("vector"))
       return MapleDataType.VECTOR;
     if (nodeName.equals("null")) {
       return MapleDataType.IMG_0x00;
     }
     return null;
   }
 
   public MapleDataEntity getParent()
   {
     Node parentNode = this.node.getParentNode();
     if (parentNode.getNodeType() == 9) {
       return null;
     }
     XMLDomMapleData parentData = new XMLDomMapleData(parentNode);
     parentData.imageDataDir = this.imageDataDir.getParentFile();
     return parentData;
   }
 
   public String getName()
   {
     return this.node.getAttributes().getNamedItem("name").getNodeValue();
   }
 
   public Iterator<MapleData> iterator()
   {
     return getChildren().iterator();
   }
 }

